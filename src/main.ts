import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import naive from "naive-ui";

import InstantSearch from "vue-instantsearch/vue3/es";

const app = createApp(App);

app.use(createPinia());
app.use(InstantSearch);
app.use(router);
app.use(naive);

app.mount("#app");
