<template>
  <div class="merchant">
    <div class="introduce_div">
      <div class="eva_top" v-for="(item,index) in list" :key="index">
        <h4>{{item.name}}</h4>
        
        <div class="estimate">
          <van-rate v-model="numvalue" />
          <p>
            <span>({{item.score}})</span>
            <span>
              月售
              <span>{{item.sellCount}}</span>单
            </span>
          </p>
          <p v-show="showcoll" class="coll_p">已收藏</p>
        </div>
      </div>
      <div class="collect_div" @click="clickcoll">
        <van-rate
          v-model="collectval"
          icon="like"
          void-icon="like-o"
          count="1"
          color="red"
          size="25px"
        />
      </div>
      <div class="price" v-for="(item,index) in list" :key="index">
        <div class="price_div">
          <p class="send">起送价</p>
          <p>
            <span>{{item.minPrice}}</span>元
          </p>
        </div>
        <div class="bor_right"></div>
        <div class="price_div">
          <p class="send">商家配送</p>
          <p>
            <span>{{item.deliveryPrice}}</span>元
          </p>
        </div>
        <div class="bor_right"></div>
        <div class="price_div">
          <p class="send">平均配送时间</p>
          <p>
            <span>{{item.deliveryTime}}</span>分钟
          </p>
        </div>
      </div>
    </div>
    <div class="activity">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <p>公告与活动</p>
          <p>{{ item.bulletin}}</p>
          <ul>
            <li v-for="i in item.supports" :key="i">
              <p>{{i}}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="live_pic">
      <p class="title">商家实景</p>
      <p v-for="(item,index) in list" :key="index" class="imgs">
        <img v-for="i in item.pics" :key="i" :src="i" alt />
      </p>
    </div>

    <ul class="mer_msg" v-for="(item,index) in list" :key="index">
      <li>商家信息</li>
      <li>该商家支持开发票，请在下单时填写好发票抬头</li>
      <li>地址：成都市天府新谷</li>
      <li>营业时间：{{item.date[0]}}-{{item.date[1]}}</li>
    </ul>
  </div>
</template>

<script>
import { API_GET_SELLER } from "@/api/apis";
export default {
  data() {
    return {
      numvalue: 5,
      collectval: 0,
      collectflag: false,
      showcoll: false,
      list: [],
      
    };
  },
  created() {
    API_GET_SELLER().then(res => {
      // console.log( res.data);
      this.list.push(res.data.data);
      //console.log(this.list);
    });
  },
  methods: {
    clickcoll() {
      if (this.collectflag == false) {
        this.collectval = 1;
        this.collectflag = true;
        this.showcoll = true;
      } else {
        this.collectval = 0;
        this.collectflag = false;
        this.showcoll = false;
      }
    },
    showPopup() {
      this.show = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
.merchant {
  background-color: #f4f5f7;
  overflow: hidden;
  overflow-y: scroll;
  padding-bottom: 80px;
  .introduce_div {
    height: 140px;
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    background-color: #fff;
    position: relative;
    .eva_top {
      height: 70px;
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
      box-sizing: border-box;
    }
      }
      .estimate {
        display: flex;
        align-items: center;
        margin-top: 5px;
        position: relative;
        p {
          margin-left: 10px;
          > span {
            margin-right: 10px;
          }
        }
        .coll_p {
          position: absolute;
          right: 16px;
        }
      }
    }
    .collect_div {
      position: absolute;
      right: 47px;
      top: 6px;
      text-align: center;
    }
    .price {
      display: flex;
      justify-content: space-between;
      .price_div {
        width: 100px;
        text-align: center;
        font-size: 15px;
        margin-top: 10px;
        .send {
          color: #a0a3a6;
        }
        span {
          font-size: 26px;
        }
      }
      .bor_right {
        margin-top: 10px;
        border-right: 1px solid #ccc;
      }
    }
  
  .activity {
    margin-top: 20px;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
    background-color: #fff;
    padding: 0 20px;
    li {
      padding: 10px 0;
      p:nth-child(2) {
        margin-bottom: 12px;
      }
      li {
        border-top: 1px solid #ccc;
      }
    }
  }
  .live_pic {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin-top: 20px;
    background-color: #fff;
    padding: 0 20px;
    .title {
      font-size: 18px;
      line-height: 40px;
    }
    .imgs {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      img {
        margin-bottom: 5px;
      }
    }
  }
  .mer_msg {
    padding: 0 20px;
    margin-top: 20px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    li {
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
    }
    li:last-child {
      border: none;
    }
  
}
</style>