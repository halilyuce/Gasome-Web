<template>
  <div class="col-span-12 h-screen flex flex-col justify-center items-center">
    <div v-if="location">
      Your location data is {{ location.coords.latitude }},
      {{ location.coords.longitude }}
    </div>
    <div v-else class="blob">
      <img :src="`${smallAvatar + loggedInUser.avatar}.jpg`" alt="Avatar" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  layout: 'swaps',
  computed: {
    ...mapGetters(['loggedInUser']),
    ...mapState({
      swaps: (state) => state.swaps.swaps,
      loading: (state) => state.swaps.loading,
    }),
  },
  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
      location: null,
      errorStr: null,
    }
  },
  mounted() {
    const self = this
    this.locateMe().then((res) => {
      if (res) {
        this.getSwaps({
          latitude: self.location.coords.latitude,
          longitude: self.location.coords.longitude,
        })
      }
    })
  },
  async asyncData({ route, store }) {
    if (route.name === 'swaps') {
      await store.dispatch('setTab', 'swaps')
    }
  },
  methods: {
    ...mapActions({
      getSwaps: 'swaps/getSwaps',
    }),
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
