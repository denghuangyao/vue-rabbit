// import { useIntersectionObserver } from "@vueuse/core"

/**
 * 使用Html5 IntersectionObserver API监控元素是否进入或离开视口
 *
 * @param {HTMLElement} el - 要监控的DOM元素
 * @param {IntersectionObserverCallback} entries - 回调函数，当元素进入或离开视口时调用
 * @returns {Object} - 包含停止监控的方法的对象
 */
function useIntersectionObserver(el, entries) {
    // console.log("--",window.IntersectionObserver,IntersectionObserver)
  let observer = new window.IntersectionObserver(entries);
  observer.observe(el);
  return {
    stop: ()=>observer.unobserve(el),
  };
}

/**
 * 原生API判断监控元素是否进入或离开视口
 * @param {HTMLElement} el - 要加载图片的DOM元素
 */
function load(el){
    let windowHeight = document.documentElement.clientHeight;
    let {top:elTop,bottom:elBtm} = el.getBoundingClientRect();
    let realSrc = el.dataset.src;
    if(elTop-windowHeight<0&&elBtm>0){
        if(realSrc){
            el.setAttribute("src",realSrc);
            el.removeAttribute("datasrc");
        }
    }
}
/**
 * 节流函数:用于快速滚动页面，只加载当前视口的图片即可，不用加载全部滑动过的页面图片
 * @param func 需要被节流的函数
 * @param delay 节流时间间隔（毫秒）
 * @returns 返回节流后的函数
 */
function throttle(func,delay){
    let prevTime,timer;
    //在此处this指向，如果是lazyLoad.throttle调用,则this={throttle}=lazyLoad对象
    return function(...args){
        let currentTime = Date.now();
        let context = this;//undefined
        // console.log("-context-",context)
        if(!prevTime) prevTime = currentTime;
        if(currentTime - prevTime > delay){
            func.apply(context,args);
            prevTime = Date.now();
            clearTimeout(timer)
            return
        }
        clearTimeout(timer);
        timer = setTimeout(()=>{
            prevTime = Date.now();
            func.apply(context,args);
            timer = null;
        },delay)
    }
}
/**
 * 观察元素与视口的交互情况，并根据交互情况设置元素的src属性
 *
 * @param {HTMLElement} el 需要被观察的元素
 * @param {Object} binding 包含要设置的src值的对象
 */
function observe(el,binding){
    if("IntersectionObserver" in window){
        let { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
            if (isIntersecting) {
              el.src = binding.value;
              stop();
            }
        });
    }else{
        let handler = throttle(load,500);
        window.addEventListener("scroll",()=>{
            handler(el);
        });
    }
}
/**
 * 初始化元素属性
 *
 * @param {HTMLElement} el - 需要初始化的HTML元素
 * @param {string} value - 需要设置的data-src属性值
 * @param {string} defaultSrc - 默认的图片src属性值
 */
function init(el,value,defaultSrc){
    el.setAttribute("data-src",value);
    el.setAttribute("src",defaultSrc);
}
/**
 * 加载延迟图片组件
 *
 * @param options 配置对象
 * @returns Vue生命周期钩子对象
 */
const loadLazy = options =>({
    created(el,binding){
        console.log("options--",options)
        let defaultSrc = options.default
        init(el,binding.value,defaultSrc)
    },
    mounted(el, bind) {
        observe(el,bind)
    }
})
export default loadLazy;
