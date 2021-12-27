<template>
  <div class="divide-y divide-gray-100 dark:divide-gray-700">
    <div class="px-8 pb-5">
      <GameCard class="flex lg:hidden" :game="game" />
      <h2>{{ $t('g.summary') }}</h2>
      <p class="mt-3 dark:text-gray-300 text-gray-700" v-html="game.summary" />
    </div>
    <div class="px-8 pt-3">
      <div class="flex justify-between mb-3">
        <h2>{{ $t('g.ratings') }}</h2>
        <vs-button animation-type="vertical" @click="openComposer">
          <b>{{ $t('g.rate') }}</b>
          <template #animate>
            <i class="bx bxs-star"></i>
          </template>
        </vs-button>
      </div>
      <StarRate
        :disabled="false"
        :point="game.ratings.total_rate"
        :total="game.ratings.total_stars"
        :ratings="game.ratings"
      />
      <GameComments v-if="game" :game="game" />
    </div>
  </div>
</template>

<script>
import StarRate from '~/components/Rating/StarRate'
import GameComments from '~/components/Games/GameComments'
import GameCard from '~/components/Games/GameCard'
import { mapActions } from 'vuex'
export default {
  components: { StarRate, GameComments, GameCard },
  props: {
    game: {
      type: Object,
      default: null,
    },
  },
  methods: {
    ...mapActions({
      toggleCommentComposer: 'game/toggleCommentComposer',
    }),
    openComposer() {
      this.toggleCommentComposer(true)
    },
  },
}
</script>

<style></style>
