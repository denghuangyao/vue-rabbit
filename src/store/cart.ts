import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import type { Cart } from "@/types";
export default defineStore(
  "cart",
  () => {
    let cartList = reactive<Cart[]>([]);
    const addCart = (cart: Cart) => {
      let item: any = cartList.find((item: Cart) => item.skuId == cart.skuId);
      if (item) {
        item.count += cart.count;
      } else {
        cartList.push(cart);
      }
    };
    const delCart = (skuId: any) => {
    //   console.log("-delCart-", skuId);
      let idx: any = cartList.findIndex((item: Cart) => item.skuId === skuId);
      cartList.splice(idx, 1);
    };
    let totalCount = computed(() => cartList.reduce((a, c) => a + c.count, 0));
    let totalPrice = computed(() => cartList.reduce((a, c) => a + c.count * Number(c.price), 0));
    return { cartList, addCart, delCart, totalCount, totalPrice };
  },
  { persist: true }
);
