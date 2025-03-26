import { ref,onMounted } from "vue";
import { getBannerAPI } from "@/apis/home";
import { type Banner } from "@/types";
export default function(){
    let bannerList = ref<Banner[]>([])
    const getBanner = async () => {
      let { result } = await getBannerAPI("2")
      bannerList.value = result;
    }
    onMounted(() => getBanner())
    return {bannerList}
}