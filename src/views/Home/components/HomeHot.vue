<script setup lang="ts">
import { ref,onMounted } from "vue";
import HomePanel from './HomePanel.vue';
import { getHotAPI } from "@/apis/home"
import { type Hot } from "@/types";
let hotList = ref<Hot[]>([]);
const getHot = async ()=>{
    let res = await getHotAPI();
    // console.log("-res-getHot-",res)
    hotList.value = res.result;
}
onMounted(() => {
    getHot();
})

</script>
<template>
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
        <ul class="goods-list">
        <li v-for="item in hotList" :key="item.id">
          <RouterLink :to="`/detail/${item.id}`">
            <img v-img-lazy="item.picture" alt="">
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>
      </ul>
    </HomePanel>
</template>
<style lang="scss" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>