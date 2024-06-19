import {App, Plugin} from 'vue';

import 'vue3-carousel/dist/carousel.css'
import "../style.css";
import {default as libComponent} from './lib-components/LktCarousel.vue';

const LktCarousel: Plugin = {
  install: (app: App) => {
    // Register plugin components
    if (app.component('lkt-carousel') === undefined) app.component('lkt-carousel', libComponent);

  }
};

export default LktCarousel;
export {debugLktCarousel} from "./functions/settings-functions";
