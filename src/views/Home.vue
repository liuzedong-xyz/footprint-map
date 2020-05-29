<template>
  <div class="home">
    <div class="top-nav">
      <div class="top-area">
        <p>足迹故事</p>

        <div class="nav-btn">
          <ul class="nav-ul">
            <li class="nav-li">首页</li>
            <li class="nav-li">周边故事</li>
            <li class="nav-li">我的足迹</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="main-area">
      <div class="top-text">
        <p>欢迎来到足迹故事，来这里记录自己的足迹和故事，你最棒！</p>
      </div>

      <div class="gaode-box" :class="isFullScreen ? 'full-screen' : 'normal'">
        
        <Gaode class="map" @clickPoint="clickPoint"></Gaode>

        <div class="info-box" :class="isShow ? 'show' : 'hide'">
          <div class="close" @click="closeInfo">x</div>

          <div class="article-area" v-if="!isLoadingStory && isShow">
            <div class="poster">
              <img :src="storyInfo.poster" alt="">

              <p class="title">{{ storyInfo.title }}</p>
            </div>

            <div class="info">
              <div class="avatar">
                <img :src="storyInfo.userinfo.avatar" alt="">
              </div>
              <p class="nickname">{{ storyInfo.userinfo.nickname }}</p>
              <p class="time">{{ storyInfo.addtime }}</p>
            </div>

            <div class="text">
              <p>{{ storyInfo.content }}</p>
            </div>
          </div>
        </div>

        <button class="full-btn" @click="fullScreen">{{ isFullScreen ? '退出全屏' : '全屏显示' }}</button>
      </div>

      <!-- <div class="article">
        <p>这就是文章图片啊啥的地方啊啊啊！！！</p>
      </div> -->
    </div>

    <div class="bottom-nav">

    </div>
  </div>
</template>

<script>
import Gaode from './Gaode.vue';
import axios from 'axios';

export default {
  name: 'Home',

  components: { Gaode },

  data() {
    return {
      isShow: false,
      isFullScreen: false,
      storyInfo: {},
      isLoadingStory: false
    }
  },

  mounted() {
  },

  methods: {
    clickPoint(e) {
      this.isShow = true;
      this.isLoadingStory = true;

      axios.get('/map_api/MapPc/getStory', {
        params: {
          storyid: e.info.storyid
        }
      }).then(data => {
        console.log(data);

        this.storyInfo = data.data.data;
        this.isLoadingStory = false;
      });
    },
    closeInfo() {
      this.isShow = false;
    },
    fullScreen() {
      this.isFullScreen = !this.isFullScreen;
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  background-color: darkseagreen;
  overflow: hidden;
}
.top-nav {
  width: 100%;
  height: 60px;
  background-color: #dbdde4;

  .top-area {
    max-width: 900px;
    margin: 0 auto;  
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    p {
      text-align: left;
      font-size: 25px;
      color: #fff;
      // padding-left: 30px;
      line-height: 60px;
    }

    .nav-btn {
      flex-grow: 1;
      height: 100%;
      
      .nav-ul {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        list-style: none;
        line-height: 60px;

        .nav-li {
          margin-left: 20px;
          padding: 0 10px;
          cursor: pointer;
          transition: .2s;

          &:hover {
            background-color:#c2c4cb;
          }

          &:first-of-type {
            margin: 0;
          }
        }
      }
    }
  }
}

.bottom-nav {
  width: 100%;
  height: 100px;
  background-color: #6481ea;
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
    transition: .3s;

    &.full-screen {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }

    &.normal {
      height: 750px;
    }

    .full-btn {
      position: absolute;
      left: 20px;
      bottom: 25px;
      padding: 4px 6px;
      outline: none;
      border: none;
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 0.5);
      color: #787878;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.2);
      z-index: 99;
      cursor: pointer;
      transition: .2s;

      &:hover {
        background-color: rgb(255, 255, 255);
      }
    }

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
        color: #454545;
        transition: .2s;
        cursor: pointer;
        z-index: 101;

        &:hover {
          color: #748cf4;
        }
      }

      .article-area {
        .poster {
          position: relative;
          height: 220px;
          overflow: hidden;
          opacity: .8;

          img {
            display: block;
            width: 100%;
            height: 100%;
          }

          .title {
            position: absolute;
            left: 20px;
            bottom: 20px;
            font-size: 16px;
            color: #fff;
            text-shadow: 1px 1px 8px #444;
          }
        }

        .info {
          vertical-align: middle;
          text-align: left;
          padding: 10px;

          .avatar {
            display: inline-block;
            width: 50px;
            vertical-align: middle;
            font-size: 0;

            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
          }

          .nickname {
            display: inline-block;
            vertical-align: middle;
            line-height:  40px;
            font-size: 15px;
            margin-left: 10px;
          }

          .time {
            // display: inline-block;
            float: right;
            height: 40px;
            line-height: 40px;
            font-size: 13px;
            color: #a0a0a0;
          }
        }

        .text {
          padding: 10px;
          text-align: left;

          p {
            white-space: pre-wrap;
          }
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
