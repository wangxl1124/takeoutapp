<template>
  <div class="cardiv" >
    <!-- <div class="shopcar">
      <span>购物车</span>
      <div>
        <img src="../assets/imgs/laji.png" />
        <span>清空购物车</span>
      </div>
    </div> -->
    <div class="carMsg" >
      <ul >
        <li class="goods" v-for="item in shopcarlist" :key="item.id">
          <p>{{item.name}}</p>
          <p>
            ￥
            <span>{{(item.price*item.num).toFixed(2)}}</span>
          </p>

          <div class="addfood">
            <span class="hid_span">
              <button class="red_btn" v-show="item.num>0" @click="clickChange(-1,item.id)">-</button>
              <span v-show="item.num>0">{{item.num}}</span>
            </span>
            <button class="add_btn" @click="clickChange(1,item.id)">+</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

  computed: {
    goodslist() {
      return this.$store.state.goodslist;
    },
    shopcarlist(){
        return this.$store.getters.shopcarlist
    }
  },
  methods: {
    clickChange(val, id) {
      //console.log(val, id);
      this.$store.commit("changeGoodsNum", { val, id });
    }
  }
};
</script>

<style lang="scss" scoped>
.cardiv {
    // padding-top:41px;
//   .shopcar {
//       width:100%;
//       bottom:169px;
//     position: fixed;
//     display: flex;
//     justify-content: space-between;
//     background-color: #F4F4F4;
//     padding: 10px;
//     box-sizing: border-box;
//   }
  .carMsg {
   
    .goods {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      padding: 10px;
      p:first-child {
        width: 170px;
      }
      .addfood {
        display: flex;
        button {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          border: none;
          font-size: 16px;
        }
        .hid_span {
          .red_btn {
            background-color: #fff;
            border: 1px solid #ccc;
            margin-right: 6px;
          }
        }
        .add_btn {
          background-color: #ffc746;
          margin-left: 6px;
        }
      }
    }
  }
}
</style>