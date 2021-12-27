<template>
  <vs-dialog v-model="composer" width="500px" not-center>
    <template #header>
      <h4 class="not-margin">{{ $t('gameReview.title') }}</h4>
    </template>

    <div class="flex justify-between items-center py-2">
      <div>{{ $t('gameReview.rate') }}:</div>
      <StarRateSingle size="4xl" @rating="changeRate" />
    </div>
    <div class="relative">
      <textarea
        v-model="text"
        class="
          w-full
          px-3
          py-2
          text-gray-700
          dark:text-gray-300 dark:bg-content-bg
          border border-gray-200
          dark:border-gray-700
          rounded-lg
          focus:outline-none
        "
        :placeholder="$t('gameReview.placeHolder')"
        rows="4"
      ></textarea>

      <EmojiPicker :search="emojiSearch">
        <vs-button
          slot="emoji-invoker"
          slot-scope="{ events: { click: clickEvent } }"
          shadow
          size="small"
          class="absolute-important top-0.5 right-0"
          @click.stop="clickEvent"
        >
          <i class="bx bx-smile text-xl"></i>
        </vs-button>

        <div slot="emoji-picker" slot-scope="{ emojis }">
          <div
            class="
              absolute
              z-10
              border-none
              w-64
              h-96
              overflow-scroll
              p-4
              rounded
              bg-white
              dark:bg-content-bg
              shadow-xl
              top-0.5
              -r-64
            "
          >
            <div class="flex">
              <input
                v-model="emojiSearch"
                v-focus
                class="
                  rounded-full
                  dark:bg-content-bg dark:text-gray-400
                  border
                  dark:border-gray-600
                  border-gray-300
                  py-2
                  px-4
                  outline-none
                  focus:shadow-outline
                  w-full
                "
                type="text"
                :placeholder="$t('postComposer.emoji')"
              />
            </div>
            <div>
              <div v-for="(emojiGroup, category) in emojis" :key="category">
                <h5
                  class="
                    text-grey-darker
                    uppercase
                    text-sm
                    cursor-default
                    mb-2
                    mt-4
                  "
                >
                  {{ category }}
                </h5>
                <div class="flex flex-wrap justify-between emojis">
                  <button
                    v-for="(emoji, emojiName) in emojiGroup"
                    :key="emojiName"
                    class="
                      p-1
                      cursor-pointer
                      rounded
                      bg-white
                      dark:bg-content-bg
                      focus:outline-none focus:shadow-outline
                      text-xl
                      flex
                      items-center
                      justify-center
                      h-8
                      w-8
                    "
                    :title="emojiName"
                    @click="append(emoji)"
                  >
                    {{ emoji }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EmojiPicker>
      <p class="text-xs text-gray-400">* {{ $t('gameReview.rules') }}</p>
    </div>

    <template #footer>
      <div class="flex justify-end space-x-4">
        <vs-button
          danger
          transparent
          :loading="commentsLoading"
          @click.stop="close"
        >
          {{ $t('gameReview.cancel') }}
        </vs-button>
        <vs-button
          primary
          :disabled="rate === 0"
          :loading="commentsLoading"
          @click="commentSend"
        >
          {{ $t('gameReview.send') }}
        </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import EmojiPicker from 'vue-emoji-picker'
import StarRateSingle from '@/components/Rating/StarRateSingle'

export default {
  name: 'GameCommentModal',
  components: { EmojiPicker, StarRateSingle },
  data() {
    return {
      emojiSearch: '',
      text: '',
      rate: 0,
      gameId: this.$route.params.id,
    }
  },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
      commentComposer: (state) => state.game.commentComposer,
      commentsLoading: (state) => state.game.commentsLoading,
    }),
    composer: {
      get() {
        return this.commentComposer
      },
      set(value) {
        this.toggleCommentComposer(value)
      },
    },
  },

  methods: {
    ...mapActions({
      toggleCommentComposer: 'game/toggleCommentComposer',
      postGameComment: 'game/postGameComment',
    }),
    changeRate(rate) {
      this.rate = rate
    },
    append(emoji) {
      this.text += emoji
    },
    close() {
      this.toggleCommentComposer(false)
    },
    async commentSend() {
      const payload = {
        id: this.gameId,
        comment: this.text,
        star: this.rate,
      }
      await this.postGameComment(payload)
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
  },
}
</script>
