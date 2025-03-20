<template>
  <div class="timeline">
    <div v-for="(event, index) in events" :key="index" class="timeline-item">
      <div class="timeline-node"></div>
      <div class="timeline-content" @click="toggle(index)">
        <div class="time">{{ event.time }}</div>
        <div class="card">
          <div class="title">{{ event.title }}</div>
          <div class="platform" v-if="event.platform">
            <span :class="platformClass(event.platform)">{{
              event.platform
            }}</span>
          </div>
          <div class="details" v-if="expandedIndex === index">
            <p>{{ event.details }}</p>
            <div class="participants">
              <!-- <img
                v-for="(user, i) in event.participants"
                :key="i"
                :src="user.avatar"
                :alt="user.name"
                class="avatar"
              /> -->

              <Avatar
                class="avatar"
                v-for="(user, i) in event.participants"
                :key="i"
                size="30"
                :username="user.name"
                :src="user.avatar"
                :inline="true"
              >
              </Avatar>
              <span v-if="event.participants.length > 4" class="more"
                >+{{ event.participants.length - 4 }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from 'vue-avatar';
export default {
  components: {
    Avatar
  },
  name: 'TimelineComponent',
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      expandedIndex: null
    };
  },
  methods: {
    toggle(index) {
      this.expandedIndex = this.expandedIndex === index ? null : index;
    },
    platformClass(platform) {
      return {
        skype: platform.includes('Skype'),
        hangouts: platform.includes('Hangouts')
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.timeline {
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
  padding-left: 1rem;
  border-left: 0.2rem solid #cfd8dc;

  .timeline-item {
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 2rem;

    .timeline-node {
      width: 0.6rem;
      height: 0.6rem;
      background: #42a5f5;
      border-radius: 50%;
      position: absolute;
      left: -1.4rem;
    }

    .timeline-content {
      display: flex;
      flex-direction: column;
      cursor: pointer;

      .time {
        font-weight: bold;
        color: #555;
        margin-bottom: 0.2rem;
        font-size: 1rem;
      }

      .card {
        background: #fff;
        border-radius: 0.2rem;
        padding: 0.4rem 0.8rem;
        box-shadow: 0 0.08rem 0.24rem rgba(0, 0, 0, 0.1);
        min-width: 6.4rem;

        .title {
          font-size: 1.2rem;
          font-weight: bold;
        }

        .platform {
          margin-top: 0.2rem;
          font-size: 0.8rem;
          // color: #1976d2;
        }

        .details {
          font-size: 0.8rem;
          margin-top: 0.4rem;
          .participants {
            display: flex;
            align-items: center;
            margin-top: 0.4rem;

            .avatar {
              vertical-align: middle;
              width: 1.6rem;
              height: 1.6rem;
              border-radius: 50%;
              margin-right: 0.4rem;
            }

            .more {
              font-size: 1rem;
              color: #666;
            }
          }
        }
      }
    }
  }
}
</style>
