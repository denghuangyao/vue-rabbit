import imgLazyLoad from "./img-lazy"
import throttleClick from "./throttle-click";
import copyText from "./copy-text";
import permission from "./permission";
export const imgLazyPlugin = {
    install(app, options) {
      // 图片懒加载
      app.directive("img-lazy",imgLazyLoad(options));
      // 防抖点击事件
      app.directive("throttle",throttleClick);
      // 复制文本
      app.directive("copy",copyText);
      // 按钮权限控制
      app.directive("permission",permission)
    }
  }