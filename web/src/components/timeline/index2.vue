<script lang="ts">
import { ref, computed, watch } from 'vue';
export interface Item {
  desc: string; // 文字描述 string | slot
  color?: 'blue' | 'green' | 'red' | 'gray' | string; // 圆圈颜色，默认值 blue
}
export interface Props {
  items?: Item[]; // 时间轴内容数组
  width?: number | string; // 时间轴区域总宽度，单位 px
  lineStyle?: 'solid' | 'dashed' | 'dotted'; // 时间线样式
  mode?: 'left' | 'center' | 'right'; // 通过设置 mode 可以改变时间轴和内容的相对位置
  position?: 'left' | 'right'; // 当 mode 为 center 时，内容交替展现，内容从左边（left）开始或者右边（right）开始展现
}
export default {
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
  mounted() {
    this.getDotsHeight();
    this.adjustDescClasses();
  },
  watch: {
    items: {
      handler: 'getDotsHeight',
      deep: true
    },
    mode: 'adjustDescClasses',
    position: 'adjustDescClasses'
  },
  methods: {
    getDotsHeight() {
      this.$nextTick(() => {
        this.dotsHeight = this.descRef.map((desc, n) => {
          return window
            .getComputedStyle(desc.firstElementChild || desc)
            .getPropertyValue('line-height');
        });
      });
    },
    adjustDescClasses() {
      if (this.mode === 'center') {
        this.$nextTick(() => {
          this.descRef.forEach((desc, n) => {
            desc.classList.remove(
              'desc-alternate-left',
              'desc-alternate-right'
            );
            if ((n + 1) % 2) {
              // odd
              if (this.position === 'left') {
                desc.classList.add('desc-alternate-left');
              } else {
                desc.classList.add('desc-alternate-right');
              }
            } else {
              // even
              if (this.position === 'left') {
                desc.classList.add('desc-alternate-right');
              } else {
                desc.classList.add('desc-alternate-left');
              }
            }
          });
        });
      }
    }
  }
};
</script>
<template>
  <div class="m-timeline" :style="`width: ${totalWidth}`">
    <div
      class="timeline-item"
      :class="{ 'item-last': index === items.length - 1 }"
      v-for="(item, index) in items"
      :key="index"
      ref="descRef"
    >
      <span
        class="timeline-tail"
        :class="`tail-${mode}`"
        :style="`border-left-style: ${lineStyle}`"
      ></span>
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
      <div class="timeline-desc" :class="`desc-${mode}`">
        <slot name="desc" :item="item" :index="index">{{
          item.desc || '--'
        }}</slot>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.m-timeline {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  line-height: 1.5714285714285714;
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
    .tail-left {
      left: 5px;
    }
    .tail-center {
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    .tail-right {
      right: 5px;
    }
    .timeline-dot {
      position: absolute;
      display: flex;
      align-items: center;
      .dot-item {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-width: 2px;
        border-style: solid;
        border-radius: 50%;
        background: #fff;
      }
    }
    .dot-left {
      left: 6px;
      transform: translateX(-50%);
    }
    .dot-center {
      left: 50%;
      transform: translateX(-50%);
    }
    .dot-right {
      right: 6px;
      transform: translateX(50%);
    }
    .timeline-desc {
      font-size: 14px;
      line-height: 1.5714285714285714;
      word-break: break-all;
    }
    .desc-left {
      margin-left: 25px;
    }
    .desc-center {
      width: calc(50% - 12px);
    }
    .desc-alternate-left {
      text-align: end;
    }
    .desc-alternate-right {
      margin-left: calc(50% + 12px);
    }
    .desc-right {
      margin-right: 25px;
      text-align: end;
    }
  }
  .item-last {
    .timeline-tail {
      display: none;
    }
  }
}
</style>
