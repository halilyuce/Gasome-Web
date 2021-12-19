<template>
  <div
    class="
      col-span-12
      mobile-height
      lg:h-screen
      flex flex-col
      justify-center
      items-center
    "
  >
    <div
      class="flex flex-col justify-center items-center px-5 space-y-5"
      v-if="location && !loading"
    >
      <p class="text-gray-400 dark:text-gray-600 text-sm">
        {{ $t('swaps.chooseAGame') }}
      </p>

      <div
        class="bg-white dark:bg-black shadow-xl max-w-2xl px-5 py-3 rounded-lg"
      >
        <ul
          v-if="userSwapList && userSwapList.length > 0"
          class="flex flex-row items-center w-full overflow-auto space-x-5"
        >
          <li
            class="cursor-pointer transition duration-150 ease-in-out"
            :class="{
              'bg-purple-200 dark:bg-purple-300 p-2 rounded-xl':
                selectedGame === swap.id,
            }"
            v-for="swap in userSwapList"
            :key="swap.id"
            @click="selectedGame = swap.id"
          >
            <div
              class="flex flex-col w-20 items-center justify-center rounded-xl"
              :style="'background-color:' + swap.platform.color"
            >
              <h6 class="text-white text-2xs truncate text-center w-20 my-1">
                {{ swap.platform.name }}
              </h6>
              <img
                :src="`${smallGameCover + swap.game.image}.jpg`"
                :alt="swap.game.name"
                class="rounded-b-xl w-20 h-24"
              />
            </div>
          </li>
        </ul>
        <no-data
          v-if="
            !userSwapListLoading && userSwapList && userSwapList.length === 0
          "
        />
        <client-only>
          <InfiniteScrollingHorizontal
            v-if="!enough"
            direction="right"
            spinner="spiral"
            :distance="300"
            @infinite="infiniteHandler"
            ><span slot="no-results"></span><span slot="no-more"></span
          ></InfiniteScrollingHorizontal>
        </client-only>
      </div>

      <div
        class="bg-white dark:bg-black shadow-xl w-72 p-5 rounded-lg"
        v-if="swaps.length === 0"
      >
        <no-data />
      </div>

      <div class="flex flex-col items-center space-y-5" v-else>
        <vue-tinder
          ref="swap"
          key-name="distance"
          :queue.sync="swaps"
          :offset-y="10"
          @submit="onSubmit"
        >
          <div
            slot-scope="scope"
            class="w-full h-full"
            :style="{
              'background-image': `url(${mediumGameCover}${scope.data.swapModel.game.image}.jpg`,
              'background-size': 'contain',
              'background-position': 'bottom',
            }"
          >
            <div
              :style="{
                'background-color': scope.data.swapModel.platform.color,
              }"
              class="text-center uppercase font-bold text-white py-2"
            >
              {{ scope.data.swapModel.platform.name }}
            </div>
          </div>
          <img
            class="like-pointer"
            slot="like"
            src="~assets/img/swap-like.png"
          />
          <img
            class="nope-pointer"
            slot="nope"
            src="~assets/img/swap-nope.png"
          />
        </vue-tinder>
        <div
          class="
            flex
            justify-between
            items-end
            w-full
            space-x-4
            uppercase
            text-gray-500
          "
        >
          <div class="flex flex-row items-center">
            <i class="bx bx-caret-left-square text-2xl mr-1"></i>
            <span class="text-sm leading-3">{{ $t('swaps.dislike') }}</span>
          </div>
          <div class="flex flex-row items-center">
            <i class="bx bx-info-square text-2xl mr-1"></i>
            <span class="text-sm leading-3">{{ $t('swaps.details') }}</span>
          </div>
          <div class="flex flex-row items-center">
            <i class="bx bx-caret-right-square text-2xl mr-1"></i>
            <span class="text-sm leading-3">{{ $t('swaps.swap') }}</span>
          </div>
        </div>
        <p class="text-gray-400 dark:text-gray-600 text-sm">
          {{ $t('swaps.keyboardDesc') }}
        </p>
      </div>
    </div>
    <div v-if="location && loading" class="blob">
      <img :src="`${smallAvatar + loggedInUser.avatar}.jpg`" alt="Avatar" />
    </div>
    <div
      class="flex flex-col items-center space-y-10 text-center w-96"
      v-if="!location && !loading"
    >
      <div class="blob">
        <img :src="`${smallAvatar + loggedInUser.avatar}.jpg`" alt="Avatar" />
      </div>
      <p class="text-gray-400 dark:text-gray-600 text-sm">
        {{ $t('swaps.EnableLocation') }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import VueTinder from 'vue-tinder'
import NoData from '../../components/UI/NoData.vue'
import InfiniteScrollingHorizontal from '../../helpers/horizontalScroll'
export default {
  layout: 'swaps',
  components: {
    VueTinder,
    NoData,
    InfiniteScrollingHorizontal,
  },
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState({
      swapsState: (state) => state.swaps.swaps,
      loading: (state) => state.swaps.loading,
      userSwapList: (state) => state.swaps.userSwapList,
      userSwapListLoading: (state) => state.swaps.userSwapListLoading,
      userSwapListEnough: (state) => state.swaps.userSwapListEnough,
      pageState: (state) => state.swaps.userSwapListPage,
    }),
    swaps: {
      get() {
        var newArr = JSON.stringify(this.swapsState)
        return JSON.parse(newArr)
      },
      set(value) {
        this.setSwaps(value)
      },
    },
    page: {
      get() {
        return this.pageState
      },
      set(value) {
        this.setCurrentPage(value)
      },
    },
    enough: {
      get() {
        return this.userSwapListEnough
      },
      set(value) {
        this.setEnough(value)
      },
    },
  },
  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
      smallGameCover: process.env.GAMECOVER_SMALL,
      mediumGameCover: process.env.GAMECOVER_MEDIUM,
      location: null,
      selectedGame: null,
      errorStr: null,
      _keyListener: null,
    }
  },
  mounted() {
    const self = this
    this.locateMe().then((res) => {
      if (res && self.swaps.length === 0) {
        this.getSwaps({
          latitude: self.location.coords.latitude,
          longitude: self.location.coords.longitude,
        })
      }
      document.addEventListener('keydown', self.eventHandler)
    })
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.eventHandler)
  },
  async asyncData({ route, store }) {
    if (route.name === 'swaps') {
      await store.dispatch('setTab', 'swaps')
    }
  },
  methods: {
    ...mapActions({
      getSwaps: 'swaps/getSwaps',
      setSwaps: 'swaps/setSwaps',
      getUserSwapList: 'swaps/getUserSwapList',
      toggleUserSwapListLoading: 'swaps/toggleUserSwapListLoading',
      createSwap: 'swaps/createSwap',
      setCurrentPage: 'swaps/setUserSwapListPage',
      setEnough: 'swaps/setUserSwapListEnough',
    }),
    infiniteHandler($state) {
      const self = this
      if (!this.enough) {
        this.toggleUserSwapListLoading(true)
        this.getUserSwapList(this.loggedInUser.username).then(function (res) {
          if (res.data.length < 10) {
            $state.complete()
            self.setEnough(true)
            self.selectedGame = res.data[0].id
          } else {
            self.page += 1
            $state.loaded()
          }
        })
      }
    },
    eventHandler(e) {
      const { key } = e
      if (key === 'ArrowLeft') {
        e.preventDefault()
        this.decide('dislike')
      } else if (key === 'ArrowRight') {
        e.preventDefault()
        this.decide('like')
      } else if (key === 'i') {
        e.preventDefault()
        console.warn('info key pressed')
      }
    },
    onSubmit(e) {
      const self = this
      if (e.type === 'like') {
        this.createSwap({
          receiverId: e.item.swapModel.user_id,
          wishId: e.item.swapModel.id,
          swapId: this.selectedGame,
          process: 1,
        }).then((res) => {
          self.$vs.notification({
            flat: true,
            color: 'success',
            icon: `<i class='bx bx-check-circle' ></i>`,
            position: 'bottom-right',
            title: self.$t('swaps.sentSwapSuccessTitle'),
            text: self.$t('swaps.sentSwapSuccessDesc'),
          })
        })
      } else {
        this.createSwap({
          receiverId: e.item.swapModel.user_id,
          wishId: e.item.swapModel.id,
          swapId: this.selectedGame,
          process: 0,
        })
      }
      if (this.swaps.length < 1) {
        this.getSwaps({
          latitude: this.location.coords.latitude,
          longitude: this.location.coords.longitude,
        })
      }
    },
    async decide(choice) {
      this.$refs.swap.decide(choice)
    },
    async getLocation() {
      return new Promise((resolve, reject) => {
        if (!('geolocation' in navigator)) {
          reject(new Error('Geolocation is not available.'))
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve(pos)
          },
          (err) => {
            reject(err)
          }
        )
      })
    },
    async locateMe() {
      try {
        this.location = await this.getLocation()
        return true
      } catch (e) {
        this.errorStr = e.message
        return false
      }
    },
  },
}
</script>

<style lang="scss">
.mobile-height {
  @media only screen and (max-width: 770px) {
    height: calc(100vh - 115px);
  }
}
.vue-tinder {
  width: 30vh;
  height: 45vh;
  margin-bottom: 2em;
  margin-top: 0.5em;
}

.nope-pointer,
.like-pointer {
  position: absolute;
  z-index: 1;
  top: calc(22.5vh - 48px);
  width: 96px;
  height: 96px;
}

.nope-pointer {
  left: calc(15vh - 48px);
}

.like-pointer {
  left: calc(15vh - 48px);
}

.blob {
  border-radius: 50%;
  background: #6e00ff;
  box-shadow: 0 0 0 0 #6f00ff;
  animation: pulse-purple 2s infinite;
  margin: 10px;
  height: 100px;
  width: 100px;
  transform: scale(1);
  img {
    border-radius: 50%;
  }
}

@keyframes pulse-purple {
  0% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 #6f00ffb7;
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 20px #6f00ff05;
  }

  100% {
    transform: scale(0.9);
    box-shadow: 0 0 0 0 #6f00ff05;
  }
}
</style>
