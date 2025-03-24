<script lang="ts" setup>
    import LayoutNav from './components/LayoutNav.vue';
    import LayoutHeader from './components/LayoutHeader.vue';
    import LayoutFooter from './components/LayoutFooter.vue';
</script>
<template>
    <LayoutNav />
    <LayoutHeader />
    <LayoutFooter />
    <RouterView />
</template>
<style lang="scss" scoped>

</style>