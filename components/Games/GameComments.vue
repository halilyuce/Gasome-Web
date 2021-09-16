<template>
  <div v-if="comments.data.length > 0">
    <div class="bg-purple-700 rounded-3xl my-4">
      <vs-card-group class="max-w-full">
        <vs-card v-for="comment in comments.data" :key="comment.id">
          <template #title>
            <StarRates
              :disabled="false"
              size="sm"
              :point="parseFloat(comment.star)"
            />
          </template>
          <template #img>
            <div class="h-12 w-full"></div>
          </template>
          <template #text>
            <p>
              {{ comment.comment }}
            </p>
          </template>
          <template #interactions>
            <n-link
              :to="`/u/${comment.user.username}`"
              class="flex items-center"
            >
              <vs-avatar size="28">
                <img
                  :src="`${smallAvatar + comment.user.avatar}.jpg`"
                  :alt="comment.user.username"
                />
              </vs-avatar>
              <div class="ml-2 flex flex-col">
                <h5>{{ comment.user.name }}</h5>
                <span class="text-xs text-gray-600">{{
                  '@' + comment.user.username
                }}</span>
              </div>
            </n-link>
          </template>
        </vs-card>
      </vs-card-group>
    </div>
  </div>
</template>

<script>
import StarRates from '~/components/Rating/StarRate'
export default {
  name: 'GameComments',
  components: { StarRates },
  props: {
    comments: {
      type: Object,
    },
  },
  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
    }
  },
}
</script>
<style scoped>
.vs-card__group .vs-card__group-cards .vs-card-content {
  min-width: 240px;
}
</style>
