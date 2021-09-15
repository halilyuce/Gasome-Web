<template>
  <div class="flex justify-center md:justify-end md:mr-6">
    <div class="flex flex-col">
      <img
        :src="`${mediumImagePath + game.image}.webp`"
        alt="Game Image"
        class="w-56 rounded-3xl shadow-xl"
      />
      <div class="flex flex-col my-5">
        <h1 class="text-xl md:text-3xl my-1">{{ game.name }}</h1>
        <h5 class="my-1 text-gray-600 dark:text-gray-300">
          {{ $moment(game.release_date).format('ll') }} ({{
            $moment(game.release_date).fromNow()
          }})
        </h5>
        <div v-if="game.company" class="flex items-center my-1">
          <img
            :src="`${companyImagePath + game.company.logo}.webp`"
            alt=""
            class="h-6 w-6 mr-2 rounded-lg"
          />
          <h5 class="text-gray-600 dark:text-gray-300">
            {{ game.company ? game.company.name : '' }}
          </h5>
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
