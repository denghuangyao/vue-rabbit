<script setup>
// import { onMounted, ref } from 'vue'
// import axios from 'axios'
import {watchEffect } from "vue"
import bwPowerSet from './power-set'
const props = defineProps({
  goods:{
    type: Object,
    default:()=>({
      specs:[],
      skus:[]
    })
  }
})
const spliter="-";
let pathMap = {};
const emit = defineEmits(["change"])
// 商品数据
// const goods = ref({})
// onMounted(() => getGoods())
// const getGoods = async () => {
//   // 1135076  初始化就有无库存的规格
//   // 1369155859933827074 更新之后有无库存项（蓝色-20cm-中国）
//   const res = await axios.get('http://pcapi-xiaotuxian-front-devtest.itheima.net/goods?id=1369155859933827074')
//   goods.value = res.data.result
//   pathMap = getPathMap(props.goods.skus);
//   console.log("--pathMap-",pathMap)
//   initDisabledStatus(props.goods.specs,pathMap);
// }
const clickSpecs = (current,item)=>{
  if(current.disabled) return;
  if(current.selected){
    current.selected = false;
  }else{
    item.values.forEach((i)=>i.selected=false);
    current.selected = true;
  }
  updateDisableStatus(props.goods.specs,pathMap);
  let selectedArr = getSelectedValues(props.goods.specs);
  if(selectedArr.some(i=>i===undefined)){
    emit("change",{});
  }else{
    let skuId = pathMap[selectedArr.join(spliter)];
    let sku = props.goods.skus.find(i => i.id === skuId[0]);
    emit("change",{
      skuId: sku.id,
      price: sku.price,
      oldPrice: sku.oldPrice,
      inventory: sku.inventory,
      specsText: sku.specs.reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '').trim()
    });
  }
}
const getSelectedValues=(specs)=>{
  let selectedArr = [];
  specs.forEach((item,index)=>{
    let val = item.values.find(i=>i.selected);
    selectedArr[index] = val?val.name:undefined;
  })
  return selectedArr
}
const updateDisableStatus=(specs,pathMap)=>{
  specs.forEach((item,index)=>{
    let selectedArr = getSelectedValues(specs);//每次都根据已选规格刷新禁用状态
    // console.log("-updateDisableStatus-selectedArr",getSelectedValues(specs))
    item.values.forEach(val=>{
      if(!val.selected){
        // console.log("--val-",val)
        selectedArr[index] = val.name;
        let key = selectedArr.filter(i=>i!==undefined).join(spliter);
        // console.log("updateDisableStatus--",key,pathMap[key])
        val.disabled = !pathMap[key]
      }
    })
  })

}
//生成有效动态字典
const getPathMap=(skus)=>{
  let pathMap = {};
  if(skus&&skus.length){
    skus.filter(item=>item.inventory>0).forEach((sku)=>{
      let selectedValArr = sku.specs.map((i)=>i.valueName);
      let results = bwPowerSet(selectedValArr);
      // console.log("-results-",results)
      results.forEach(res=>{
        let key = res.join(spliter)
        if(pathMap[key]){
          pathMap[key].push(sku.id)
        }else{
          pathMap[key]=[sku.id]
        }
      })
    })
  }
  // console.log("pathMap-",pathMap)
  return pathMap;
}
const initDisabledStatus = (specs,pathMap)=>{
  if (specs && specs.length > 0) {
    specs.forEach(item=>{
      item.values.forEach((val)=>{
        if(pathMap[val.name]){
          val.disabled=false;
        }else{
          val.disabled=true;
        }
      })
    })
  }
}

watchEffect(()=>{
  console.log("watchEffect-props",props)
  pathMap = getPathMap(props.goods.skus);
  console.log("--pathMap-",pathMap)
  initDisabledStatus(props.goods.specs,pathMap);
})
</script>
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img :class="{'selected':val.selected,'disabled':val.disabled}" @click="clickSpecs(val,item)"
            v-if="val.picture" :src="val.picture" />
          <span :class="{'selected':val.selected,'disabled':val.disabled}" @click="clickSpecs(val,item)" v-else>{{
              val.name
          }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<style scoped lang="scss">
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: $xtxColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      >img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>