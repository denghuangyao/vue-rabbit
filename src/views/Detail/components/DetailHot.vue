<script setup>
import { onMounted,ref,computed } from "vue"
import { useRoute } from "vue-router";
import { getHotGoodsAPI } from "@/apis/detail"
import GoodsItem from '@/views/Home/components/GoodsItem.vue';
const TITLEMAP = {
    1:"24小时热销榜",
    2:"周热销榜",
    3:"总热销榜"
}
const { type } =  defineProps({
    type: {
        type: Number, // 1代表24小时热销榜 2代表周热销榜 3代表总热销榜 可以使用type去适配title和数据列表
        default: 1
    }
});
let title = computed(()=>TITLEMAP[type])
const route = useRoute();
let goodsList = ref([]);
async function getHotGoods(){
    let res = await getHotGoodsAPI({
        id:route.params.id,
        type
    })
    goodsList.value = res.result;
    console.log("getHotGoods--",res,goodsList.value)
}
onMounted(()=>getHotGoods())

</script>


<template>
  <div class="goods-hot">
    <h3>{{title}}</h3>
    <!-- 商品区块 -->
    <GoodsItem v-for="item in goodsList" :key="item.id" :goods="item" :hasHoverStyle="false">
        nihasdga
    </GoodsItem>
    <!-- <RouterLink to="/" class="goods-item" v-for="item in 3" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">一双男鞋</p>
      <p class="desc ellipsis">一双好穿的男鞋</p>
      <p class="price">&yen;200.00</p>
    </RouterLink> -->
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