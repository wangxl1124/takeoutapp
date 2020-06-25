<template>
  <div class="goodspage">
    <!-- 左边 -->
    <div id="left_box" class="goodlist">
      <div>
        <ul>
          <li
            :class="{titleActive: curSelect==index}"
            @click="clickleft(index)"
            v-for="(item,index) in goodslist"
            :key="index"
          >{{goodslist[index].name}}</li>
        </ul>
      </div>
    </div>
    <!-- 右边 -->
    <div id="right_box" class="listcontent">
      <div>
        <div :id="index" v-for="(item,index) in goodslist" :key="index">
          <h4 :id="index">{{goodslist[index].name}}</h4>
          <div v-for="(child,index) in item.foods" :key="index" class="foods">
            <van-card :price="child.price.toFixed(2)" :desc="child.goodsDesc" :title="child.name" :thumb="child.imgUrl" />
            <div class="addfood">
              <span class="hid_span">
                <button v-show="child.num>0" class="red_btn" @click="clickChange(-1,child.id)">-</button>
                <span v-show="child.num>0">{{child.num}}</span>
              </span>
              <button class="add_btn" @click="clickChange(1,child.id)">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API_GET_GOODLIST,SERVER_IP } from "@/api/apis";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      curSelect: 0 //定义变量保存默认激活样式索引
    };
  },
  created() {
    //获取商品数据
    API_GET_GOODLIST().then(res => {
      let arr = res.data.goodsList;
      for (let obj of arr) {
        for (let child of obj.foods) {
          child.num = 0;  //给数据添加一个num属性 
          child.imgUrl = child.imgUrl.replace(
            "http://127.0.0.1:5000",
            SERVER_IP
          )
          //console.log(child.imgUrl);
        }
      }
     
      this.$store.commit("getgoods", arr);
   // console.log(this.$store.state.goodslist);
      
    });


  },
  mounted() {
    //初始化左边滚动面板
    this.leftbox = new BScroll("#left_box", {
      click: true
    });
    //console.log(this.leftbox);

    //初始化右边滚动面板
    this.right = new BScroll("#right_box", {
      probeType: 3
    });
    //console.log(this.right);
    //获取滚动距离
    this.right.on("scroll", obj => {
      let _y = Math.abs(obj.y);
      //console.log(_y);
      //console.log(this.getHeight);

      //循环判断，当滚动距离满足区间条件，把索引赋给curSelect
      for (let obj of this.getHeight) {
        if (_y >= obj.min && _y < obj.max) {
          this.curSelect = obj.index;
          break;
        }
      }
    });
  },
  computed: {
    getHeight() {
      let heightarr = []; //定义数组保存每个div的距离
      let totalheight = 0;
      for (let i = 0; i < this.goodslist.length; i++) {
        //获取每个id
        let divheight = document.getElementById(i).offsetHeight;
        // console.log(divheight)
        heightarr.push({
          index: i,
          min: totalheight,
          max: divheight + totalheight
        });

        totalheight += divheight;
      }
      //console.log(heightarr);

      return heightarr;
    },
    goodslist(){
        return this.$store.state.goodslist
    }
  },
  methods: {
    //点击左边联动
    clickleft(index) {
      this.curSelect = index;
      this.right.scrollToElement(document.getElementById(index), 600);
    },

    clickChange(val, id) {
       //console.log(val, id);
      this.$store.commit('changeGoodsNum',{val,id})
    }
  }
};
</script>

<style lang="scss" scoped>
.titleActive {
  background-color: #fff;
}

.goodspage {
  display: flex;
  flex: 1;
  padding-bottom: 60px;
  overflow-y: scroll;
  background-color: #f4f5f7;

  .goodlist {
    width: 100px;
    height: 100%;
    overflow: auto;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      text-align: center;
      border-bottom: 1px solid #ccc;
      font-size: 14px;
      padding: 0 10px;
    }
  }
  .listcontent {
    flex: 1;
    height: 100%;
    overflow-y: scroll;

    h4 {
      font-size: 16px;
      margin-left: 15px;
      font-weight: normal;
      color: #959aa0;
    }
    .foods {
      position: relative;
      .addfood {
        display: flex;
        position: absolute;
        bottom: 3px;
        right: 3px;
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