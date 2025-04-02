import {computed,onUnmounted,ref} from "vue";
import dayjs from 'dayjs'
export const useCountDown = ()=>{
    let time = ref<number>(0);
    let formatTime = computed(()=>dayjs.unix(time.value).format("mm分ss秒"));
    let timer:any = null;
    const start = (currenTime:number)=>{
        if(currenTime<=0){
            ElMessage.error("订单支付超时");
            return;
        }
        time.value = currenTime;
        timer = setInterval(()=>{
            if(time.value<=0){
                ElMessage.error("订单支付超时");
                clearTimer();
                return;
            }
            time.value--;
        },1000)
    }
    const clearTimer = ()=>{
        timer&&clearInterval(timer);
    }
    onUnmounted(()=>clearTimer())
    return {formatTime,start}
}