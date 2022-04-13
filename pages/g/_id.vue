<template>
  <div
    ref="game"
    class="
      relative
      bg-white
      dark:bg-black
      overflow-y-auto
      disable-scrollbars
      h-screen
    "
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import MediasTab from '~/components/Games/MediasTab.vue'
import GameInfo from '~/components/Games/GameInfo.vue'
export default {
  name: 'GameDetail',
  components: { MediasTab, GameInfo },
  layout: 'game',
  computed: {
    ...mapState({
      alert: (state) => state.alert,
      game: (state) => state.game.game,
      loading: (state) => state.game.loading,
      active: (state) => state.game.activeTab,
    }),
    activeTab: {
      get() {
        return this.active
      },
      set(val) {
        this.setTab(val)
      },
    },
  },
  data() {
    return {
      gameLoading: null,
      commentPage: 1,
      tabs: [
        {
          title: this.$t('g.information'),
          value: 'info',
        },
        {
          title: this.$t('g.medias'),
          value: 'medias',
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
    if (this.game) {
      if (this.$route.params.id != this.game.id) {
        await this.resetState()
        await this.getGameById(this.$route.params.id)
      }
    } else {
      await this.getGameById(this.$route.params.id)
    }
  },
  methods: {
    ...mapActions({
      resetState: 'game/resetState',
      getGameById: 'game/getGameById',
      setTab: 'game/setTab',
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
