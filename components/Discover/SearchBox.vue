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
          state="primary"
          :placeholder="$t('mainPage.search')"
          class="w-full"
          @submit="searchFunc"
        >
        </vs-input>
        <vs-button icon @click="searchFunc">
          <i class="bx bx-search"></i>
        </vs-button>
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
        px-5
        p-3
        rounded-xl
        grid grid-cols-12
      "
    >
      <div class="col-span-12 flex w-full justify-center items-center">
        <div
          class="
            flex flex-row
            md:items-center md:justify-center
            mt-4
            overflow-auto
            text-sm
            font-bold
            uppercase
            text-theme-base-900
            dark:text-theme-base-200
          "
        >
          <a
            class="
              px-6
              py-2
              border-b-2 border-transparent
              dark:hover:bg-theme-base-700
              cursor-pointer
              capitalize
            "
            :class="
              activeTab === 'users'
                ? 'border-blue-300'
                : 'hover:bg-gray-50 hover:border-gray-300'
            "
            @click="activeTab = 'users'"
          >
            {{ $t('discover.users') }}
          </a>
          <a
            class="
              px-6
              py-2
              border-b-2 border-transparent
              dark:hover:bg-theme-base-700
              cursor-pointer
              capitalize
            "
            :class="
              activeTab === 'games'
                ? 'border-blue-300'
                : 'hover:bg-gray-50 hover:border-gray-300'
            "
            @click="activeTab = 'games'"
          >
            {{ $t('discover.games') }}
          </a>
          <a
            class="
              px-6
              py-2
              border-b-2 border-transparent
              dark:hover:bg-theme-base-700
              cursor-pointer
              capitalize
            "
            :class="
              activeTab === 'tags'
                ? 'border-blue-300'
                : 'hover:bg-gray-50 hover:border-gray-300'
            "
            @click="activeTab = 'tags'"
          >
            {{ $t('discover.tags') }}
          </a>
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
        <div v-show="activeTab === 'tags'" class="py-4">
          <ul
            v-if="searchData.tags.length > 0"
            class="
              divide-y divide-gray-100
              dark:divide-gray-500 dark:divide-opacity-10
            "
          >
            <li v-for="trend in searchData.tags" :key="trend.id">
              <n-link
                class="flex items-center text-purple-500"
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
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      search: null,
      activeTab: 'users',
    }
  },
  methods: {
    searchFunc() {
      this.$emit('triggerSearch', this.search)
    },
  },
}
</script>
