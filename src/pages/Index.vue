<template>
  <div class="home">
    <div class="header">
      <div class="model">
        <div class="top">
          <div class="img_div">
            <img :src="list.avatar" alt />
          </div>
          <div class="head_title">
            <div class="title">
              <img src="../assets/imgs/brand@2x.png" alt />
              <h2>{{list.name}}</h2>
            </div>
            <p>{{list.description}} / {{list.deliveryTime}}分钟送达</p>
            <p class="activity">
              <img src="../assets/imgs/decrease_1@2x.png" alt />
              <span>{{list.supports[2]}}</span>
            </p>
          </div>
        </div>
      </div>
      <van-notice-bar left-icon="volume-o" :text="list.bulletin" />
    </div>
    <ul class="nav">
      <li>
        <router-link to="/">商品</router-link>
      </li>
      <li>
        <router-link to="/evaluate">评价</router-link>
      </li>
      <li>
        <router-link to="/merchant">商家</router-link>
      </li>
    </ul>

    <router-view class="content"></router-view>

    <transition name="slide-fade">
      <div class="shopcar_model" v-show="shopCar"></div>
    </transition>

    <div class="footer">
      <div class="round">
        <div class="icon">
          <van-icon name="shopping-cart" color="#808589" size="30px" @click="shopCar=!shopCar" />
        </div>
      </div>
      <h2>
        ￥
        <span>0</span>
      </h2>
      <p>
        另需配送费￥
        <span>{{list.deliveryPrice}}</span>元
      </p>
      <button>￥{{list.minPrice}}起送</button>
    </div>
  </div>
</template>

<script>
import { API_GET_SELLER,SERVER_IP } from "@/api/apis";
export default {
  data() {
    return {
      // showboard: false,
      shopCar: false,
      list: {}
    };
  },
  created() {
    API_GET_SELLER().then(res => {
      let obj = res.data.data;
      obj.avatar = obj.avatar.replace('http://127.0.0.1:5000',SERVER_IP)
      this.list = obj
      //console.log(this.list);
      //this.showLoad=true
    });
  },
  methods: {
    clickCar() {
      this.value = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(300px);
  opacity: 0;
}

a {
  color: #4b565c;
}

.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    width: 100%;
    height: 150px;
    background: url("../assets/imgs/1.jpg");
    background-size: 100%;
    background-position: 0px -36px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .model {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: rgba($color: #000000, $alpha: 0.8);
      .top {
        display: flex;
        align-items: center;

        .img_div {
          width: 80px;
          height: 80px;
          margin-right: 20px;
          margin-left: 30px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .head_title {
          height: 80px;
          .title {
            display: flex;
            align-items: start;
            img {
              width: 40px;
              height: 25px;
              margin-right: 10px;
            }
            h2 {
              color: #fff;
              font-size: 18px;
            }
          }
          p {
            line-height: 30px;
            color: #b6b6b9;
            font-size: 14px;
          }
          .activity {
            display: flex;
            align-items: center;
            img {
              width: 20px;
              height: 20px;
              margin-right: 5px;
            }
          }
        }
      }
    }
    .van-notice-bar{
      height: 25px;
      background-color:rgba($color: #000000, $alpha: 0.8);
      color:#b6b6b9;
    }
  }
  .nav {
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #ccc;
  }
  .content {
    flex: 1;
  }

  .shopcar_model {
    width: 100%;
    height: 200px;
    background-color: #fff;
    position: fixed;
    bottom: 60px;
  }
  .footer {
    width: 100%;
    height: 60px;
    background-color: #131d26;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .round {
      width: 70px;
      height: 70px;
      background-color: #131d26;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: -12px;
      left: 15px;
      .icon {
        width: 50px;
        height: 50px;
        background-color: #2b343d;
        border-radius: 50%;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    h2 {
      color: #929396;
      border-right: 1px solid #262e39;
      padding-right: 10px;
      margin-right: 10px;
    }
    p {
      font-size: 14px;
      color: #85888d;
    }
    button {
      width: 90px;
      height: 100%;
      background-color: #2b343b;
      margin-left: 20px;
      color: #929396;
      border: none;
    }
  }
}
</style>