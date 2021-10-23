<template>
  <div
    class="bg-white dark:bg-black overflow-y-auto disable-scrollbars h-screen"
  >
    <div v-if="game">
      <!-- Breadcrumb -->

      <div
        class="
          flex
          items-center
          py-3
          px-5
          border-b border-gray-200
          dark:border-gray-700
        "
      >
        <vs-button active size="small" transparent @click="$router.back()">
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
        class="
          grid grid-cols-4
          border-b border-b border-gray-200
          dark:border-gray-700
          mb-5
        "
      >
        <li
          v-for="tab in tabs"
          :key="tab.value"
          class="
            py-5
            relative
            flex
            ransition
            duration-300
            ease-in-out
            justify-center
            cursor-pointer
            hover-bg
          "
          :class="{
            'active-border': activeTab === tab.value,
          }"
          @click="activeTab = tab.value"
        >
          <b>{{ tab.title }}</b>
        </li>
      </ul>

      <!-- Content -->
      <div v-if="activeTab === 'info'">
        <GameInfo :game="game" />
      </div>
      <div v-if="activeTab === 'medias'" class="px-8">
        <MediasTab :game="game" />
      </div>
      <div v-if="activeTab === 'swaps'">
        <GameSwapList :id="game.id" />
      </div>
      <div v-if="activeTab === 'wishes'">
        <GameWishList :id="game.id" />
      </div>
    </div>
    <div ref="game" class="relative h-screen" v-else></div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import MediasTab from '~/components/Games/MediasTab.vue'
import GameInfo from '~/components/Games/GameInfo.vue'
import GameSwapList from '~/components/Games/GameSwapList.vue'
import GameWishList from '~/components/Games/GameWishList.vue'
export default {
  name: 'GameDetail',
  components: { MediasTab, GameInfo, GameSwapList, GameWishList },
  layout: 'game',
  computed: {
    ...mapState({
      alert: (state) => state.alert,
      game: (state) => state.game.game,
      loading: (state) => state.game.loading,
    }),
  },
  data() {
    return {
      gameLoading: null,
      commentPage: 1,
      activeTab: 'info',
      tabs: [
        {
          title: this.$t('g.information'),
          value: 'info',
        },
        {
          title: this.$t('g.medias'),
          value: 'medias',
        },
        {
          title: this.$t('g.swaps'),
          value: 'swaps',
        },
        {
          title: this.$t('g.wishes'),
          value: 'wishes',
        },
      ],
    }
  },
  watch: {
    loading(newVal, oldVal) {
      if (newVal != oldVal) {
        if (!newVal) {
          this.gameLoading.close()
        } else {
          this.gameLoading = this.$vs.loading({
            target: this.$refs.game,
          })
        }
      }
    },
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
