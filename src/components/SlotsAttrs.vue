<script setup lang="ts">
    import { useSlots ,onMounted,useAttrs} from 'vue';
    defineProps(
        {msg:String}
    )
    const slots = useSlots()
    const attrs = useAttrs()
    onMounted(() => {
        // console.log(slots.header && slots.header());
        console.log(attrs); //除了 props传的参数
        
    })

</script>

<template>
   <h1>子组件应用slot</h1>
   <slot name="header" />
</template>

<style>
</style>