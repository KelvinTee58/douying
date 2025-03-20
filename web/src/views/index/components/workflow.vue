<template>
  <div class="workflow">
    <div class="header">
      <h2 class="title">操作板</h2>
      <van-popover
        v-model="showMorePopover"
        trigger="click"
        :actions="actions"
        placement="bottom-end"
        @select="openMenu"
      >
        <template #reference>
          <van-icon name="ellipsis" />
        </template>
      </van-popover>
    </div>
    <div class="timelineWarpper">
      <TimelineComponent :events="events" />
    </div>
  </div>
</template>

<script>
import TimelineComponent from '@/components/timeline';
import { Icon, Popover } from 'vant';
export default {
  name: 'view-index-components-workflow',
  components: {
    'van-icon': Icon,
    [Popover.name]: Popover,
    TimelineComponent
  },
  data() {
    return {
      showMorePopover: false,
      actions: [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }],
      events: [
        {
          time: '2023.10.20 8:00',
          title: 'File preparation',
          details: 'Organizing and preparing necessary files for the project.',
          participants: [
            { name: 'Alice', avatar: 'https://i.pravatar.cc/32?img=1' },
            { name: 'Bob', avatar: 'https://i.pravatar.cc/32?img=2' }
          ]
        },
        {
          time: '10:00',
          title: 'Webshop mockups discussions',
          platform: 'Skype for Business',
          details: 'Reviewing design mockups for the webshop project.',
          participants: [
            { name: 'Charlie', avatar: 'https://i.pravatar.cc/32?img=3' },
            { name: 'David', avatar: 'https://i.pravatar.cc/32?img=4' },
            { name: 'Eve', avatar: 'https://i.pravatar.cc/32?img=5' }
          ]
        },
        {
          time: '11:15',
          title: 'Daily Scrum meeting',
          platform: 'Hangouts',
          details: 'Team stand-up meeting to discuss progress and blockers.',
          participants: [
            { name: '郑凯杰' },
            { name: '郑凯杰' },
            { name: 'Hank', avatar: 'https://i.pravatar.cc/32?img=8' },
            { name: 'Ivy', avatar: 'https://i.pravatar.cc/32?img=9' },
            { name: 'Jack', avatar: 'https://i.pravatar.cc/32?img=10' }
          ]
        }
      ]
    };
  },
  methods: {
    openMenu() {
      this.$emit('openMenu');
    }
  }
};
</script>

<style lang="scss" scoped>
.workflow {
  height: 100%;
  min-height: 100vh;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 1rem 1rem;
    // background: #fff;
    .title {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
  .timelineWarpper {
    padding: 20px;
  }
}
</style>
