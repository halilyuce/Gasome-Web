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
        <vs-button block shadow border>
          <i class="bx bx-heart text-lg mr-2"></i> Wish
        </vs-button>
      </div>
    </div>
  </div>
</template>
<script>
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
      smallImagePath: process.env.GAMECOVER_SMALL,
      mediumImagePath: process.env.GAMECOVER_MEDIUM,
      companyImagePath: process.env.COMPANYIMAGE_SMALL,
      gameSSPath: process.env.GAMESS_MEDIUM,
    }
  },
  methods: {
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
