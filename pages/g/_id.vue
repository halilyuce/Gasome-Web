<template>
  <div class="container">
    <CoolLightBox
      :items="images"
      :index="index"
      :useZoomBar="true"
      :fullScreen="true"
      :closeOnClickOutsideMobile="true"
      @close="closeImageViewer()"
    />
    <div class="col-span-12">
      <GameCard v-if="game" :game="game" />
    </div>
    <div v-if="game" class="col-span-12">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 lg:col-span-8">
          <div class="bg-white dark:bg-black p-6 rounded-lg">
            <div class="col-span-12">
              <h2>About</h2>
              {{ game.summary }}
            </div>
            <div class="col-span-12 py-3">
              <h2>Gallery</h2>
              <vs-card-group>
                <vs-card
                  v-for="(ss, index) in game.screenshots"
                  :key="index"
                  @click="showImageViewer(index)"
                >
                  <template #img>
                    <img :src="gameSSPath + ss + '.jpg'" alt="" />
                  </template>
                </vs-card>
              </vs-card-group>
            </div>
            <div class="col-span-12">
              <h2>Videos</h2>
              <vs-card-group>
                <vs-card
                  v-for="(video, index) in game.videos"
                  :key="index"
                  @click="showVideoViewer(index)"
                >
                  <template #img>
                    <div
                      class="absolute w-full h-full flex justify-center items-center"
                    >
                      <vs-button color="#ff3e4e" size="xl" circle floating>
                        <i class="bx bx-play text-xl"></i>
                      </vs-button>
                    </div>
                    <img
                      class="rounded-xl object-cover"
                      :src="'https://img.youtube.com/vi/' + video + '/0.jpg'"
                      :alt="video"
                    />
                  </template>
                </vs-card>
              </vs-card-group>
            </div>
          </div>
        </div>
        <div class="col-span-12 lg:col-span-4">
          <div class="bg-white dark:bg-black p-6 rounded-lg flex flex-col">
            <div class="col-span-12 leading-8">
              <h2>İnfo</h2>
              <div v-if="game.company" class="grid grid-cols-12 gap-4">
                <div class="col-span-4">Company</div>
                <div class="col-span-8">{{ game.company.name }}</div>
              </div>
              <div
                v-if="game.release_date"
                class="grid grid-cols-12 gap-4 divide-y divide-gray-100 dark:divide-black dark:divide-opacity-30"
              >
                <div class="col-span-4">Release Date</div>
                <div class="col-span-8">
                  {{ $moment(game.release_date).format('ll') }}
                </div>
              </div>
              <div
                v-if="game.genres"
                class="grid grid-cols-12 gap-4 divide-y divide-gray-100 dark:divide-black dark:divide-opacity-30"
              >
                <div class="col-span-4">Genre</div>
                <div class="col-span-8">
                  <span v-for="(genre, index) in game.genres" :key="index">
                    {{ genre + (index !== game.genres.length - 1 ? ',' : '') }}
                  </span>
                </div>
              </div>
              <div
                v-if="game.platforms"
                class="grid grid-cols-12 gap-4 divide-y divide-gray-100 dark:divide-black dark:divide-opacity-30"
              >
                <div class="col-span-4">Platforms</div>
                <div class="col-span-8">
                  <span
                    v-for="(platform, index) in game.platforms"
                    :key="index"
                  >
                    {{
                      platform +
                      (index !== game.platforms.length - 1 ? ',' : '')
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-black p-6 rounded-lg flex flex-col mt-4">
            <h2>Ratings</h2>
            <StarRate
              :disabled="false"
              :point="parseFloat(game.ratings.total_rate)"
            />
            <GameComments v-if="comments" :comments="comments" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import GameCard from '~/components/Games/GameCard'
import StarRate from '~/components/Rating/StarRate'
import GameComments from '~/components/Games/GameComments'

export default {
  name: 'gameDetail',
  layout: 'game',
  components: { GameCard, StarRate, GameComments },
  data() {
    return {
      smallImagePath: process.env.GAMEIMAGE_SMALL,
      mediumImagePath: process.env.GAMEIMAGE_MEDIUM,
      largeImagePath: process.env.GAMESS_LARGE,
      companyImagePath: process.env.COMPANYIMAGE_SMALL,
      gameSSPath: process.env.GAMESS_MEDIUM,
      commentPage: 1,
      index: null,
      images: [],
    }
  },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
      game: (state) => state.game.game,
      comments: (state) => state.game.comments,
      loading: (state) => state.loading,
    }),
  },
  async mounted() {
    await this.getGameById(this.$route.params.id)
    await this.getGameComments(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getGameById: 'game/getGameById',
      getGameComments: 'game/getGameComments',
      clearAlert: 'alert/clear',
    }),
    async showVideoViewer(index) {
      await this.game.videos.forEach((video) => {
        this.images.push(`https://www.youtube.com/watch?v=${video}`)
      })
      this.index = index
    },
    async showImageViewer(payload) {
      await this.game.screenshots.forEach((image) => {
        this.images.push(`${this.largeImagePath + image}.jpg`)
      })
      this.index = payload
    },
    async closeImageViewer() {
      this.index = null
      this.images = []
    },

    scrollProgress() {
      return {
        init() {
          window.addEventListener('scroll', () => {
            let winScroll =
              document.body.scrollTop || document.documentElement.scrollTop
            let height =
              document.documentElement.scrollHeight -
              document.documentElement.clientHeight
            this.percent = Math.round((winScroll / height) * 100)
          })
        },
        circumference: 30 * 2 * Math.PI,
        percent: 0,
      }
    },
  },
}
</script>
<style scoped>
.vs-card-content.type-3 .vs-card__img img {
  min-width: 0 !important;
}
</style>
