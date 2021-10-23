<template>
  <div class="bg-white dark:bg-black py-3 px-5 rounded-xl">
    <h3 v-if="swapData.title">
      {{ swapData.title }}
    </h3>
    <div v-if="swapData.list.length > 0">
      <div v-if="listType === 'list'" class="py-4">
        <div class="grid grid-cols-2 gap-2">
          <n-link
            v-for="game in swapData.list"
            :key="game.id"
            :to="'/g/' + game.id"
            class="
              col-span-2
              md:col-span-1
              flex
              items-center
              rounded-xl
              dark:bg-content-bg
              bg-gray-200 bg-opacity-25
              hover:bg-opacity-40
              cursor-pointer
              p-2
            "
          >
            <vs-avatar size="60">
              <img
                :src="smallImagePath + game.image + '.jpg'"
                :alt="game.name + ' avatar'"
              />
            </vs-avatar>
            <h4 class="w-2/3 ml-3">{{ game.name }}</h4>
          </n-link>
        </div>
      </div>
      <div v-else class="w-full flex overflow-x-auto py-4">
        <n-link
          v-for="game in swapData.list"
          :key="game.id"
          :to="'/g/' + game.id"
          class="mx-2"
        >
          <vs-card type="4">
            <template #title>
              <div
                class="min-w-full flex flex-row justify-between items-center"
              >
                <vs-avatar size="70">
                  <img
                    :src="smallImagePath + game.image + '.jpg'"
                    :alt="game.name + ' avatar'"
                  />
                </vs-avatar>
                <span class="pl-2 font-bold text-lg">{{ game.name }}</span>
              </div>
            </template>
            <template #img>
              <div class="h-52 w-80">
                <img
                  class="h-full w-full"
                  :src="gameSSPath + game.screenshots[0] + '.jpg'"
                  :alt="game.name + ' screen shot'"
                />
              </div>
            </template>
            <template #text>
              <span></span>
            </template>
          </vs-card>
        </n-link>
      </div>
    </div>
    <NoData v-else />
  </div>
</template>

<script>
import NoData from '@/components/UI/NoData'
export default {
  name: 'MostSwappingGames',
  components: { NoData },
  props: {
    swapData: {
      type: Object,
      required: true,
    },
    listType: {
      type: String,
      default: 'list',
    },
  },
  data() {
    return {
      smallImagePath: process.env.GAMECOVER_SMALL,
      gameSSPath: process.env.GAMESS_MEDIUM,
    }
  },
}
</script>
<style>
.vs-card-content.type-4 .vs-card__text {
  width: inherit !important;
}
</style>
