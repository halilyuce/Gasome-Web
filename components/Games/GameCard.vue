<template>
  <div class="w-full md:mb-36">
    <div class="col-span-12 relative">
      <div
        class="w-full h-72 rounded-xl static"
        :class="game.screenshots.length > 0 ? '' : 'bg-purple-700'"
        :style="cover"
        style="filter: blur(5px)"
      ></div>
      <div class="absolute top-32 left-10 md:left-32 flex">
        <img
          :src="`${mediumImagePath + game.image}.webp`"
          alt="Game Image"
          class="h-36 md:h-72 ring ring-2 ring-white dark:ring-black rounded-lg shadow-lg"
        />
        <div class="flex flex-col ml-5 text-white">
          <h1 class="text-xl md:text-5xl my-1 stroke-black">{{ game.name }}</h1>
          <span class="my-1 stroke-black text-sm md:text-lg lg:3xl"
            >{{ $moment(game.release_date).format('ll') }} ({{
              $moment(game.release_date).fromNow()
            }})</span
          >
          <div v-if="game.company" class="flex items-center my-1 stroke-black">
            <vs-avatar circle class="mr-2" size="40">
              <img
                :src="`${companyImagePath + game.company.logo}.webp`"
                alt=""
                class="h-6 w-6"
              />
            </vs-avatar>
            <span class="stroke-black text-sm md:text-lg lg:text-2xl">
              {{ game.company ? game.company.name : '' }}
            </span>
          </div>
        </div>
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
  computed: {
    cover() {
      if (this.game.screenshots.length > 0) {
        return `background: url(${
          this.gameSSPath + this.game.screenshots[0] + '.jpg'
        }) no-repeat center; background-size: 100% auto;`
      }
      return ''
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
}
</script>

<style scoped>
.stroke-black {
  text-shadow: -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000,
    1px 1px 1px #000;
}
</style>
