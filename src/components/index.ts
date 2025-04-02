import type { App } from "vue"
import ImageView from "@/components/ImageView/index.vue";
import XtxSku from "@/components/XtxSku/index.vue";
import XtxDialog from "@/components/XtxDialog/index.vue";
export default {
    install(app:App){
        app.component("XtxImageView",ImageView);
        app.component("XtxSku",XtxSku);
        app.component("XtxDialog",XtxDialog);
    }
}