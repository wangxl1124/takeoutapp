<template>
  <div style="width:100%;height:100%">
    <index v-show="showLoad" />
    <img id="loadimg" v-show="!showLoad" src="./assets/imgs/load.jpg" />
  </div>
</template>

<script>
import index from "./pages/Index";
export default {
  data(){
    return {
     showLoad:false
    }
  },
  components: {
    index
  },
  created(){
    setTimeout(()=>{
        this.showLoad=true
      },1000)
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#loadimg {
  width: 100%;
}
html,
body {
  height: 100%;
}
</style>
