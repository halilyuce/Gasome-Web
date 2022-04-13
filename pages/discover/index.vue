<template>
  <div class="py-5 px-4 lg:px-0 h-screen overflow-y-auto disable-scrollbars">
    <div class="grid grid-cols-12 gap-4">
      <SearchBox
        :search-data="search"
        class="col-span-12"
        @triggerSearch="searchKey"
        @empty="empty"
      />
      <div
        v-if="!trends"
        ref="first"
        class="
          relative
          bg-white
          dark:bg-black
          h-72
          col-span-12
          w-full
          rounded-xl
        "
      ></div>
      <div
        v-if="!trends"
        ref="second"
        class="
          relative
          bg-white
          dark:bg-black
          h-36
          col-span-12
          w-full
          rounded-xl
        "
      ></div>
      <div
        v-if="!trends"
        ref="third"
        class="
          relative
          bg-white
          dark:bg-black
          h-96
          col-span-12
          w-full
          rounded-xl
        "
      ></div>
      <div v-for="(item, index) in trends" :key="index" class="col-span-12">
        <PopularGames
          v-if="item.type === 'game_list_large'"
          :game-data="item"
          list-type="large"
        />
        <PopularUsers v-if="item.type === 'user_list'" :user-data="item" />
        <MostSpoken
          v-if="item.type === 'trend_list'"
          :user-data="item"
          class="lg:hidden"
        />
        <PopularStreams
          v-if="item.type === 'stream_list'"
          :streams-data="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PopularGames from '@/components/Discover/PopularGames'
import PopularUsers from '@/components/Discover/PopularUsers'
import MostSpoken from '@/components/Discover/MostSpoken'
import SearchBox from '@/components/Discover/SearchBox'
import PopularStreams from '@/components/Discover/PopularStreams'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Index',
  components: {
    PopularGames,
    PopularUsers,
    MostSpoken,
    SearchBox,
    PopularStreams,
  },
  layout: 'discover',
  computed: {
    ...mapState({
      trends: (state) => state.discover.trends,
      searchState: (state) => state.search.search,
      searchLoading: (state) => state.search.searchLoading,
      loading: (state) => state.discover.loading,
    }),
    search: {
      get() {
        return this.searchState
      },
      set(val) {
        this.setSearch(val)
      },
    },
  },
  watch: {
    loading(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (!newVal) {
          this.firstLoad.close()
          this.secondLoad.close()
          this.thirdLoad.close()
        } else {
          this.firstLoad = this.$vs.loading({
            target: this.$refs.first,
          })
          this.secondLoad = this.$vs.loading({
            target: this.$refs.second,
          })
          this.thirdLoad = this.$vs.loading({
            target: this.$refs.third,
          })
        }
      }
    },
  },
  async mounted() {
    if (!this.trends) {
      this.getTrends()
    }
  },
  async asyncData({ route, store }) {
    if (route.name === 'discover') {
      await store.dispatch('setTab', 'discover')
    }
  },
  data() {
    return {
      firstLoad: null,
      secondLoad: null,
      thirdLoad: null,
    }
  },
  methods: {
    ...mapActions({
      getTrends: 'discover/getTrends',
      getSearchResults: 'search/getSearchResults',
      setSearch: 'search/setSearch',
    }),
    async searchKey(key) {
      await this.getSearchResults({ search: key })
    },
    async empty(val) {
      this.search = val
    },
  },
}
</script>

<style scoped></style>
