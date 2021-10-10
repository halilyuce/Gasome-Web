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
      <li v-for="wish in wishes" :key="wish.id">
        <div class="flex flex-row justify-between items-center px-5 py-3">
          <n-link class="flex flex-row items-center" :to="'/g/' + wish.game.id">
            <img
              class="cursor-pointer h-16 w-12 rounded object-cover"
              :src="`${smallCover + wish.game.image}.jpg`"
              alt="Game Cover"
            />
            <div class="flex flex-col ml-3">
              <h4>
                {{ wish.game.name }}
              </h4>
              <span class="text-xs text-gray-700 dark:text-gray-400">
                {{ wish.platform.name }}
              </span>
            </div>
          </n-link>
          <div class="flex flex-row">
            <vs-button
              v-if="same"
              icon
              flat
              :loading="swapListLoading"
              @click="
                addSwapList({ id: wish.game.id, platform: wish.platform.id })
              "
            >
              <i class="bx bx-shuffle"></i>
            </vs-button>
            <vs-button
              v-if="same"
              :loading="wishListLoading"
              icon
              flat
              @click="
                addWishList({ id: wish.game.id, platform: wish.platform.id })
              "
            >
              <i class="bx bx-heart"></i>
            </vs-button>
            <vs-button
              v-else
              :loading="removeLoading"
              danger
              icon
              flat
              @click="openModal(wish)"
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
    <NoData v-if="!loading && wishes.length === 0" class="m-6" />
    <vs-dialog v-model="showRemove">
      <template #header>
        <h4 class="not-margin">
          {{ $t('wishList.makesure') }}<b>{{ $t('wishList.remove') }}</b>
        </h4>
      </template>

      <div v-if="removedWish" class="flex flex-col justify-center items-center">
        <img
          class="cursor-pointer h-16 w-12 rounded object-cover"
          :src="`${smallCover + removedWish.game.image}.jpg`"
          alt="Game Cover"
        />
        <h4>
          {{ removedWish.game.name }}
        </h4>
        <span class="text-xs text-gray-700 dark:text-gray-400">
          {{ removedWish.platform.name }}
        </span>
      </div>

      <template #footer>
        <div class="flex flex-col">
          <vs-button danger block @click="removeWishList(removedWish.id)">
            {{ $t('wishList.yes') }}
          </vs-button>
          <vs-button transparent danger block @click="showRemove = false">
            {{ $t('wishList.cancel') }}
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
    id: null,
    same: false,
  },
  computed: {
    ...mapState({
      wishes: (state) => state.profile.wishes,
      loading: (state) => state.profile.wishesLoading,
      swapListLoading: (state) => state.profile.swapListLoading,
      wishListLoading: (state) => state.profile.wishListLoading,
      removeLoading: (state) => state.profile.removeLoading,
      pageState: (state) => state.profile.wishesPage,
      enough: (state) => state.profile.wishesEnough,
    }),
    page: {
      get() {
        return this.pageState
      },
      set(value) {
        this.setWishesPage(value)
      },
    },
  },
  data() {
    return {
      smallCover: process.env.GAMECOVER_SMALL,
      showRemove: false,
      removedWish: null,
    }
  },
  methods: {
    ...mapActions({
      getWishes: 'profile/getWishes',
      toggleWishesLoading: 'profile/toggleWishesLoading',
      addToSwapList: 'profile/addToSwapList',
      addToWishList: 'profile/addToWishList',
      removeFromWishList: 'profile/removeFromWishList',
      setWishesPage: 'profile/setWishesPage',
      toggleWishesEnough: 'profile/toggleWishesEnough',
    }),
    infiniteHandler($state) {
      const self = this
      if (this.page === 0) {
        this.toggleWishesLoading(true)
      }
      if (!this.enough) {
        this.page += 1
        this.getWishes(this.id).then(function (res) {
          if (res.data.length < 10) {
            $state.complete()
            self.toggleWishesEnough(true)
          } else {
            $state.loaded()
          }
        })
      }
    },
    openModal(wish) {
      this.removedWish = wish
      this.showRemove = true
    },
    removeWishList(id) {
      this.showRemove = false
      this.removeFromWishList(id)
        .then((res) => {
          this.$vs.notification({
            flat: true,
            color: 'success',
            icon: `<i class='bx bx-check' ></i>`,
            position: 'top-center',
            title: 'Successfully Removed',
            text: 'Game removed successfully from your Wish List',
          })
        })
        .catch((err) => {
          this.$vs.notification({
            flat: true,
            color: 'danger',
            icon: `<i class='bx bx-error' ></i>`,
            position: 'top-center',
            title: 'An Error Occured',
            text: err,
          })
        })
    },
    addSwapList(payload) {
      this.addToSwapList(payload)
        .then((res) => {
          this.$vs.notification({
            flat: true,
            color: 'success',
            icon: `<i class='bx bx-check' ></i>`,
            position: 'top-center',
            title: 'Successfully Added',
            text: res.game.name + ' added your Swap List successfully',
          })
        })
        .catch((err) => {
          this.$vs.notification({
            flat: true,
            color: 'danger',
            icon: `<i class='bx bx-error' ></i>`,
            position: 'top-center',
            title: 'An Error Occured',
            text: err,
          })
        })
    },
    addWishList(payload) {
      this.addToWishList(payload)
        .then((res) => {
          this.$vs.notification({
            flat: true,
            color: 'success',
            icon: `<i class='bx bx-check' ></i>`,
            position: 'top-center',
            title: 'Successfully Added',
            text: res.game.name + ' added your Wish List successfully',
          })
        })
        .catch((err) => {
          this.$vs.notification({
            flat: true,
            color: 'danger',
            icon: `<i class='bx bx-error' ></i>`,
            position: 'top-center',
            title: 'An Error Occured',
            text: err,
          })
        })
    },
  },
}
</script>

<style lang="scss"></style>
