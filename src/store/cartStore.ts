import { defineStore } from "pinia";
import { ref, computed,watch } from "vue";
import type { Cart } from "@/types";
import useUserStore from "@/store/userStore";
import { insertCartAPI,updateNewListAPI,delCartAPI,selectCartAPI,updateCartAPI,mergeCartAPI } from "@/apis/cart"
export default defineStore(
  "cart",
  () => {
    const userStore = useUserStore();
    let isLogin = computed(()=>userStore.userInfo.token);
    let cartList = ref<Cart[]>([]);
    const updateNewList = async ()=>{
      let {result} = await updateNewListAPI();
      cartList.value = result;
    }
    const clearCart = ()=>{
      cartList.value = [];
    }
    //加入购物车
    const addCart = async (cart: Cart) => {
      if(isLogin.value){
        await insertCartAPI({
          skuId:cart.skuId,
          count:cart.count
        })
        updateNewList();
        return;
      }
      let item: any = cartList.value.find((item: Cart) => item.skuId == cart.skuId);
      if (item) {
        item.count += cart.count;
      } else {
        cartList.value.push(cart);
      }
    };
    //删除购物车action
    const delCart = async (skuId: any) => {
      if(isLogin.value){
        await delCartAPI([skuId]);
        updateNewList();
        return;
      }
    //   console.log("-delCart-", skuId);
      let idx: any = cartList.value.findIndex((item: Cart) => item.skuId === skuId);
      cartList.value.splice(idx, 1);
    };
    /**注意：computed返回的ComputedRefImpl，在setup中使用要用 `.value` */
    //当前购物车商品总数：count累加
    let totalCount = computed(() => cartList.value.reduce((a:number, c:Cart) => a + c.count, 0));
    //当前购物车商品总价：count*price累加
    let totalPrice = computed(() => cartList.value.reduce((a:number, c:Cart) => a + c.count * Number(c.price), 0));
    //全选购物车
    const allCheck = async (selected:boolean)=>{
      if(isLogin.value){
        let skuIds = cartList.value.map(item=>item.skuId);
        await selectCartAPI(skuIds,selected);
        updateNewList();
      }else{
        cartList.value.forEach((cart:Cart)=>cart.selected = selected);
      }
    }
    //选择购物车action
    const singleCheck = async (skuId:any,selected:boolean)=>{
      if(isLogin.value){
        await updateCartAPI(skuId,{selected});
        updateNewList();
        return;
      }
      let cartItem = cartList.value.find((item:Cart)=>item.skuId===skuId);
      cartItem?cartItem.selected=selected:null;
    }
    //修改购物车商品信息
    const updateCart = async (skuId:any,count:any)=>{
      if(isLogin.value){
        await updateCartAPI(skuId,{count});
        updateNewList();
      }
    }
    //合并购物车
    const mergeCart = async ()=>{
      await mergeCartAPI(cartList.value.map(item=>({skuId:item.skuId,selected:item.selected,count:item.count})));
      updateNewList();
    }
    //是否已全选
    let isAllSelected = computed(()=>cartList.value.every((c:Cart)=>c.selected));
    //已选商品总数：count累加
    let selectedList = computed(()=>cartList.value.filter((c:Cart) =>c.selected));
    let selectedCount = computed(()=>selectedList.value.reduce((a:number,c:Cart)=>a+c.count,0));
    //已选商品总价：count*price累加
    let selectedTotalPrice  = computed(()=>selectedList.value.reduce((a:number,c:Cart)=>a+c.count*c.price,0));
    watch(cartList.value,(newValue:any)=>{
      console.log("-new-cartList改变了",newValue)
    })
    return { cartList, totalCount, totalPrice,isAllSelected,selectedCount,selectedTotalPrice, addCart, delCart, singleCheck,allCheck,clearCart,updateCart,mergeCart,updateNewList };
  },
  { persist: true }
);
