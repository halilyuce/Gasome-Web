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
      <TrendGames
        v-if="trends"
        v-show="!search"
        :swap-data="trends.gameList[0]"
        list-type="card"
        class="col-span-12"
      />
      <TrendUsers
        v-if="trends"
        v-show="!search"
        :user-data="trends.userList[0]"
        class="col-span-12 md:col-span-6 lg:col-span-12"
      />
      <TrendGames
        v-if="trends"
        v-show="!search"
        :swap-data="trends.gameList[1]"
        class="col-span-12"
      />
      <MostSpoken
        v-if="trends"
        v-show="!search"
        class="col-span-12 md:col-span-6 lg:hidden"
      />
    </div>
  </div>
</template>

<script>
import TrendGames from '@/components/Discover/TrendGames'
import TrendUsers from '@/components/Discover/TrendUsers'
import MostSpoken from '@/components/Discover/MostSpoken'
import SearchBox from '@/components/Discover/SearchBox'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Index',
  components: { TrendGames, TrendUsers, MostSpoken, SearchBox },
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
