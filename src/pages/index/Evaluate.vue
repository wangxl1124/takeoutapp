<template>
  <div class="evaluate">
    <div class="score">
      <div>
        <p>4.3</p>
        <p>综合评分</p>
        <span>高于周边商家69.2%</span>
      </div>
      <div></div>
      <div>
        <p>
          服务态度
          <van-rate v-model="value" />
        </p>
        <p>
          服务态度
          <van-rate v-model="value1" />
        </p>
        <p>
          送达时间
          <span>{{timelist}}分钟</span>
        </p>
      </div>
    </div>

    <div class="evaluates">
      <div>
        <button @click="clickAll">全部{{alllen}}</button>
        <button @click="clickChange1">满意{{oklen}}</button>
        <button @click="clickChange2">不满意{{nolen}}</button>
      </div>
    </div>

    <ul class="acceva">
     
      <li v-for="(item,index) in list" :key="index">
        <div class="headpic">
          <img :src="item.avatar" />
        </div>
        <div class="evamsg">
          <div class="acctime">
            <p>{{item.username}}</p>
            <p>{{new Date(item.rateTime).toLocaleString()}}</p>
          </div>
          <p class="times">
            <van-rate v-model="item.score" />
            <span>{{item.deliveryTime}}分钟送达</span>
          </p>
          <p>{{item.text}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { API_GET_RATINGS, API_GET_SELLER } from "@/api/apis";
export default {
  data() {
    return {
      value: 4, //服务态度星星
      value1: 4,
      list: [], //评论数据
      timelist: 0, //评论时间
      alllen: 0, //全部评论条数
      oklen: 0, //满意条数
      oklenlist:[],
      nolen: 0, //不满意条数
      nolenlist:[]
    };
  },
  created() {
    API_GET_RATINGS().then(res => {
      this.list = res.data.data;
      this.alllen = this.list.length;
      for (let obj of this.list) {
        //console.log(obj);
        if (obj.rateType == 0) {
          this.oklen++;
          this.oklenlist.push(obj)
        } else {
          this.nolen++;
          this.nolenlist.push(obj)
        }
      }
    });
    API_GET_SELLER().then(res => {
      this.timelist = res.data.data.deliveryTime;
    });
  },
  methods: {
    clickAll() {
      //console.log(this.list);
      API_GET_RATINGS().then(res => {
        this.list = res.data.data;
        //console.log(this.list);
        
      });
     },
    clickChange1() {
      //console.log(val);
      
      this.list = this.oklenlist
    },
    clickChange2(){
      this.list = this.nolenlist
    }
  }
};
</script>

<style lang="scss" scoped>
.evaluate {
  background-color: #f4f5f7;
  padding-bottom: 80px;
  overflow: hidden;
  overflow-y: scroll;
  .score {
    padding: 20px 20px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    div:nth-child(1) {
      text-align: center;
      p:first-child {
        font-size: 25px;
        color: #f60;
      }
      span {
        font-size: 12px;
        color: #929398;
      }
    }
    div:nth-child(2) {
      border-left: 1px solid #ccc;
    }
    div:nth-child(3) {
      padding-left: 10px;
      p {
        border: none;
      }
    }
  }
  .evaluates {
    background-color: #fff;
    margin-top: 20px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    div:first-child {
      padding: 20px;
      button {
        width: 80px;
        height: 40px;
        margin-right: 10px;
        border: none;
      }
      button:first-child {
        background-color: #00a0dc;
        color: #fff;
      }
      button:nth-child(2) {
        background-color: #ccecf7;
      }
      button:last-child {
        background-color: #eaebed;
      }
    }
  }
  .acceva {
    background-color: #fff;
    padding: 0 20px;

    li {
      padding: 20px 0;

      border-bottom: 1px solid #ccc;
      display: flex;
      .headpic {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;
        overflow: hidden;

        img {
          width: 40px;
        }
      }
      .evamsg {
        flex: 1;
        .acctime {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }

      .times {
        display: flex;
        align-items: center;
        span {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>