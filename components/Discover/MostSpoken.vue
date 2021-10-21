<template>
  <div
    ref="trends"
    class="relative bg-white dark:bg-black py-3 px-5 rounded-xl mt-4"
    :class="{ 'h-48': trendsLoading }"
  >
    <h3 v-if="!trendsLoading">{{ $t('rightSideBar.mostSpoken') }}</h3>
    <ul
      v-if="trends && trends.length > 0"
      class="
        divide-y divide-gray-100
        dark:divide-gray-500 dark:divide-opacity-10
      "
    >
      <li v-for="trend in trends" :key="trend.id">
        <n-link
          class="flex justify-between items-center text-sm text-purple-500"
          :to="'/h/' + trend.tag"
        >
          {{ '#' + trend.tag }}
          <vs-button transparent size="small"
            ><span class="text-gray-500">{{ trend.topic_weekly_count }}</span>
          </vs-button>
        </n-link>
      </li>
    </ul>
    <NoData
      v-else-if="!trendsLoading && trends.length === 0"
      class="mt-3 mb-2"
    />
  </div>
</template>

<script>
import NoData from '@/components/UI/NoData'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'MostSpoken',
  components: { NoData },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
      trends: (state) => state.sidebar.trends,
      trendsLoading: (state) => state.sidebar.trendsLoading,
    }),
  },
  watch: {
    trendsLoading(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (!newVal) {
          this.trendsLoad.close()
        } else {
          this.trendsLoad = this.$vs.loading({
            target: this.$refs.trends,
          })
        }
      }
    },
  },
  beforeMount() {
    if (this.trends.length === 0) {
      this.getTrends()
    }
  },
  methods: {
    ...mapActions({
      getTrends: 'sidebar/getTrends',
      clearAlert: 'alert/clear',
    }),
  },
}
</script>
