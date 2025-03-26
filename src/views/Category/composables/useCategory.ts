import { ref,onMounted } from "vue";
import { useRoute,onBeforeRouteUpdate } from "vue-router";
import { type Category } from "@/types";
import { getTopCategoryAPI } from "@/apis/category";
export default function(){
    const route = useRoute();
    let categoryData = ref<Category>();
    const getTopCategory = async (id = route.params.id) => {
        let { result } = await getTopCategoryAPI(id);
        // console.log("-result-getTopCategory",result)
        categoryData.value = result;
    }
    onMounted(() => {
        getTopCategory();
    })
    onBeforeRouteUpdate((to)=>{
    //   console.log("route--",route,route.params.id);
      getTopCategory(to.params.id);
    })
    return {categoryData}
}