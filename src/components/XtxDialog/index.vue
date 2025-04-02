<script setup lang="ts">
import {ref} from "vue";
let showDialog = ref(false);
const props=defineProps({
    title:String,
    width:{
        type:String,
        default:"30%"
    }
});
const emit = defineEmits(["confirm","cancel"]);
console.log("-emit-",emit)
const show = ()=>{
    showDialog.value = true;
}
const close = ()=>{
    showDialog.value = false;
}
const doClose = ()=>{
    close();
    emit("cancel");
}
defineExpose({show,close});

</script>
<template>
    <el-dialog v-model="showDialog" :title="props.title" :width="width" center>
        <slot name="default"></slot>   
        <template #footer>
            <span class="dialog-footer">
            <el-button @click="doClose()">取消</el-button>
            <el-button type="primary" @click="emit('confirm')">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<style lang="scss" scoped>
</style>