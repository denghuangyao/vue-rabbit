<script lang="ts" setup>
    import LayoutFixed from './components/LayoutFixed.vue';
    import LayoutNav from './components/LayoutNav.vue';
    import LayoutHeader from './components/LayoutHeader.vue';
    import LayoutFooter from './components/LayoutFooter.vue';
    import { useCategoryStore } from '@/store/categoryStore';
    import {onMounted} from "vue"
    const categoryStore = useCategoryStore()
    onMounted(()=>{
        categoryStore.getCategory();
    })
</script>
<template>
    <LayoutFixed />
    <LayoutNav />
    <LayoutHeader />
    <!-- 
    注意：使用带有params参数的路由时相同的组件实例将被重复使用。
    组件的生命周期钩子不会被调用
    RouterView加:key="$route.fullPath" 
    -->
    <RouterView />
    <LayoutFooter />
</template>
<style lang="scss" scoped>

</style>