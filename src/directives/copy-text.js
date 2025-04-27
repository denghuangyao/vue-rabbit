const vCopy = {
    /**
     * 在指令绑定的元素挂载时执行的函数
     * @param {HTMLElement} el - 指令挂载的元素
     * @param {string} value - 要复制的内容
     */
    mounted(el,{value}){
        el.$value = value;//全局属性存储复制内容
        el.handler = ()=>{
            if(!el.$value){
                ElMessage.warning("无复制内容!")
                return;
            }
            let textarea = document.createElement("textarea");
            //将文本设为只读,防止ios自带唤起键盘
            textarea.readOnly = true;
            //同时将文本移出可视区域
            textarea.style.position = "absolute";
            textarea.style.left = "-9999px";
            //将copy内容赋值到文本框中
            textarea.value = el.$value;
            document.body.appendChild(textarea);
            //选中并复制
            textarea.select(); 
            let result = document.execCommand("copy");
            if(result){
                ElMessage.success("复制成功!");
            }
            //复制完成后删除文本框
            document.body.removeChild(textarea);
        }
        //绑定点击事件:一键copy
        el.addEventListener('click',el.handler);
    },
    /**
     * 指令绑定元素更新前调用，更新指令绑定的当前值。
     */
    beforeUpdate(el,{value}) {
        el.$value = value;
    },
    /**
     * 指令与元素解绑时,移除元素的事件监听器
     */
    unmounted(el){
        el.removeEventListener('click',el.handler)
    }
}
export default vCopy;