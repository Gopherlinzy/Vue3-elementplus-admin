<template>
  <div style="background-color: #fff;height:40px">
    <el-tabs class="tabs" v-model="activeKey" type="card" @tab-click="clickHandle" @tab-remove="removeTab"
      @contextmenu.prevent.native="openContextMenu($event)">
      <el-tab-pane v-for="item in tabsList" :key="item.path" :label="item.title" :name="item.path" closable>
        <!-- {{ item.title }} -->
      </el-tab-pane>
    </el-tabs>
    <ul v-show="contextMenuVisible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="closeAllTabs">关闭所有</li>
      <li @click="closeOtherTabs('left')">关闭左边</li>
      <li @click="closeOtherTabs('right')">关闭右边</li>
      <li @click="closeOtherTabs('other')">关闭其它</li>
    </ul>
  </div>

</template>
<script lang="ts" setup>
import 'element-plus/es/components/message-box/style/css'
import { ComponentInternalInstance, getCurrentInstance, onMounted, Ref, ref, watch, computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { Itab } from '@/store/type'
import { tabsStore } from '@/pinia/tabsStore';
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const route = useRoute()
const router = useRouter()
const userTabsStore = tabsStore()
const state = reactive({
  activePath: ''
})

const tabsList = computed(() => {
  // return store.getters["tabStore/getAddTab"]
  return userTabsStore.tabsList
})
// 索引
const activeKey = ref('')

// 添加tab
const addTab = () => {
  const { meta, path } = route
  const tab: Itab = {
    path: path,
    title: meta.title as string
  }
  userTabsStore.addTab(tab)
  // store.commit('tabStore/addTab', tab)
  sessionStorage.setItem('ACTIVE_TAB', JSON.stringify(path))
}
// 监控
watch(() => route.path, () => {
  activeKey.value = route.path
  addTab()
})

// 点击tab
const clickHandle = (event: any) => {
  router.push({ path: event.props.name })
  sessionStorage.setItem('ACTIVE_TAB', JSON.stringify(event.props.name))
}

// 移除tab
const removeTab = (targetName: string) => {
  if (tabsList.value.length === 1) {
    return alert('这已经是最后一页')
  }

  // 如果删除的是当前页
  if (activeKey.value === targetName) {
    tabsList.value.forEach((tab: Itab, index: number) => {
      if (tab.path === targetName) {
        const nextTab = tabsList.value[index + 1] || tabsList.value[index - 1]
        if (nextTab) {
          activeKey.value = nextTab.path
          router.push(nextTab.path)
          sessionStorage.setItem('ACTIVE_TAB', JSON.stringify(nextTab.path))
        }
      }
    })
  }
  userTabsStore.closeCurrentTab(targetName)
  // store.commit('tabStore/closeCurrentTab', targetName)
}

// 刷新缓存数据
const refresh = () => {
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('TABS_ROUTES', JSON.stringify(tabsList.value))
  })

  let sessionTABS = sessionStorage.getItem('TABS_ROUTES')
  if (sessionTABS) {
    let tabItem = JSON.parse(sessionTABS)
    tabItem.forEach((tab: Itab) => {
      userTabsStore.addTab(tab)
      // store.commit('tabStore/addTab', tab)
    })
    let sessionActiveTAB = sessionStorage.getItem('ACTIVE_TAB')
    if (sessionActiveTAB) {
      let activeTab = JSON.parse(sessionActiveTAB)
      activeKey.value = activeTab
      router.push(activeTab)
    }
  }

}
// 页面初始化
onMounted(() => {

  // 初始化页面生成tab
  addTab()
  // 刷新保存数据
  refresh()
})

// 右键显示菜单列表
const contextMenuVisible: Ref<boolean> = ref(false)
const left = ref('')
const top = ref('')

const openContextMenu = (e: any) => {

  if (e.srcElement.id) {
    let currentContextTabId = e.srcElement.id.split("-")[1]
    userTabsStore.saveCurContextTabId(currentContextTabId)
    // store.commit("tabStore/saveCurContextTabId", currentContextTabId)
    contextMenuVisible.value = true
    left.value = e.clientX
    top.value = e.clientY + 10

  }
}

// 关闭所有
const closeAllTabs = () => {
  userTabsStore.closeAllTabs()
  // store.commit('tabStore/closeAllTabs')
  contextMenuVisible.value = false
  router.push("/index")
}

// 关闭其它(包含左,右,选中之外)
const closeOtherTabs = (par: string) => {
  userTabsStore.closeOtherTabs(par)
  store.commit('tabStore/closeOtherTabs', par)
  contextMenuVisible.value = false
}

// 监控右键删除列表,如果点击,就会消失
watch(() => contextMenuVisible.value, () => {
  if (contextMenuVisible.value) {
    window.addEventListener("click", () => contextMenuVisible.value = false)
  } else {
    window.removeEventListener("click", () => contextMenuVisible.value = false)
  }
})
</script>

<style lang="scss" scoped>
.tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.contextmenu {
  width: 100px;
  margin: 0;
  border: 1px solid #ccc;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.2);

  li {
    margin: 0;
    padding: 7px 16px;

    &:hover {
      background: #f2f2f2;
      cursor: pointer;
    }
  }

}
</style>