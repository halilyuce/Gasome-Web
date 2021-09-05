<template>
  <div v-if="comments.data.length > 0">
    <h2>Comments</h2>
    <vs-card-group class="max-w-full">
      <vs-card v-for="comment in comments.data">
        <template #title>
          <StarRates :disabled="false" size="sm" :point="parseFloat(comment.star)" />
        </template>
        <template #img>
          <div class="h-14 w-full"></div>
        </template>
        <template #text>
          <p>
            {{ comment.comment }}
          </p>
        </template>
        <template #interactions>
          <n-link :to="`/u/${comment.user.username}`" class="flex items-center">
            <vs-avatar>
              <img :src="`${smallAvatar + comment.user.avatar}.jpg`" :alt="comment.user.username">
            </vs-avatar>
            <h3 class="ml-2">{{ comment.user.username }}</h3>
          </n-link>
        </template>
      </vs-card>
    </vs-card-group>
  </div>
</template>

<script>
import StarRates from "~/components/Rating/StarRate";
export default {
  name: "GameComments",
  components: { StarRates },
  props: {
    comments: {
      type: Object
    }
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
