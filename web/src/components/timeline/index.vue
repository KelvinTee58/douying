<template>
  <div class="m-timeline" :style="`width: ${totalWidth};`">
    <div
      class="timeline-item"
      :class="{ 'item-last': index === items.length - 1 }"
      v-for="(item, index) in items"
      :key="index"
    >
      <!-- 时间线尾部 -->
      <span
        class="timeline-tail"
        :class="`tail-${mode}`"
        :style="`border-left-style: ${lineStyle};`"
      ></span>

      <!-- 时间点 -->
      <div
        class="timeline-dot"
        :class="`dot-${mode}`"
        :style="`height: ${dotsHeight[index]}`"
      >
        <slot name="dot" :item="item" :index="index">
          <span
            class="dot-item"
            v-if="item.color === 'red'"
            :style="{ borderColor: ColorStyle.red }"
          ></span>
          <span
            class="dot-item"
            v-else-if="item.color === 'gray'"
            :style="{ borderColor: ColorStyle.gray }"
          ></span>
          <span
            class="dot-item"
            v-else-if="item.color === 'green'"
            :style="{ borderColor: ColorStyle.green }"
          ></span>
          <span
            class="dot-item"
            v-else-if="item.color === 'blue'"
            :style="{ borderColor: ColorStyle.blue }"
          ></span>
          <span
            class="dot-item"
            v-else
            :style="{ borderColor: item.color || ColorStyle.blue }"
          ></span>
        </slot>
      </div>

      <!-- 显示 title -->
      <div class="timeline-title" v-if="item.title">
        <slot name="title" :item="item" :index="index">{{ item.title }}</slot>
        <slot name="time" :item="item" :index="index">{{ item.time }}</slot>
      </div>

      <!-- 显示 desc -->
      <div ref="descRef" :class="`timeline-desc desc-${mode}`">
        <slot name="desc" :item="item" :index="index">{{
          item.desc || '--'
        }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'components-timeline-index',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    width: {
      type: [Number, String],
      default: '100%'
    },
    lineStyle: {
      type: String,
      default: 'solid'
    },
    mode: {
      type: String,
      default: 'left'
    },
    position: {
      type: String,
      default: 'left'
    }
  },
  data() {
    return {
      ColorStyle: {
        blue: '#1677ff',
        green: '#52c41a',
        red: '#ff4d4f',
        gray: '#00000040'
      },
      descRef: [],
      dotsHeight: []
    };
  },
  computed: {
    totalWidth() {
      return typeof this.width === 'number' ? `${this.width}px` : this.width;
    },
    len() {
      return this.items.length;
    }
  },
  watch: {
    mode: {
      handler() {
        this.updateAlternateClasses();
      },
      immediate: true
    },
    position: {
      handler() {
        this.updateAlternateClasses();
      },
      immediate: true
    }
  },
  methods: {
    getDotsHeight() {
      this.dotsHeight = this.descRef.map((desc) => {
        return getComputedStyle(
          desc.firstElementChild || desc,
          null
        ).getPropertyValue('line-height');
      });
    },
    updateAlternateClasses() {
      if (this.mode === 'center') {
        this.descRef.forEach((desc, index) => {
          desc.classList.remove('desc-alternate-left', 'desc-alternate-right');
          if ((index + 1) % 2 === 1) {
            desc.classList.add(
              this.position === 'left'
                ? 'desc-alternate-left'
                : 'desc-alternate-right'
            );
          } else {
            desc.classList.add(
              this.position === 'left'
                ? 'desc-alternate-right'
                : 'desc-alternate-left'
            );
          }
        });
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.descRef = this.$refs.descRef || [];
      this.getDotsHeight();
      this.updateAlternateClasses();
    });
  }
};
</script>

<style lang="less" scoped>
.m-timeline {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5;

  .timeline-item {
    position: relative;
    padding-bottom: 30px;

    .timeline-tail {
      position: absolute;
      top: 12px;
      width: 0;
      height: 100%;
      border-left-width: 2px;
      border-left-color: #e8e8e8;
    }

    .timeline-dot {
      position: absolute;
      display: flex;
      align-items: center;
    }

    /* 新增 title 样式 */
    .timeline-title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 8px; // 给 title 和 desc 留间隙
    }

    .timeline-desc {
      font-size: 14px;
      line-height: 1.5;
      word-break: break-all;
    }

    .desc-left {
      margin-left: 25px;
    }
    .desc-center {
      width: calc(50% - 12px);
    }
    .desc-right {
      margin-right: 25px;
      text-align: end;
    }
  }
}
</style>
