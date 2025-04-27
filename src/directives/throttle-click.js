/**
 * 在元素挂载后，为元素添加点击事件的节流处理，防止高频点击事件触发多次回调函数。
*/
export default {
    mounted(el,binding){
        let throttleTime = binding.value || 1000;
        let cbFunc=null;
        el.addEventListener('click',(event)=>{
            if(!cbFunc){
                cbFunc = setTimeout(()=>{
                    cbFunc=null;
                },throttleTime);
            }else{
                //阻止事件冒泡，防止触发父元素的事件处理函数
                event.stopImmediatePropagation();
            }
        },true);
    }
}