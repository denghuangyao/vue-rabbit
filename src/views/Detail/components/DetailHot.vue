<script setup lang="ts">
import { onMounted,ref,computed } from "vue"
import { useRoute } from "vue-router";
import { getHotGoodsAPI } from "@/apis/detail";
import { type CategoryGoods } from "@/types"
import GoodsItem from '@/views/Home/components/GoodsItem.vue';
enum TITLEMAP {
  "24小时热销榜"=1,
  "周热销榜"=2,
  "总热销榜"=3
}
const { hotType } =  defineProps({
  hotType: {
        type: Number, // 1代表24小时热销榜 2代表周热销榜 3代表总热销榜 可以使用type去适配title和数据列表
        default: 1
    }
});
let title = computed(()=>TITLEMAP[hotType])
const route = useRoute();
let goodsList = ref<CategoryGoods[]>([]);
async function getHotGoods(){
    let res = await getHotGoodsAPI({
        id:route.params.id,
        type:hotType
    })
    goodsList.value = res.result;
    // console.log("getHotGoods--",res,goodsList.value)
}
onMounted(()=>getHotGoods())

</script>


<template>
  <div class="goods-hot">
    <h3>{{title}}</h3>
    <!-- 商品区块 -->
    <GoodsItem v-for="item in goodsList" :key="item.id" :goods="item" ></GoodsItem>
  </div>
</template>


<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  :deep(.goods-item){
    width:100%;
  }
}
</style>