<template>
    <div class="userInfo">
        <el-dropdown>
            <div style="cursor: pointer;">
                <img src="@/assets/avatar.jpg" style="width:45px;height: 45px; border-radius: 50%;margin-top: 2px;">
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item class="el-dropdown-link" @click="handlelogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <!-- 用户名和角色名 -->
        <el-row style="margin-top: 0px;">
            <el-col>
                <span style="color: #212121;margin-left:10px;font-size: 15px;">{{ userInfo.name }}</span>
            </el-col>
            <el-col>
                <span style="color: gray;margin-left:10px;font-size: 8px;">{{ userInfo.role_name }}</span>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
// import { useStore } from '@/store';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { authStore } from '@/pinia/authStore';

// const store = useStore()
const router = useRouter()

const handlelogout = () => {
    // 移除 session 和 内存中的token 和 tab标签页
    // store.commit('authStore/delToken')
    // store.commit('tabStore/closeAllTabs')
    router.push('/login')
    location.reload()
    sessionStorage.clear()
}

const userInfo = computed(() => {
    const userAuthStore = authStore()
    return userAuthStore.userInfo
    // return store.state.authStore.userInfo
})

</script>
<style scoped lang="scss">
.userInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}
</style>
