<template>
  <div class="home">
    <div class="top-nav">
      <p>足迹故事</p>
    </div>

    <div class="main-area">
      <div class="top-text">
        <p>欢迎来到足迹故事，来这里记录自己的足迹和故事，你最棒！</p>
      </div>

      <div class="gaode-box">
        
        <Gaode class="map" @clickPoint="clickPoint"></Gaode>

        <div class="info-box" :class="isShow ? 'show' : 'hide'">
          <div class="close" @click="closeInfo">x</div>
        </div>
      </div>

      <!-- <div class="article">
        <p>这就是文章图片啊啥的地方啊啊啊！！！</p>
      </div> -->
    </div>
  </div>
</template>

<script>
import Gaode from './Gaode.vue';

export default {
  name: 'Home',

  components: { Gaode },

  data() {
    return {
      isShow: false
    }
  },

  mounted() {
  },

  methods: {
    clickPoint(e) {
      console.log('click point show at parent !');
      console.log(e);

      this.isShow = true;
    },
    closeInfo() {
      this.isShow = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  background-color: darkseagreen;
}
.top-nav {
  width: 100%;
  height: 60px;
  background-color: #dbdde4;

  p {
    text-align: left;
    font-size: 25px;
    color: #fff;
    padding-left: 30px;
    line-height: 60px;
  }
}

.main-area {
  max-width: 900px;
  margin: 30px auto 50px;

  .top-text {
    text-align: left;
    font-size: 17px;
    margin-bottom: 10px;
  }

  .gaode-box {
    position: relative;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.15);
    border-radius: 5px;
    overflow: hidden;

    .map {
      position: relative;
      z-index: 10;
    }

    .info-box {
      position: absolute;
      right: -300px;
      top: 0;
      bottom: 0;
      width: 300px;
      background-color: rgba(240, 240, 236, 0.699);
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.15);
      z-index: 100;
      transition: .4s;

      &.show {
        transform: translateX(-100%);
      }

      .close {
        position: absolute;
        left: 10px;
        top: 10px;
        width: 16px;
        height: 16px;
        font-size: 26px;
        color: #fff;
        transition: .2s;
        cursor: pointer;

        &:hover {
          color: #748cf4;
        }
      }
    }
  }

  .article {
    margin-top: 30px;
    height: 500px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.15);
    border-radius: 5px;
    background-color: #fff;
  }
}
</style>
