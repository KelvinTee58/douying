<script setup lang="ts">
import Timeline from './index.vue';
import { ref } from 'vue';

const timelineItems = ref([
  {
    title: '任务一', // 新增 title 字段
    desc: 'Create a services site 2023-05-24',
    color: 'green'
  },
  {
    title: '任务二', // 新增 title 字段
    desc: 'Solve initial network problems 1 Solve initial network problems 2 2023-05-24',
    color: 'red'
  },
  {
    title: '任务三', // 新增 title 字段
    desc: 'Technical testing 2023-05-24',
    color: 'blue'
  },
  {
    title: '任务四', // 新增 title 字段
    desc: 'Network problems being solved 2023-05-24'
  },
  {
    title: '任务五', // 新增 title 字段
    desc: 'Network problems being solved 2',
    color: 'gray'
  }
]);
</script>

<template>
  <div>
    <h1>{{ $route.name }} {{ $route.meta.title }}</h1>
    <h2 class="mt30 mb10">基本使用</h2>
    <Timeline :items="timelineItems" />

    <h2 class="mb10">自定义样式</h2>
    <Timeline :items="timelineItems">
      <template #dot="{ index }">
        <span class="big-dot" v-if="index === 2"></span>
      </template>
      <template #desc="{ index }">
        <p class="desc" v-if="index === 2">Create a services site</p>
      </template>
      <template #title="{ index }">
        <h3 class="title" v-if="index === 2">Custom Title for Task Three</h3>
      </template>
    </Timeline>

    <h2 class="mb10">使用虚线</h2>
    <Timeline :items="timelineItems" line-style="dashed" />

    <h2 class="mb10">右侧时间轴点</h2>
    <Timeline :items="timelineItems" mode="right" :width="540" />

    <h2 class="mb10">中间时间轴点</h2>
    <h3 class="mb10">内容从左边开始交替展现</h3>
    <Timeline :items="timelineItems" mode="center" :width="540">
      <template #dot="{ index }">
        <span class="big-dot" v-if="index === 2"></span>
      </template>
    </Timeline>
    <h3 class="mb10">内容从右边开始交替展现</h3>
    <Timeline
      :items="timelineItems"
      mode="center"
      position="right"
      :width="640"
    >
      <template #dot="{ index }">
        <span class="big-dot" v-if="index === 2"></span>
      </template>
    </Timeline>
  </div>
</template>

<style lang="less" scoped>
.big-dot {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 4px solid #1677ff;
  border-radius: 50%;
  background: #fff;
}

.desc {
  font-size: 16px;
  font-weight: 500;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #1677ff;
}
</style>
