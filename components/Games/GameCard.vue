<template>
  <div
    class="
      flex flex-col
      items-center
      xl:w-3/4
      2xl:w-2/3
      xl:ml-auto
      w-full
      my-7
      lg:pr-8
    "
  >
    <img
      :src="`${mediumImagePath + game.image}.webp`"
      alt="Game Image"
      class="w-44 rounded-3xl shadow-xl"
    />
    <div class="flex flex-col mt-5 space-y-3">
      <h1 class="text-xl text-center md:text-3xl">{{ game.name }}</h1>

      <div
        class="
          flex flex-col
          rounded-xl
          bg-white
          dark:bg-black
          divide-y divide-gray-100
          dark:divide-gray-500 dark:divide-opacity-10
        "
      >
        <div v-if="game.company" class="flex items-center px-3 py-2">
          <img
            :src="`${companyImagePath + game.company.logo}.webp`"
            alt=""
            class="h-6 w-6 mr-2 rounded-lg"
          />
          <h5 class="text-gray-600 dark:text-gray-300 leading-3">
            {{ game.company ? game.company.name : '' }}
          </h5>
        </div>

        <div class="flex flex-row items-center px-3 py-2">
          <i
            class="bx bx-calendar text-2xl text-gray-500 dark:text-gray-500"
          ></i>
          <h5 class="ml-2 leading-3 text-gray-600 dark:text-gray-300">
            {{ $moment(game.release_date).format('ll') }} ({{
              $moment(game.release_date).fromNow()
            }})
          </h5>
        </div>

        <div class="flex flex-row items-center px-3 py-2">
          <i
            class="
              bx bx-crosshair
              mr-2
              text-2xl text-gray-500
              dark:text-gray-500
            "
          ></i>
          <h5 class="leading-4 text-gray-600 dark:text-gray-300">
            {{ genresText(game.genres) }}
          </h5>
        </div>

        <div class="flex flex-row items-center px-3 py-2">
          <i
            class="
              bx bx-customize
              mr-2
              text-2xl text-gray-500
              dark:text-gray-500
            "
          ></i>
          <h5 class="leading-4 text-gray-600 dark:text-gray-300">
            {{ platformsText(game.platforms) }}
          </h5>
        </div>
      </div>

      <div class="flex flex-row pt-3">
        <vs-button block border shadow icon>
          <i class="bx bx-shuffle mr-2"></i> Swap
        </vs-button>
        <vs-button block shadow border @click="openWishModal">
          <i class="bx bx-heart text-lg mr-2"></i> Wish
        </vs-button>
      </div>
    </div>
    <vs-dialog v-model="showWish">
      <template #header>
        <h4 class="not-margin">
          {{ $t('g.select') }}
        </h4>
      </template>

      <vs-select
        filter
        block
        :placeholder="$t('g.platform')"
        v-model="wishPlatform"
        :loading="wishLoading"
      >
        <vs-option
          v-for="p in wishPlatforms"
          :key="p.platform.id"
          :label="p.platform.name"
          :value="p.platform.id"
        >
          {{ p.platform.name }}
        </vs-option>
      </vs-select>

      <template #footer>
        <div class="flex flex-col">
          <vs-button :loading="addWishLoading" @click="addWishList" block>
            {{ $t('g.send') }}
          </vs-button>
          <vs-button transparent danger block @click="showWish = false">
            {{ $t('g.cancel') }}
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'GameCard',
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showWish: false,
      wishPlatform: '',
      smallImagePath: process.env.GAMECOVER_SMALL,
      mediumImagePath: process.env.GAMECOVER_MEDIUM,
      companyImagePath: process.env.COMPANYIMAGE_SMALL,
      gameSSPath: process.env.GAMESS_MEDIUM,
    }
  },
  computed: {
    ...mapState({
      wishPlatforms: (state) => state.game.wishPlatforms,
      wishLoading: (state) => state.game.wishPlatformsLoading,
      addWishLoading: (state) => state.game.addWishLoading,
    }),
  },
  methods: {
    ...mapActions({
      getWishPlatforms: 'game/getWishPlatforms',
      addGameWishList: 'game/addGameWishList',
    }),
    openWishModal() {
      this.showWish = true
      if (
        this.wishPlatforms.length === 0 ||
        (this.wishPlatforms && this.wishPlatforms[0].game != this.game.id)
      ) {
        this.getWishPlatforms(this.game.id)
      }
    },
    async addWishList() {
      const self = this
      this.addGameWishList({ game: this.game.id, platform: this.wishPlatform })
        .then((res) => {
          if (res.errorMessage) {
            self.$vs.notification({
              flat: true,
              color: 'danger',
              icon: `<i class='bx bx-error' ></i>`,
              position: 'top-right',
              title: self.$t('g.addWishFailTitle'),
              text: res.errorMessage[0],
            })
          } else {
            self.$vs.notification({
              flat: true,
              color: 'success',
              icon: `<i class='bx bx-check-circle' ></i>`,
              position: 'top-right',
              title: self.$t('g.addWishSuccessTitle'),
              text: self.$t('g.addWishSuccessDesc'),
            })
            self.showWish = false
          }
        })
        .catch((err) => {
          self.$vs.notification({
            flat: true,
            color: 'danger',
            icon: `<i class='bx bx-error' ></i>`,
            position: 'top-right',
            title: self.$t('g.addWishFailTitle'),
            text: err.errorMessage[0],
          })
        })
    },
    platformsText(platforms) {
      var text = ''
      platforms.forEach((platform, index) => {
        text += platform + (index !== platforms.length - 1 ? ', ' : '')
      })
      return text
    },
    genresText(genres) {
      var text = ''
      genres.forEach((genre, index) => {
        text += genre + (index !== genres.length - 1 ? ', ' : '')
      })
      return text
    },
  },
}
</script>
