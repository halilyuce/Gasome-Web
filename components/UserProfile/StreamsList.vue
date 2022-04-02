<template>
  <div>
    <ul class="relative">
      <li v-for="stream in streams" :key="stream.id">
        <div class="flex flex-row justify-between items-center px-5 py-3">
          <div class="relative h-56 w-full rounded-xl">
            <div class="absolute bottom-0 w-full flex flex-col space-y-2 z-10">
              <div class="w-full flex justify-between px-4">
                <vs-button size="small" circle primary>
                  <span class="truncate">{{ stream.duration }}</span>
                </vs-button>
                <vs-button size="small" circle dark>
                  <i class="bx bxs-circle text-red-600 mr-1"></i>
                  <span class="text-white">
                    {{
                      new Intl.NumberFormat('en-GB').format(stream.view_count)
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
                  @click="openModal(stream.id, stream.user_name)"
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
              :src="
                stream.thumbnail_url
                  ? bgSetter(stream.thumbnail_url)
                  : `https://via.placeholder.com/400x300/6441a5/ffffff?text=${stream.user_name}'s Stream`
              "
              :alt="stream.user_name + '\'s stream'"
            />
          </div>
        </div>
      </li>
    </ul>
    <NoData
      v-if="!streamsLoading && streams.length === 0 && (!same || isConnected)"
      class="m-6"
    />
    <SocialConnections
      v-if="same && !streamsLoading && streams.length === 0 && !isConnected"
      :twitch="true"
      class="m-6"
    />
    <vs-dialog v-model="modal" blur @close="closeModal">
      <template #header>
        <h4 class="not-margin">
          <b>{{ streamer }} 's Stream</b>
        </h4>
      </template>
      <div class="flex flex-col lg:flex-row lg:px-4">
        <iframe
          :src="
            'https://player.twitch.tv/?video=' +
            video +
            '&parent=localhost&parent=gasome.com&autoplay=true'
          "
          frameborder="0"
          allowfullscreen
          scrolling="no"
          class="w-full stramVideo"
        ></iframe>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NoData from '~/components/UI/NoData.vue'
import SocialConnections from '@/components/UI/SocialConnections'
export default {
  components: { NoData, SocialConnections },
  props: {
    userId: {
      type: String,
      required: true,
    },
    same: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      smallCover: process.env.GAMECOVER_SMALL,
      isConnected: true,
      modal: false,
      video: '',
      streamer: '',
    }
  },
  computed: {
    ...mapState({
      streams: (state) => state.profile.streams,
      streamsLoading: (state) => state.profile.streamsLoading,
    }),
  },
  async mounted() {
    if (this.userId) {
      await this.getStreams(this.userId)
      console.log(this.userId)
    } else {
      this.isConnected = false
    }
  },
  methods: {
    ...mapActions({
      getStreams: 'profile/getStreams',
    }),
    bgSetter(src) {
      return src.replace(/%{width}x%{height}/g, '400x300')
    },
    openModal(video, streamer) {
      this.modal = true
      this.video = video
      this.streamer = streamer
    },
    closeModal() {
      this.modal = false
      this.video = ''
      this.streamer = ''
    },
  },
}
</script>

<style scoped>
.stramVideo {
  height: 50vh;
  width: 75vh;
}
.stramChat {
  height: 85vh;
}
@media only screen and (max-width: 1023px) {
  .stramVideo {
    height: 40vh;
    width: 100%;
  }
  .stramChat {
    height: 50vh;
  }
}
</style>
