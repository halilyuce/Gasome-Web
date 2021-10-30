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
      class="flex flex-col justify-center items-center px-5 space-y-10"
      v-if="location && !loading"
    >
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
    <div v-if="!location || loading" class="blob">
      <img :src="`${smallAvatar + loggedInUser.avatar}.jpg`" alt="Avatar" />
    </div>
    <div v-if="location && !loading && swaps.length === 0">
      <no-data />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import VueTinder from 'vue-tinder'
import NoData from '../../components/UI/NoData.vue'
export default {
  layout: 'swaps',
  components: {
    VueTinder,
    NoData,
  },
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState({
      swapsState: (state) => state.swaps.swaps,
      loading: (state) => state.swaps.loading,
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
  },
  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
      mediumGameCover: process.env.GAMECOVER_MEDIUM,
      location: null,
      errorStr: null,
    }
  },
  mounted() {
    const self = this
    this.locateMe().then((res) => {
      if (res && self.swaps.length === 0) {
        this.getSwaps({
          latitude: self.location.coords.latitude,
          longitude: self.location.coords.longitude,
        }).then((data) => {
          self._keyListener = function (e) {
            if (e.key === 'ArrowLeft') {
              e.preventDefault()
              self.decide('dislike')
            } else if (e.key === 'ArrowRight') {
              e.preventDefault()
              self.decide('like')
            } else if (e.key === 'i') {
              e.preventDefault()
              console.warn('info key pressed')
            }
          }

          document.addEventListener('keydown', this._keyListener.bind(this))
        })
      }
    })
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this._keyListener)
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
    }),
    onSubmit() {
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
  width: 310px;
  height: 450px;
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
