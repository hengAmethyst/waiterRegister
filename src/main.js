import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import index from './components/index'
import succeed from './components/succeed'
import Resource from 'vue-resource'
import $ from 'n-zepto'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Resource)

//路由
const router = new VueRouter({
	routes:[
		{path:'/',component:index},
		{path:'/succeed',component:succeed}
	]
})

new Vue({ 
	router:router,
	render: h => h(App)
}).$mount('#app')
