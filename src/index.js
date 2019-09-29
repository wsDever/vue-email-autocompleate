
import Vue from 'vue';
import App from './app.vue';
import emailAutocompleate from './components/email-autocompleate'
// import pictureShow from '../dist/main.js'

Vue.use(emailAutocompleate)
new Vue({
    el: '#app',
    render: h => h(App),
});
