<template>
  <div class="py-5 px-4 lg:px-0">
    <div v-if="trends" class="grid grid-cols-12 gap-4">
      <SearchBox
        :search-data="search"
        :loading="searchLoading"
        class="col-span-12"
        @triggerSearch="searchKey"
      />
      <TrendGames
        v-show="!search"
        :swap-data="trends.gameList[0]"
        list-type="card"
        class="col-span-12"
      />
      <TrendGames
        v-show="!search"
        :swap-data="trends.gameList[1]"
        class="col-span-12"
      />
      <TrendUsers
        v-show="!search"
        :user-data="trends.userList[0]"
        class="col-span-12 md:col-span-6 lg:col-span-12"
      />
      <MostSpoken
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
      search: (state) => state.search.search,
      searchLoading: (state) => state.search.searchLoading,
    }),
  },
  async mounted() {
    await this.getTrends()
  },
  methods: {
    ...mapActions({
      getTrends: 'discover/getTrends',
      getSearchResults: 'search/getSearchResults',
    }),
    async searchKey(key) {
      await this.getSearchResults({ search: key })
    },
  },
}
</script>

<style scoped></style>
