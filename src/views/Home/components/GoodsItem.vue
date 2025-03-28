<script setup lang="ts">
// import { withDefaults } from "vue"
import { type CategoryGoods } from "@/types"
import type { PropType } from 'vue'
defineProps({
  goods:{
    type:Object as PropType<CategoryGoods>,
    default:()=>{}
  },
  hasHoverStyle:{
    type:Boolean,
    default:true
  }
})
// withDefaults(defineProps<{goods?:CategoryGoods}>(),{
//   goods:()=>({
//     name:"",
//     picture:"",
//     desc:"",
//     price:"",
//     id:""
//   })
// })
</script>
<template>
    <RouterLink :to="`/detail/${goods.id}`" class="goods-item" :class="{'hover-item':hasHoverStyle}">
        <img v-img-lazy="goods.picture" alt="" />
        <p class="name ellipsis">{{ goods.name }}</p>
        <p class="desc ellipsis">{{ goods.desc }}</p>
        <p class="price">&yen;{{ goods.price }}</p>
    </RouterLink>
</template>
<style lang="scss" scoped>
    .goods-item {
      display: block;
      width: 220px;
      padding: 20px 30px;
      text-align: center;
      &.hover-item{
        transition: all .5s;
        &:hover {
          transform: translate3d(0, -3px, 0);
          box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
        }
      }
      img {
        width: 160px;
        height: 160px;
      }

      p {
        padding-top: 10px;
      }

      .name {
        font-size: 16px;
      }

      .desc {
        color: #999;
        height: 29px;
      }

      .price {
        color: $priceColor;
        font-size: 20px;
      }
    }
</style>