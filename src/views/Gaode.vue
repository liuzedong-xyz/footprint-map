<template>
  <div class="main">
    <div class="map" id="map-id" ref="mapMain"></div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      map: null,
      markerLayer: null,
      flagPoint: null,
      pointList: [],
      nowPoint: {},
      isPointNow: false,
      colorList: [
        {
          color: '#f00'
        },
        {
          color: '#0f0'
        },
        {
          color: '#00f'
        }
      ]
    }
  },

  mounted() {
    this.initMap();
  },

  methods: {
    getListInfo() {
      console.log('map-complete');
      axios.get('/map_api/MapPc/getPointsList')
        .then(data => {
          // console.log(data);
          if(data.status == 200 && data.data.code == 0) {
            // this.list = data.data.data;
            this.initPointLayer(data.data.data);
          }
        })
    },
    randNum() {
      return Math.floor(Math.random() * 6 + 1);
    },
    initMap() {
      const center = [104.635953, 31.916997];
      this.map = new AMap.Map('map-id', {
        center: center,
        zoom: 4.02,
        viewMode: '2D'
      });

      this.map.on('click', e => this.mapClick(e));
      this.map.on('rightclick', e => this.rightMapClick(e));

      // this.initPointLayer();
      this.map.on('complete', e => this.getListInfo(e));
    },
    initPointLayer(list) {
      // const mapPoints = this.pointList.map(item => {
      //   const todoPoint = new AMap.Marker({
      //     position: [item.point.lng, item.point.lat],
      //     extData: {
      //       id: item.id
      //     }
      //   });

      //   todoPoint.on('click', e => {
      //     this.clickMapPoint(e, todoPoint.getExtData());
      //   })

      //   return todoPoint;
      // });

      // this.map.add(mapPoints);

      list.forEach(item => {
        const todoPoint = new AMap.CircleMarker({
          center: [item.point.lng, item.point.lat],
          radius: 10,//3D视图下，CircleMarker半径不要超过64px
          strokeColor: 'white',
          strokeWeight: 2,
          strokeOpacity: 0.5,
          fillColor: this.getRandColor().color,
          fillOpacity: 0.5,
          zIndex: 10,
          cursor: 'pointer',
          clickable: true,
          extData: {
            id: item.id,
            storyid: item.storyid
          }
        })

        todoPoint.on('click', e => {
          this.clickMapPoint(e, todoPoint.getExtData());
        })

        todoPoint.setMap(this.map);
      })
    },
    mapClick(e) {
      console.log(e, 'map-click');

      if(this.isPointNow) {
        this.map.remove(this.nowPoint);
      }

      this.nowPoint = new AMap.Marker({
        position: [e.lnglat.lng, e.lnglat.lat],
        extData: {
          id: 'flag-todo-id'
        }
      });

      this.map.add(this.nowPoint);
      this.isPointNow = true
    },
    rightMapClick(e) {
      console.log(e, 'map-right-click')
      if(this.isPointNow) {
        this.map.remove(this.nowPoint);
        this.isPointNow = false;
        this.map.remove(this.nowPoint);
      }
    },
    clickMapPoint(e, info) {
      console.log(e, 'map');
      console.log(info, 'info');

      this.$emit('clickPoint', {e, info});
    },
    addToList() {

    },
    getRandColor() {
      return this.colorList[Math.floor(Math.random() * this.colorList.length)]
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  // padding: 10px;
  flex-grow: 1;
  overflow: hidden;

  .map {
    height: 100%;
  }
}
</style>