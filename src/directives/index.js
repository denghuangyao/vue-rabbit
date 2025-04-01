import { useIntersectionObserver } from "@vueuse/core"
export const imgLazyPlugin = {
    install(app, options) {
      app.directive("img-lazy",{
        mounted(el,binding) {
            let {stop} = useIntersectionObserver(el,([{isIntersecting}])=>{
                if(isIntersecting){
                    el.src = binding.value;
                    stop();
                }
            })
        },
      })
    }
  }