import useUserStore from '@/store/userStore';
const hasPermission = value => {
    const userStore = useUserStore();
    let permission = userStore.getUserInfo().permission;
    let isExist = false;
    if(permission.indexOf(value) > -1){
        isExist = true;
    }
    return isExist;
}
const permissionDirective = {
    mounted(el,{value}){
        if(hasPermission(value)){
            el.parentNode.removeChild(el)
        }
    }
}
export default permissionDirective;