import axios from 'axios'
export const SERVER_IP = 'http://192.168.0.53:5000'

axios.defaults.baseURL = SERVER_IP

//1.获取商品数据
export const API_GET_GOODLIST = () => axios.get('/goods/goods_list')

//2、获取商家
export const API_GET_SELLER = () => axios.get('/shop/seller')

//3、获取评价数据
export const API_GET_RATINGS = () => axios.get('/shop/ratings')
