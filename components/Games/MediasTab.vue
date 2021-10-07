<template>
  <div>
    <CoolLightBox
      :items="images"
      :index="index"
      :use-zoom-bar="true"
      :full-screen="true"
      :close-on-click-outside-mobile="true"
      @close="closeImageViewer()"
    />
    <h2>Photos</h2>
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
    <h2>Videos</h2>
    <vs-card-group>
      <vs-card
        v-for="(video, index) in game.videos"
        :key="index"
        @click="showVideoViewer(index)"
      >
        <template #img>
          <div class="absolute w-full h-full flex justify-center items-center">
            <vs-button color="#ff3e4e" size="xl" circle floating>
              <i class="bx bx-play text-xl"></i>
            </vs-button>
          </div>
          <img
            class="h-48 object-cover"
            :src="'https://img.youtube.com/vi/' + video + '/0.jpg'"
            :alt="video"
          />
        </template>
      </vs-card>
    </vs-card-group>
  </div>
</template>

<script>
export default {
  name: 'MediasTab',
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      index: null,
      images: [],
      smallImagePath: process.env.GAMEIMAGE_SMALL,
      mediumImagePath: process.env.GAMEIMAGE_MEDIUM,
      largeImagePath: process.env.GAMESS_LARGE,
      companyImagePath: process.env.COMPANYIMAGE_SMALL,
      gameSSPath: process.env.GAMESS_MEDIUM,
    }
  },
  methods: {
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
  },
}
</script>

<style scoped>
.vs-card-content.type-3 .vs-card__img img {
  min-width: 0 !important;
}
</style>
