<template>
  <div class="bg-white dark:bg-black py-3 px-5 rounded-xl">
    <div class="flex items-baseline space-x-2">
      <h3 v-if="streamsData.title">
        {{ streamsData.title }}
      </h3>
      <i class="bx bxs-circle text-red-600 animate animate-pulse"></i>
    </div>
    <div
      v-if="streamsData.list.length > 0"
      class="w-full flex overflow-x-auto disable-scrollbars py-4 space-x-4"
    >
      <n-link v-for="stream in streamsData.list" :key="stream.id" :to="''">
        <div class="relative h-56 w-80 rounded-xl">
          <div class="absolute bottom-0 w-full flex flex-col space-y-2 z-10">
            <div class="w-full flex justify-between px-4">
              <vs-button size="small" circle primary>
                <span class="truncate">{{ stream.game_name }}</span>
              </vs-button>
              <vs-button size="small" circle dark>
                <i class="bx bxs-circle text-red-600 mr-1"></i>
                <span class="text-white">
                  {{
                    new Intl.NumberFormat('en-GB').format(stream.viewer_count)
                  }}
                </span>
              </vs-button>
            </div>
            <div
              class="
                rounded-b-xl
                w-full
                flex
                justify-between
                items-center
                bg-black bg-opacity-75
                p-4
              "
            >
              <div class="flex flex-col w-2/3 z-10">
                <h6
                  class="truncate text-lg z-10 text-white"
                  :title="stream.title"
                >
                  {{ stream.title }}
                </h6>
                <span class="text-gray-400">{{ stream.user_name }}</span>
              </div>
              <vs-button
                circle
                class="font-semibold uppercase"
                @click="openModal(stream.user_name)"
              >
                {{ $t('discover.watch') }}
              </vs-button>
            </div>
          </div>
          <img
            class="
              h-full
              w-full
              object-cover
              absolute
              top-0
              left-0
              rounded-xl
              z-0
            "
            :src="bgSetter(stream.thumbnail_url)"
            :alt="stream.user_name + '\'s stream'"
          />
        </div>
        <!--
        <vs-card>
          <template #title>
            <div class="flex justify-between items-center">
              <div class="flex flex-col w-2/3">
                <h6 class="truncate" :title="stream.title">
                  {{ stream.title }}
                </h6>
                <span class="text-gray-400">{{ stream.user_name }}</span>
              </div>
              <vs-button circle class="font-semibold"> İZLE </vs-button>
            </div>
          </template>
          <template #img>
            <div class="h-56 w-80">
              <img
                class="h-full w-full object-cover"
                :src="bgSetter(stream.thumbnail_url)"
                :alt="stream.user_name + '\'s stream'"
              />
            </div>
          </template>
          <template #interactions>
            <div class="w-full flex justify-between">
              <vs-button primary>
                {{ stream.game_name }}
              </vs-button>
              <vs-button transparent active dark>
                <i class="bx bxs-circle text-red-600 mr-1"></i>
                <span class="text-white">
                  {{
                    new Intl.NumberFormat('en-IN', {
                      maximumSignificantDigits: 3,
                    }).format(stream.viewer_count)
                  }}
                </span>
              </vs-button>
            </div>
          </template>
          <template #text>
            <span></span>
          </template>
        </vs-card>
        -->
      </n-link>
    </div>
    <NoData v-else />
    <vs-dialog v-model="modal" full-screen blur @close="closeModal">
      <template #header>
        <h4 class="not-margin">
          <b>{{ streamer }} 's Stream</b>
        </h4>
      </template>
      <div class="flex flex-col lg:flex-row lg:px-8">
        <iframe
          :src="
            'https://player.twitch.tv/?volume=1.00&amp;channel=' +
            streamer +
            '&parent=localhost&parent=gasome.com'
          "
          frameborder="0"
          allowfullscreen="true"
          scrolling="no"
          class="w-full lg:w-2/3 stramVideo"
        ></iframe>
        <iframe
          :src="
            'https://www.twitch.tv/embed/' +
            streamer +
            '/chat?darkpopout&parent=localhost&parent=gasome.com'
          "
          scrolling="yes"
          class="w-full lg:w-1/3 stramChat"
        >
        </iframe>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import NoData from '@/components/UI/NoData'

export default {
  name: 'PopularStreams',
  components: { NoData },
  props: {
    streamsData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
      modal: false,
      streamer: '',
    }
  },

  methods: {
    bgSetter(src) {
      return src.replace(/{width}x{height}/g, '300x200')
    },
    openModal(streamer) {
      this.modal = true
      this.streamer = streamer
    },
    closeModal() {
      this.modal = false
      this.streamer = ''
    },
  },
}
</script>
<style scoped>
.stramVideo {
  height: 85vh;
}
.stramChat {
  height: 85vh;
}
@media only screen and (max-width: 1023px) {
  .stramVideo {
    height: 35vh;
  }
  .stramChat {
    height: 50vh;
  }
}
</style>
