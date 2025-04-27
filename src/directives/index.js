import imgLazyLoad from "./img-lazy"
export const imgLazyPlugin = {
    install(app, options) {
      app.directive("img-lazy",imgLazyLoad(options))
    }
  }