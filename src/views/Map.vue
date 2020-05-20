<template>
  <div class="container">
    <div class="main">
      <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15" :scroll-wheel-zoom="true" @click="clickMapPoint">
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="locationSuccess"></bm-geolocation>

        <bm-marker v-for="(todo, index) in pointList" :key="index" :position="todo.point" :dragging="true"></bm-marker>

        <bm-marker v-if="isPointNow" :position="nowPoint" :dragging="true"  animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
      </baidu-map>
    </div>
    <div class="side">

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pointList: [],
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