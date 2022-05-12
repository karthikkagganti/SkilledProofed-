import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/'

import gAuthPlugin from 'vue3-google-oauth2';
const app = createApp(App);
let gauthClientId = '799047835477-md6uctosfpelj09ceun0vfsn280aoqj4.apps.googleusercontent.com';

app.use(gAuthPlugin, {
  clientId: gauthClientId,
  scope: 'email',
  prompt: 'consent',
})

app.use(store).use(router, axios).mount('#app')
