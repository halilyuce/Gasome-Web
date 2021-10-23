<template>
  <div class="divide-y divide-gray-100 dark:divide-gray-700">
    <div class="px-8 pb-5">
      <GameCard class="flex lg:hidden" :game="game" />
      <h2>{{ $t('g.summary') }}</h2>
      <p class="mt-3" v-html="game.summary" />
    </div>
    <div class="px-8 pt-3">
      <div class="flex justify-between mb-3">
        <h2>{{ $t('g.ratings') }}</h2>
        <vs-button animation-type="vertical">
          <b>{{ $t('g.rate') }}</b>
          <template #animate>
            <i class="bx bxs-star"></i>
          </template>
        </vs-button>
      </div>
      <StarRate
        :disabled="false"
        :point="parseFloat(game.ratings.total_rate)"
      />
      <GameComments v-if="comments" :comments="comments" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import StarRate from '~/components/Rating/StarRate'
import GameComments from '~/components/Games/GameComments'
import GameCard from '~/components/Games/GameCard'
export default {
  props: {
    game: {
      type: Object,
      default: null,
    },
  },
  components: { StarRate, GameComments, GameCard },
  computed: {
    ...mapState({
      comments: (state) => state.game.comments,
    }),
  },
}
</script>

<style></style>
