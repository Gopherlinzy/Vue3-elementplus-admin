<template>
    <div class="userInfo">
        <el-dropdown>
            <div>
<<<<<<< HEAD
                <img src="@/assets/avatar.jpg" style="width:45px;height: 45px; border-radius: 50%;margin-top: 2px;">
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item class="el-dropdown-link" @click="handlelogout">退出登录</el-dropdown-item>
=======
                <img src="@/assets/avatar.jpg" style="width:45px;height: 45px; border-radius: 50%;">
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="handlelogout">退出</el-dropdown-item>
>>>>>>> 0dadb255e225e856db3b3bd2d57bdd0041cb78e7
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <!-- 用户名和角色名 -->
<<<<<<< HEAD
        <el-row style="margin-top: 5px;">
=======
        <el-row>
>>>>>>> 0dadb255e225e856db3b3bd2d57bdd0041cb78e7
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
<<<<<<< HEAD
import { useRouter } from 'vue-router';
const store = useStore()
const router = useRouter()

const handlelogout = () => {
    // 移除 session 和 内存中的token 和 tab标签页
    store.commit('authStore/delToken')
    store.commit('tabStore/closeAllTabs')
    router.push('/login')
    sessionStorage.clear()
    // location.reload()
=======

const store = useStore()

const handlelogout = () => {
    // 移除 session 和 内存中的token
    store.commit('authStore/delToken')
    location.reload()
>>>>>>> 0dadb255e225e856db3b3bd2d57bdd0041cb78e7
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
<<<<<<< HEAD

.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}
</style>
=======
</style>
>>>>>>> 0dadb255e225e856db3b3bd2d57bdd0041cb78e7
