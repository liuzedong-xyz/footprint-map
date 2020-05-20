<template>
  <div class="container">
    <div class="main">
      <baidu-map class="map" :center="'银川市'" :zoom="5" :scroll-wheel-zoom="true" @click="clickMapPoint" @rightclick="cancelNowPoint">
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="locationSuccess"></bm-geolocation>

        <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>

        <bm-marker v-for="(todo, index) in pointList" :key="index" :position="todo.point" @click="clickAlreadyPoint"></bm-marker>

        <bm-marker v-if="isPointNow" :position="nowPoint" :dragging="true"  animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
      </baidu-map>
    </div>
    <div class="side">
      <button @click="addToList"></button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pointList: [
        {
          point: {
            lat: 37.871194,
            lng: 112.619483
          }
        },
        {
          point: {
            lat: 38.425669,
            lng: 112.754301
          }
        },
        {
          point: {
            lat: 45.782159,
            lng: 126.689643
          }
        },
        {
          point: {
            lat: 48.672181,
            lng: 126.207253
          }
        },
        {
          point: {
            lat: 36.59184,
            lng: 101.887535
          }
        }
      ],
      nowPoint: {},
      isPointNow: false
    }
  },

  methods: {
    // {lng: 116.404, lat: 39.915}
    locationSuccess(e) {
      console.log(e);
    },
    clickMapPoint(e) {
      console.log(e);

      // this.pointList.push({
      //   point: e.point
      // });
      this.isPointNow = true;
      this.nowPoint = e.point;
    },
    cancelNowPoint() {
      this.isPointNow = false;
      this.nowPoint = {};
    },
    addToList() {
      if(this.nowPoint) {
        this.pointList.push({
          point: this.nowPoint
        });

        this.nowPoint = {};
        this.isPointNow = false;
      }
    },
    clickAlreadyPoint(e) {
      console.log(e);
      
      e.domEvent.stopPropagation()

      // e.stop
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  // height: 300px;
}

.container {
  max-width: 1000px;
  margin: 20px auto 0;

  display: flex;
  flex-direction: row;
  justify-content: center;

  .main {
    padding: 10px;
    flex-grow: 1;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.15);
    border-radius: 5px;

    .map {
      height: 600px;
    }
  }

  .side {
    width: 200px;
    background-color: red;
    margin-left: 10px;
  }
}
</style>