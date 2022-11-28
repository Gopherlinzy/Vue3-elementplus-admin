<script setup lang="ts">
import {computed} from 'vue'
 
    import { useStore } from 'vuex';
    const store = useStore()

    const count = computed(()=>{
       return store.state.count
    })

    const increment = ()=>{
       store.commit('increment')
    }

   


</script>

<template>
  <button @click="increment">{{count}}</button>
  <el-button>elementPlus</el-button>
  
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
