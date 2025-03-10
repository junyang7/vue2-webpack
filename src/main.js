import Vue from 'vue'
import App from './App.vue'
import 'remixicon/fonts/remixicon.css'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import router from './router'

Vue.use(ViewUI);
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
