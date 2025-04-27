import imgLazyLoad from "./img-lazy"
import throttleClick from "./throttle-click";
export const imgLazyPlugin = {
    install(app, options) {
      app.directive("img-lazy",imgLazyLoad(options));
      app.directive("throttle",throttleClick)
    }
  }