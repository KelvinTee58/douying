<template>
  <div>
    <!-- <div class="g-bg">
      <div class="g-polygon g-polygon-1"></div>
      <div class="g-polygon g-polygon-2"></div>
      <div class="g-polygon g-polygon-3"></div>
    </div> -->
    <router-view></router-view>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  data() {
    return {
      active: 0,
      navTitle: "标题",
      meta: {},
    };
  },
  mounted() {
    let meta = _.get(this.$route, "meta", {});
    if (!_.isNil(meta.title)) {
      this.navTitle = meta.title;
    }
    this.meta = meta;
  },
  methods: {
    onClickLeft() {
      let { meta } = this;
      if (!_.isNil(meta.back)) {
        this.$router.push(meta.back);
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.g-bg {
  position: absolute;
  z-index: -99;
  width: 100vw;
  height: 100vh;
  .g-polygon {
    z-index: -100;
    position: absolute;
    opacity: 0.5;
    width: 100%;
    height: 100%;
    // backdrop-filter: blur(150px);
  }
  .g-polygon-1 {
    // 定位代码，容器高宽随意
    background: #ffee55;
    clip-path: polygon(0 10%, 30% 0, 100% 40%, 70% 100%, 20% 90%);
  }

  .g-polygon-2 {
    // 定位代码，容器高宽随意
    background: #e950d1;
    clip-path: polygon(10% 0, 100% 70%, 100% 100%, 20% 90%);
  }

  .g-polygon-3 {
    // 定位代码，容器高宽随意
    background: rgb(87, 80, 233);
    clip-path: polygon(80% 0, 100% 70%, 100% 100%, 20% 90%);
  }

  &::before {
    content: "";
    position: fixed;

    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    backdrop-filter: blur(150px);
    z-index: 1;

    animation: colorChange 10s infinite 6s linear alternate;
  }
}

@keyframes colorChange {
  100% {
    left: 0;
    top: 0;
    filter: hue-rotate(360deg);
  }
}
</style>
