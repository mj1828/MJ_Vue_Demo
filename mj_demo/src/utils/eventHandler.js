import Vue from 'vue'
import {getRequest} from './apiUtils'
Vue.prototype.getRequest = getRequest;
export default new Vue();