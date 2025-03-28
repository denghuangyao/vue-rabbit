<script setup>
import { ref,onMounted,computed,reactive } from "vue";
import { useRoute } from "vue-router";
import { getCategoryFilterAPI,getCategoryGoodsAPI } from "@/apis/category.ts"
import GoodsItem from "@/views/Home/components/GoodsItem.vue"
let categoryData = ref({});
const route = useRoute();
const getSubCategory = async(id = route.params.id)=>{
    let { result } = await getCategoryFilterAPI(id);
    categoryData.value = result;
    console.log("-getSubCategory-",result)
}
let productList = ref([]);
let reqData = reactive({
    categoryId:route.params.id,
    sortField:"publishTime",
    page:1,
    pageSize:20
});
console.log("--reqData",reqData.value,reqData)
let disabled = computed(()=> noMore.value || isLoading.value)
let isLoading = ref(false),noMore = ref(false);
const getCategoryGoods = async ()=>{
    isLoading.value = true;
    let {result} = await getCategoryGoodsAPI(reqData);
    if(reqData.page==1){
        productList.value = [];
    }
    productList.value = [...productList.value,...result.items];
    isLoading.value = false;
    noMore.value = productList.value.length >= result.counts
    // console.log("-getCategoryGoods-",result)
}
const handleChange = ()=>{
    reqData.page=1;
    getCategoryGoods();
}
const load = ()=>{
    reqData.page+=1;
    getCategoryGoods();
}
onMounted(()=> {
    getSubCategory();
    getCategoryGoods();
});

</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{categoryData.parentName}}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{categoryData.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
        <el-tabs v-model="reqData.sortField" @tab-change="handleChange">
            <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
            <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
            <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
        </el-tabs>
        <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
            <!-- 商品列表-->
            <GoodsItem v-for="goods in productList" :goods="goods" :key="goods.id" />
        </div>
        <p class="textCenter" v-if="isLoading">Loading...</p>
        <p class="textCenter" v-if="noMore">No more</p>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }
  .textCenter{
    text-align:center;
    font-size:20px;
    font-weight:bold;
    line-height:45px;
    color:#9e9e9e;
  }
  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>