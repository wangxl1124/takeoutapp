<template>
  <div class="evaluate">
    <div class="score">
      <div>
        <p>3.9</p>
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
        <button>全部</button>
        <button>满意</button>
        <button>不满意</button>
      </div>
    </div>

    <ul class="acceva">
      <li v-for="(item,index) in list" :key="index">
        <div class="headpic">
          <img :src="item.avatar" />
        </div>
        <div>
          <div class="acctime">
            <span>{{item.username}}</span>
            <span>{{new Date(item.rateTime).toLocaleString()}}</span>
          </div>
          <p>
            <van-rate v-model="item.score" />
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
      value: 4,
      value1: 4,
      list: [],
      timelist:0
    };
  },
  created() {
    API_GET_RATINGS().then(res => {
      this.list = res.data.data;
      //console.log(this.list);
    });
    API_GET_SELLER().then(res => {
      this.timelist=res.data.data.deliveryTime
    });
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
      .acctime{
          display: flex;
          justify-content: space-between;
          align-items: center;
      }
    }
  }
}
</style>