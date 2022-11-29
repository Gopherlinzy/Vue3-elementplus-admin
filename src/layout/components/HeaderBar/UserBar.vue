<template>
    <div class="userInfo">
        <el-dropdown>
            <div>
                <img src="@/assets/avatar.jpg" style="width:45px;height: 45px; border-radius: 50%;">
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="handlelogout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <!-- 用户名和角色名 -->
        <el-row>
            <el-col>
                <span style="color: #212121;margin-left:10px;font-size: 15px;">{{ userInfo.name }}</span>
            </el-col>
            <el-col>
                <span style="color: gray;margin-left:10px;font-size: 8px;">{{ userInfo.city }}</span>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store';
import { computed, ref } from 'vue';

const store = useStore()

const handlelogout = () => {
    // 移除 session 和 内存中的token
    store.commit('authStore/delToken')
    location.reload()
}

const userInfo = computed(() => {
    return store.state.authStore.userInfo
})

</script>
<style scoped lang="scss">
.userInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
</style>
