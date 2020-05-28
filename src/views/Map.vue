<template>
  <div class="container">
    <div class="main">
      <!-- <baidu-map class="map" :center="'银川市'" :zoom="5" :scroll-wheel-zoom="true" @click="clickMapPoint" @rightclick="cancelNowPoint">
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="locationSuccess"></bm-geolocation>

        <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>

        <bm-marker v-for="(todo, index) in pointList" :key="index" :position="todo.point" @click="clickAlreadyPoint"></bm-marker>

        <bm-marker v-if="isPointNow" :position="nowPoint" :dragging="true"  animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
      </baidu-map> -->
      <div class="map" id="map-id" ref="mapMain"></div>
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
      map: null,
      markerLayer: null,
      flagPoint: null,
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
        },
        {
          point: {
            lat: 37.59184,
            lng: 100.887535
          }
        },
        {
          point: {
            lat: 33.59184,
            lng: 100.887535
          }
        }
      ],
      nowPoint: {},
      isPointNow: false
    }
  },

  mounted() {
    this.initMap();
  },

  methods: {
    randNum() {
      return Math.floor(Math.random() * 6 + 1);
    },
    initMap() {
//       lat: 33.368166978723806
// lng: 107.03834933695452
      const center = new TMap.LatLng(31.739047478946276, 104.13899911568569)
      //定义map变量，调用 TMap.Map() 构造函数创建地图
      this.map = new TMap.Map(this.$refs.mapMain, {
        center: center,
        zoom: 4,
        viewMode: '2D',
        mapStyleId: 'style1'
      });

      // this.map.on('click', e => this.clickMapPoint(e));
      this.map.on('click', e => {
        console.log(e);
        e.originalEvent.stopPropagation();
      });

      this.initPointLayer();
    },
    initPointLayer() {
      const mapPoints = this.pointList.map(item => {
        return {
          position: new TMap.LatLng(item.point.lat, item.point.lng),
          styleId: 'myStyle-' + this.randNum()
          // src: require('@/../public/img/green.png')
        }
      });
      console.log(mapPoints);

      this.markerLayer = new TMap.MultiMarker({
        map: this.map,
        //样式定义
        styles: {
            //创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
            'myStyle-1': new TMap.MarkerStyle({ 
                width: 18,  // 点标记样式宽度（像素）
                height: 18, // 点标记样式高度（像素）
                src: require('@/../public/img/green.png'),  //图片路径
                //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
                anchor: { x: 9, y: 9 }  
            }),
            'myStyle-2': new TMap.MarkerStyle({ 
                width: 18,  // 点标记样式宽度（像素）
                height: 18, // 点标记样式高度（像素）
                src: require('@/../public/img/blue.png'),  //图片路径
                //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
                anchor: { x: 9, y: 9 }  
            }),
            'myStyle-3': new TMap.MarkerStyle({ 
                width: 18,  // 点标记样式宽度（像素）
                height: 18, // 点标记样式高度（像素）
                src: require('@/../public/img/purple.png'),  //图片路径
                //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
                anchor: { x: 9, y: 9 }  
            }),
            'myStyle-4': new TMap.MarkerStyle({ 
                width: 18,  // 点标记样式宽度（像素）
                height: 18, // 点标记样式高度（像素）
                src: require('@/../public/img/deepblue.png'),  //图片路径
                //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
                anchor: { x: 9, y: 9 }  
            }),
            'myStyle-5': new TMap.MarkerStyle({ 
                width: 18,  // 点标记样式宽度（像素）
                height: 18, // 点标记样式高度（像素）
                src: require('@/../public/img/cherry.png'),  //图片路径
                //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
                anchor: { x: 9, y: 9 }  
            }),
            'myStyle-6': new TMap.MarkerStyle({ 
                width: 18,  // 点标记样式宽度（像素）
                height: 18, // 点标记样式高度（像素）
                src: require('@/../public/img/red.png'),  //图片路径
                //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
                anchor: { x: 9, y: 9 }  
            }),
        },
        //点标记数据数组
        geometries: mapPoints
      });

      this.markerLayer.on('click', e => {
        console.log(e, 'layer click');

        e.originalEvent.stopPropagation();
      })
    },
    // {lng: 116.404, lat: 39.915}
    locationSuccess(e) {
      console.log(e);
    },
    clickMapPoint(e) {
      console.log(e, 'map');
      e.originalEvent.stopPropagation();

      // console.log('center');
      // console.log(this.map.getCenter())

      // this.pointList.push({
      //   point: e.point
      // });
      // this.isPointNow = true;
      // this.nowPoint = e.point;

      if(!this.isPointNow) {
        const flagPoint = new TMap.LatLng(e.latLng.lat, e.latLng.lng);

        this.markerLayer.add([
          {
            id: 'flagPoint',
            position: flagPoint
          }
        ]);

        this.isPointNow = true;
      }
      else {
        const flagPoint = new TMap.LatLng(e.latLng.lat, e.latLng.lng);

        this.markerLayer.updateGeometries([
          {
            id: 'flagPoint',
            position: flagPoint
          }
        ]);
      }
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
      height: 750px;
    }
  }

  .side {
    width: 200px;
    background-color: red;
    margin-left: 10px;
  }
}
</style>