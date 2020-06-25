import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var store = new Vuex.Store({
    state: {
        goodslist: [], //获取商品数据
        sellerlist:'' //店铺信息
    },
    mutations: {
        getgoods(state, val) {
            state.goodslist = val
        },
        changeGoodsNum(state, parmis) {
            for (let obj of state.goodslist) {
                for (let child of obj.foods) {
                    if (parmis.id == child.id) {
                        child.num += parmis.val
                    }
                }

            }
        },
        getseller(state,val){
            state.sellerlist=val
        }
    },
    getters: {
        shopcarlist(state) {
            let arr = []
            for (let obj of state.goodslist) {
                for (let good of obj.foods) {
                    if (good.num > 0) {
                        arr.push(good)
                    }
                }
                
            }
            return arr
        }
    }
})



export default store