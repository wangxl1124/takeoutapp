<template>
  <div class="goodspage">
    <!-- 左边 -->
    <div id="left_box" class="goodlist">
      <div>
        <ul>
          <li
            :class="{titleActive: curSelect==index}"
            @click="clickleft(index)"
            v-for="(item,index) in list"
            :key="index"
          >{{list[index].name}}</li>
        </ul>
      </div>
    </div>
    <!-- 右边 -->
    <div id="right_box" class="listcontent">
      <div>
        <div :id="index" v-for="(item,index) in list" :key="index">
          <h4 :id="index">{{list[index].name}}</h4>
          <div v-for="(i,index) in item.foods" :key="index" class="foods">
            <van-card :price="i.price" :desc="i.goodsDesc" :title="i.name" :thumb="i.imgUrl" />
            <div class="addfood" >
              <!-- <van-stepper theme="round" button-size="22" disable-input show-minus /> -->
              <!-- <van-icon name="add" size="25px" color="#FFC641" /> -->
              <span class="hid_span">
                <button class="red_btn">-</button>
                <span>1</span>
              </span>
              <button class="add_btn" @click="clickAdd">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API_GET_GOODLIST, SERVER_IP } from "@/api/apis";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      list: [], //商品列表
      curSelect: 0 //定义变量保存默认激活样式索引
    };
  },
  created() {
    API_GET_GOODLIST().then(res => {
      let obj = res.data.goodsList;
     
      for (let i = 0; i < obj.length; i++) {
        for (let j = 0; j < obj[i].foods.length; j++) {
          obj[i].foods[j].imgUrl = obj[i].foods[j].imgUrl.replace(
            "http://127.0.0.1:5000",
            SERVER_IP
          );         
        }
      }
      this.list=obj
      //console.log(this.list)
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
      for (let i = 0; i < this.list.length; i++) {
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
    }
  },
  methods: {
    //点击左边联动
    clickleft(index) {
      this.curSelect = index;
      this.right.scrollToElement(document.getElementById(index), 600);
    },

    clickAdd() {
      document.querySelector(".hid_span").style.display = "block";
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
          display: none;
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