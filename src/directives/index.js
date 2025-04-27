import imgLazyLoad from "./img-lazy"
import throttleClick from "./throttle-click";
import copyText from "./copy-text";
export const imgLazyPlugin = {
    install(app, options) {
      app.directive("img-lazy",imgLazyLoad(options));
      app.directive("throttle",throttleClick);
      app.directive("copy",copyText);
    }
  }