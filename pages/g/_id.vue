<template>
  <div>
    <div v-if="game" class="grid grid-cols-12 gap-4">
      <GameCard class="col-span-12 md:col-span-4 mt-8" :game="game" />
      <div
        class="bg-white dark:bg-black col-span-12 md:col-span-8 min-h-screen overflow-auto"
      >
        <!-- Breadcrumb -->

        <div
          class="flex items-center py-3 px-5 border-b border-gray-200 dark:border-gray-700"
        >
          <vs-button active @click="$router.back()" size="small" transparent>
            <i class="bx bxs-chevron-left text-xl"></i>
          </vs-button>
          <div class="flex flex-col ml-9">
            <h5>{{ game.name }}</h5>
            <span class="text-gray-400 text-sm mr-1">{{
              game.company ? game.company.name : ''
            }}</span>
          </div>
        </div>

        <!-- Tabs -->
        <ul
          class="grid grid-cols-4 border-b border-b border-gray-200 dark:border-gray-700 mb-5"
        >
          <li
            class="py-5 relative flex ransition duration-300 ease-in-out justify-center cursor-pointer hover-bg"
            :class="{
              'active-border': activeTab === tab.value,
            }"
            v-for="tab in tabs"
            :key="tab.value"
            @click="activeTab = tab.value"
          >
            <b>{{ tab.title }}</b>
          </li>
        </ul>
        <div v-if="activeTab === 'info'" class="px-8">
          <h2>Summary</h2>
          <p class="my-3" v-html="game.summary" />
          <h2>Ratings</h2>
          <StarRate
            :disabled="false"
            :point="parseFloat(game.ratings.total_rate)"
          />
          <GameComments v-if="comments" :comments="comments" />
        </div>
        <div v-if="activeTab === 'medias'" class="px-8">
          <medias-tab :game="game" />
        </div>
      </div>
    </div>

    <!-- <div class="col-span-12 lg:col-span-4">
          <div class="bg-white dark:bg-black p-6 rounded-lg flex flex-col">
            <div class="col-span-12 leading-8">
              <h2>İnfo</h2>
              <div v-if="game.company" class="grid grid-cols-12 gap-4">
                <div class="col-span-4">Company</div>
                <div class="col-span-8">{{ game.company.name }}</div>
              </div>
              <div
                v-if="game.release_date"
                class="grid grid-cols-12 gap-4 divide-y divide-gray-100 dark:divide-black dark:divide-opacity-30"
              >
                <div class="col-span-4">Release Date</div>
                <div class="col-span-8">
                  {{ $moment(game.release_date).format('ll') }}
                </div>
              </div>
              <div
                v-if="game.genres"
                class="grid grid-cols-12 gap-4 divide-y divide-gray-100 dark:divide-black dark:divide-opacity-30"
              >
                <div class="col-span-4">Genre</div>
                <div class="col-span-8">
                  <span v-for="(genre, index) in game.genres" :key="index">
                    {{ genre + (index !== game.genres.length - 1 ? ',' : '') }}
                  </span>
                </div>
              </div>
              <div
                v-if="game.platforms"
                class="grid grid-cols-12 gap-4 divide-y divide-gray-100 dark:divide-black dark:divide-opacity-30"
              >
                <div class="col-span-4">Platforms</div>
                <div class="col-span-8">
                  <span
                    v-for="(platform, index) in game.platforms"
                    :key="index"
                  >
                    {{
                      platform +
                      (index !== game.platforms.length - 1 ? ',' : '')
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-black p-6 rounded-lg flex flex-col mt-4">
            <h2>Ratings</h2>
            <StarRate
              :disabled="false"
              :point="parseFloat(game.ratings.total_rate)"
            />
            <GameComments v-if="comments" :comments="comments" />
          </div>
        </div> -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import GameCard from '~/components/Games/GameCard'
import StarRate from '~/components/Rating/StarRate'
import GameComments from '~/components/Games/GameComments'
import MediasTab from '~/components/Games/MediasTab.vue'

export default {
  name: 'gameDetail',
  layout: 'game',
  components: { GameCard, StarRate, GameComments, MediasTab },
  data() {
    return {
      commentPage: 1,
      activeTab: 'info',
      tabs: [
        {
          title: 'İnformation',
          value: 'info',
        },
        {
          title: 'Medias',
          value: 'medias',
        },
        {
          title: 'Swaps List',
          value: 'swaps',
        },
        {
          title: 'Wishes List',
          value: 'wishes',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
      game: (state) => state.game.game,
      comments: (state) => state.game.comments,
      loading: (state) => state.loading,
    }),
  },
  async mounted() {
    await this.getGameById(this.$route.params.id)
    await this.getGameComments(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getGameById: 'game/getGameById',
      getGameComments: 'game/getGameComments',
      clearAlert: 'alert/clear',
    }),
  },
}
</script>
<style lang="scss">
.active-border::before {
  content: '';
  transform: translateX(-50%);
  border-radius: 6px;
  position: absolute;
  background: #6e00ff;
  bottom: -2px;
  height: 4px;
  width: 24px;
  left: 50%;
}
.content-full {
  height: calc(100vh - 2.5rem);
}
</style>
