<template>
  <div class="flex flex-col space-y-4">
    <div
      class="
        bg-white
        dark:bg-black
        flex flex-col
        md:flex-row
        justify-between
        items-center
        px-5
        p-3
        rounded-xl
      "
    >
      <h3>{{ $t('discover.title') }}</h3>
      <div class="flex">
        <vs-input
          v-model="search"
          color="#7d33ff"
          type="search"
          :placeholder="$t('messagesBar.search')"
          class="w-full"
          @keyup.enter="searchFunc"
        >
        </vs-input>
        <vs-button icon @click="searchFunc" :loading="loading"
          ><i class="bx bx-search px-2"></i
        ></vs-button>
      </div>
    </div>
    <div
      v-if="searchData"
      class="
        bg-white
        dark:bg-black
        flex flex-col
        md:flex-row
        justify-between
        items-center
        rounded-xl
        grid grid-cols-12
      "
    >
      <div class="col-span-12 relative items-center">
        <ul
          class="
            w-full
            grid grid-cols-4
            border-b border-gray-200
            dark:border-gray-700
            text-sm
          "
        >
          <li
            v-for="tab in tabs"
            :key="tab.value"
            class="
              py-3
              flex
              transition
              duration-300
              ease-in-out
              justify-center
              cursor-pointer
              hover-bg
            "
            :class="{ 'border-b-4 border-purple-500': activeTab === tab.value }"
            @click="activeTab = tab.value"
          >
            <b>{{ tab.title }}</b>
          </li>
        </ul>
        <div class="absolute right-1 top-0.5">
          <vs-button icon danger @click="empty">
            <i class="bx bx-x"></i
          ></vs-button>
        </div>
      </div>

      <div class="col-span-12">
        <TrendUsers
          v-show="activeTab === 'users'"
          :user-data="{ list: searchData.users }"
          :is-row="true"
          class="col-span-12 md:col-span-6 lg:col-span-12"
        />
        <TrendGames
          v-show="activeTab === 'games'"
          :swap-data="{ list: searchData.games }"
          class="col-span-12"
        />
        <div v-show="activeTab === 'tags'" class="col-span-12">
          <ul
            v-if="searchData.tags.length > 0"
            class="p-5 grid grid-cols-12 gap-2"
          >
            <li
              v-for="trend in searchData.tags"
              :key="trend.id"
              class="col-span-4"
            >
              <n-link
                class="
                  flex
                  items-center
                  justify-center
                  p-3
                  bg-gray-50
                  dark:bg-content-bg
                  rounded-xl
                  text-purple-500
                "
                :to="'/h/' + trend.tag"
              >
                {{ '#' + trend.tag }}
              </n-link>
            </li>
          </ul>
          <NoData v-else class="mt-3 mb-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TrendUsers from '@/components/Discover/TrendUsers'
import TrendGames from '@/components/Discover/TrendGames'
import NoData from '@/components/UI/NoData'
export default {
  name: 'SearchBox',
  components: { TrendUsers, TrendGames, NoData },
  props: {
    searchData: {
      type: Object,
      default: null,
    },
  },
  computed: {
    ...mapState({
      loading: (state) => state.search.searchLoading,
    }),
  },
  data() {
    return {
      search: '',
      activeTab: 'users',
      tabs: [
        {
          title: this.$t('discover.users'),
          value: 'users',
        },
        {
          title: this.$t('discover.games'),
          value: 'games',
        },
        {
          title: this.$t('discover.tags'),
          value: 'tags',
        },
      ],
    }
  },
  methods: {
    searchFunc() {
      this.$emit('triggerSearch', this.search)
    },
    empty() {
      this.search = ''
      this.$emit('empty', null)
    },
  },
}
</script>
