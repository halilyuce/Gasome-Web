<template>
  <div>
    <ul
      class="
        relative
        divide-y divide-gray-100
        dark:divide-gray-600 dark:divide-opacity-20
        divide-solid
      "
    >
      <li v-for="played in playedList" :key="played.id">
        <div class="flex flex-row justify-between items-center px-5 py-3">
          <n-link
            class="flex flex-row items-center"
            :to="'/g/' + played.game.id"
          >
            <img
              class="cursor-pointer h-16 w-12 rounded object-cover"
              :src="`${smallCover + played.game.image}.jpg`"
              alt="Game Cover"
            />
            <div class="flex flex-col ml-3">
              <h4>
                {{ played.game.name }}
              </h4>
              <span class="text-xs text-gray-700 dark:text-gray-400">
                {{ played.platform.name }}
              </span>
            </div>
          </n-link>
          <div class="flex flex-row">
            <vs-button
              v-if="same"
              icon
              flat
              :loading="playedListLoading === played.id"
              @click="openLibraryModal(played.game)"
            >
              <i class="bx bx-plus"></i>
            </vs-button>
            <vs-button
              v-else
              :loading="removeLoading === played.id"
              danger
              icon
              flat
              @click="openModal(played)"
            >
              <i class="bx bx-trash"></i>
            </vs-button>
          </div>
        </div>
      </li>

      <client-only>
        <infinite-loading
          v-if="!enough"
          spinner="spiral"
          :distance="300"
          @infinite="infiniteHandler"
          ><span slot="no-results"></span><span slot="no-more"></span
        ></infinite-loading>
      </client-only>
    </ul>
    <NoData v-if="!loading && playedList.length === 0" class="m-6" />
    <vs-dialog v-model="showRemove">
      <template #header>
        <h4 class="not-margin">
          {{ $t('swapList.makesure') }} <b>{{ $t('swapList.delete') }}</b>
        </h4>
      </template>

      <div v-if="removedSwap" class="flex flex-col justify-center items-center">
        <img
          class="cursor-pointer h-16 w-12 rounded object-cover"
          :src="`${smallCover + removedSwap.game.image}.jpg`"
          alt="Game Cover"
        />
        <h4>
          {{ removedSwap.game.name }}
        </h4>
        <span class="text-xs text-gray-700 dark:text-gray-400">
          {{ removedSwap.platform.name }}
        </span>
      </div>

      <template #footer>
        <div class="flex flex-col">
          <vs-button danger block @click="removePlayedList(removedSwap.id)">
            {{ $t('swapList.yes') }}
          </vs-button>
          <vs-button transparent danger block @click="showRemove = false">
            {{ $t('swapList.cancel') }}
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog v-model="showLibrary">
      <template #header>
        <h4 class="not-margin">
          {{ $t('g.select') }}
        </h4>
      </template>

      <vs-select
        v-model="gamePlatform"
        filter
        block
        :placeholder="$t('g.platform')"
        :loading="platformsLoading"
      >
        <vs-option
          v-for="p in playedPlatforms"
          :key="p.platform.id"
          :label="p.platform.name"
          :value="p.platform.id"
        >
          {{ p.platform.name }}
        </vs-option>
      </vs-select>

      <template #footer>
        <div class="flex flex-col">
          <vs-button
            :disabled="gamePlatform === ''"
            :loading="addLibraryLoading"
            block
            @click="addLibraryList"
          >
            {{ $t('g.add') }}
          </vs-button>
          <vs-button transparent danger block @click="showLibrary = false">
            {{ $t('g.cancel') }}
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NoData from '~/components/UI/NoData.vue'
export default {
  components: { NoData },
  props: {
    id: {
      type: Number,
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
      showRemove: false,
      removedSwap: null,
      gamePlatform: '',
      showLibrary: false,
      libraryGame: null,
    }
  },
  computed: {
    ...mapState({
      playedList: (state) => state.profile.played,
      loading: (state) => state.profile.playedLoading,
      playedListLoading: (state) => state.profile.playedListLoading,
      platformsLoading: (state) => state.profile.wishPlatformsLoading,
      playedPlatforms: (state) => state.game.wishPlatforms,
      addLibraryLoading: (state) => state.game.addLibraryLoading,
      removeLoading: (state) => state.profile.removeLoading,
      pageState: (state) => state.profile.playedPage,
      enough: (state) => state.profile.playedEnough,
    }),
    page: {
      get() {
        return this.pageState
      },
      set(value) {
        this.setPlayedPage(value)
      },
    },
  },
  methods: {
    ...mapActions({
      getPlayeds: 'profile/getPlayed',
      toggleSwapsLoading: 'profile/togglePlayedLoading',
      addToPlayedList: 'game/addToPlayedList',
      removeFromPlayedList: 'profile/removeFromPlayedList',
      setPlayedPage: 'profile/setPlayedPage',
      togglePlayedEnough: 'profile/togglePlayedEnough',
      togglePlayedLoading: 'profile/togglePlayedLoading',
      getplayedPlatforms: 'game/getWishPlatforms',
    }),
    infiniteHandler($state) {
      const self = this
      if (this.page === 0) {
        this.togglePlayedLoading(true)
      }
      if (!this.enough) {
        this.page += 1
        this.getPlayeds(this.id).then(function (res) {
          if (res.data.length < 10) {
            $state.complete()
            self.togglePlayedEnough(true)
          } else {
            $state.loaded()
          }
        })
      }
    },
    openModal(played) {
      this.removedSwap = played
      this.showRemove = true
    },
    removePlayedList(id) {
      const self = this
      this.showRemove = false
      this.removeFromPlayedList(id)
        .then(() => {
          self.$vs.notification({
            flat: true,
            color: 'success',
            icon: `<i class='bx bx-check' ></i>`,
            position: 'top-center',
            title: self.$t('g.gameRemovedTitle'),
            text: self.$t('g.gameRemovedDesc'),
          })
        })
        .catch((err) => {
          self.$vs.notification({
            flat: true,
            color: 'danger',
            icon: `<i class='bx bx-error' ></i>`,
            position: 'top-center',
            title: self.$t('login.error'),
            text: err,
          })
        })
    },
    openLibraryModal(game) {
      this.getplayedPlatforms(game.id)
      this.showLibrary = true
      this.libraryGame = game
    },
    async addLibraryList() {
      const self = this
      this.addToPlayedList({
        id: this.libraryGame.id,
        platform: this.gamePlatform,
      })
        .then((res) => {
          if (res.errorMessage) {
            self.$vs.notification({
              flat: true,
              color: 'danger',
              icon: `<i class='bx bx-error' ></i>`,
              position: 'top-right',
              title: self.$t('login.error'),
              text: res.errorMessage[0],
            })
          } else {
            self.$vs.notification({
              flat: true,
              color: 'success',
              icon: `<i class='bx bx-check-circle' ></i>`,
              position: 'top-right',
              title: self.$t('g.addWishSuccessTitle'),
              text: self.$t('g.addLibrarySuccessDesc'),
            })
            self.showLibrary = false
          }
        })
        .catch((err) => {
          self.$vs.notification({
            flat: true,
            color: 'danger',
            icon: `<i class='bx bx-error' ></i>`,
            position: 'top-right',
            title: self.$t('login.error'),
            text: err,
          })
        })
    },
  },
}
</script>

<style lang="scss"></style>
