<template>
  <div class="border-b border-gray-200 dark:border-gray-700">
    <CoolLightBox
      :items="images"
      :index="index"
      :use-zoom-bar="true"
      :full-screen="true"
      :close-on-click-outside-mobile="true"
      @close="closeImageViewer()"
    />
    <div :v-if="post" class="py-3">
      <div
        v-if="post.only_boost"
        class="flex flex-row items-center text-gray-400 ml-9 mb-2"
      >
        <i class="bx bxs-zap mr-1"></i>
        <span>{{ post.user.name + ' ' + $t('singlePost.boosted') }} </span>
      </div>
      <div v-if="post.only_boost" class="flex flex-col">
        <div class="user flex flex-row mb-3 px-5">
          <n-link :to="`/u/${post.quoted_post[0].user.username}`">
            <vs-avatar size="50">
              <img
                :src="`${smallAvatar + post.quoted_post[0].user.avatar}.jpg`"
                alt="Avatar"
              />
            </vs-avatar>
          </n-link>

          <div class="flex flex-col ml-3">
            <h4 class="">{{ post.quoted_post[0].user.name }}</h4>
            <span class="text-gray-400">{{
              '@' + post.quoted_post[0].user.username
            }}</span>
          </div>
        </div>

        <div class="w-full">
          <div>
            <p
              class="dark:text-gray-300 text-lg px-5"
              v-html="hyperlinkString(post.quoted_post[0].text)"
            />

            <div
              v-if="
                post.quoted_post[0].image &&
                post.quoted_post[0].image.length > 0
              "
              class="grid grid-cols-1 gap-2 auto-cols-max px-5 mt-2"
              :class="{ 'grid-cols-2': post.quoted_post[0].image.length > 1 }"
            >
              <div
                v-for="(image, index) in post.quoted_post[0].image"
                :key="image.id"
                class="aspect-w-16 aspect-h-9 mt-2 cursor-pointer"
                @click="
                  showImageViewer({
                    post: post.quoted_post[0],
                    index: index,
                  })
                "
              >
                <img
                  :src="`${mediumImagePath + image.image}.jpg`"
                  class="rounded-xl object-cover"
                  alt=""
                />
              </div>
            </div>

            <div
              v-if="post.quoted_post[0].video"
              class="relative mt-2 aspect-w-16 aspect-h-9 mx-5 cursor-pointer"
              @click.stop="showVideoViewer(post.quoted_post[0].vide)"
            >
              <div
                class="absolute w-full h-full flex justify-center items-center"
              >
                <vs-button color="#ff3e4e" size="xl" circle floating>
                  <i class="bx bx-play text-xl"></i>
                </vs-button>
              </div>
              <img
                class="rounded-xl object-cover"
                :src="
                  'https://img.youtube.com/vi/' +
                  post.quoted_post[0].video +
                  '/0.jpg'
                "
                :alt="post.quoted_post[0].video"
              />
            </div>

            <div class="px-5">
              <QuotedPost
                v-if="
                  post.quoted_post[0].quoted_post &&
                  post.quoted_post[0].quoted_post.length > 0
                "
                :post="post.quoted_post[0].quoted_post[0]"
              />
            </div>

            <p class="text-gray-500 px-5 mt-3 text-sm">
              {{ $moment(post.quoted_post[0].created_at).format('lll') }}
            </p>
          </div>

          <div
            class="
              flex flex-row
              mt-3
              pt-3
              px-5
              border-t border-gray-200
              dark:border-gray-700
            "
          >
            <div class="flex items-center mr-5">
              <b>{{ post.quoted_post[0].comments_count }}</b>
              <span class="text-gray-400 ml-2">{{
                post.quoted_post[0].comments_count > 1
                  ? $t('singlePost.comments')
                  : $t('singlePost.comment')
              }}</span>
            </div>

            <div class="flex items-center mr-5">
              <b>{{ post.quoted_post[0].boosts_count }}</b>
              <span class="text-gray-400 ml-2">{{
                post.quoted_post[0].boosts_count > 1
                  ? $t('singlePost.boosts')
                  : $t('singlePost.boost')
              }}</span>
            </div>

            <div class="flex items-center">
              <b>{{ post.quoted_post[0].likes_count }}</b>
              <span class="text-gray-400 ml-2">{{
                post.quoted_post[0].likes_count > 1
                  ? $t('singlePost.favorites')
                  : $t('singlePost.favorite')
              }}</span>
            </div>
          </div>

          <div
            class="
              flex
              justify-between
              mt-3
              pt-3
              px-5
              border-t border-gray-200
              dark:border-gray-700
              text-gray-500
            "
          >
            <div class="flex items-center">
              <i class="bx bx-message-square-detail text-lg mr-3"></i>
            </div>

            <div ref="boost" class="relative">
              <a
                class="flex items-center cursor-pointer boost"
                :class="{
                  'text-purple-600': post.quoted_post[0].is_boosted_count,
                }"
                @click.prevent="showQuote(post)"
              >
                <i class="bx bxs-zap text-lg mr-3 boost"></i>
              </a>
              <ul
                v-if="askQuote === post.id"
                class="
                  dropdown-menu
                  bg-white
                  shadow-xl
                  dark:bg-black
                  border border-gray-200
                  dark:border-gray-700
                "
              >
                <li>
                  <a
                    href="javascript:void(0)"
                    class="dark:text-gray-300 hover:text-purple-500"
                    @click="boost(post.quoted_post[0])"
                  >
                    <i class="bx bxs-zap text-lg mr-3"></i>
                    {{ $t('singlePost.orderBoost') }}
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    class="dark:text-gray-300 hover:text-purple-500"
                    @click="quote(post.quoted_post[0])"
                  >
                    <i class="bx bxs-comment-detail text-lg mr-3"></i>
                    {{ $t('singlePost.orderQuote') }}
                  </a>
                </li>
              </ul>
            </div>

            <a
              class="flex items-center cursor-pointer"
              :class="{
                'text-yellow-500': post.quoted_post[0].is_favorited_count,
              }"
              @click.prevent="favorite(post.quoted_post[0].id)"
            >
              <i class="bx bxs-star text-lg mr-3"></i>
            </a>
            <div ref="share" class="flex items-center relative">
              <a
                class="share"
                href="javascript:void(0)"
                @click.prevent="showShareList(post)"
              >
                <i class="bx bx-share-alt text-lg share"></i
              ></a>
              <ul
                v-if="showShare === post.id"
                class="
                  dropdown-menu dropdown-menu-right
                  bg-white
                  shadow-xl
                  dark:bg-black
                  border border-gray-200
                  dark:border-gray-700
                "
              >
                <li>
                  <a
                    href="javascript:void(0)"
                    class="dark:text-gray-300 hover:text-purple-500"
                    @click.prevent="copyLink(post)"
                  >
                    <i class="bx bxs-copy-alt text-lg mr-3"></i>
                    {{ $t('singlePost.copy') }}
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    class="dark:text-gray-300 hover:text-purple-500"
                    @click.prevent="shareTwitter(post)"
                  >
                    <i class="bx bxl-twitter text-lg mr-3"></i>
                    {{ $t('singlePost.twitter') }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col">
        <div class="user flex flex-row mb-3 px-5">
          <n-link :to="`/u/${post.user.username}`">
            <vs-avatar size="50">
              <img
                :src="`${smallAvatar + post.user.avatar}.jpg`"
                alt="Avatar"
              />
            </vs-avatar>
          </n-link>

          <div class="flex flex-col ml-3">
            <h4 class="">{{ post.user.name }}</h4>
            <span class="text-gray-400">{{ '@' + post.user.username }}</span>
          </div>
        </div>
        <div class="w-full">
          <div>
            <p
              class="dark:text-gray-300 text-lg px-5"
              v-html="hyperlinkString(post.text)"
            />

            <div
              v-if="post.image && post.image.length > 0"
              class="grid grid-cols-1 gap-2 auto-cols-max px-5 mt-2"
              :class="{ 'grid-cols-2': post.image.length > 1 }"
            >
              <div
                v-for="(image, index) in post.image"
                :key="image.id"
                class="aspect-w-16 aspect-h-9 cursor-pointer"
                @click="
                  showImageViewer({
                    post: post,
                    index: index,
                  })
                "
              >
                <img
                  :src="`${mediumImagePath + image.image}.jpg`"
                  class="rounded-xl object-cover"
                  alt=""
                />
              </div>
            </div>

            <div
              v-if="post.video"
              class="relative mt-2 aspect-w-16 aspect-h-9 mx-5 cursor-pointer"
              @click.stop="showVideoViewer(post.video)"
            >
              <div
                class="absolute w-full h-full flex justify-center items-center"
              >
                <vs-button color="#ff3e4e" size="xl" circle floating>
                  <i class="bx bx-play text-xl"></i>
                </vs-button>
              </div>
              <img
                class="rounded-xl object-cover"
                :src="'https://img.youtube.com/vi/' + post.video + '/0.jpg'"
                :alt="post.video"
              />
            </div>

            <div class="px-5">
              <QuotedPost
                v-if="post.quoted_post && post.quoted_post.length > 0"
                :post="post.quoted_post[0]"
                @show-viewer="showImageViewer"
              />
            </div>
          </div>

          <p class="text-gray-500 px-5 mt-3 text-sm">
            {{ $moment(post.created_at).format('lll') }}
          </p>

          <div
            class="
              flex flex-row
              mt-3
              pt-3
              px-5
              border-t border-gray-200
              dark:border-gray-700
            "
          >
            <div class="flex items-center mr-5">
              <b>{{ post.comments_count }}</b>
              <span class="text-gray-400 ml-2">{{
                post.comments_count > 1
                  ? $t('singlePost.comments')
                  : $t('singlePost.comment')
              }}</span>
            </div>

            <div class="flex items-center mr-5">
              <b>{{ post.boosts_count }}</b>
              <span class="text-gray-400 ml-2">{{
                post.boosts_count > 1
                  ? $t('singlePost.boosts')
                  : $t('singlePost.boost')
              }}</span>
            </div>

            <div class="flex items-center">
              <b>{{ post.likes_count }}</b>
              <span class="text-gray-400 ml-2">{{
                post.likes_count > 1
                  ? $t('singlePost.favorites')
                  : $t('singlePost.favorite')
              }}</span>
            </div>
          </div>

          <div
            class="
              flex
              justify-between
              mt-3
              pt-3
              px-5
              border-t border-gray-200
              dark:border-gray-700
              text-gray-500
            "
          >
            <div class="flex items-center cursor-pointer">
              <i class="bx bx-message-square-detail text-lg mr-3"></i>
            </div>
            <div ref="boost" class="relative">
              <a
                class="flex items-center cursor-pointer boost"
                :class="{
                  'text-purple-600': post.is_boosted_count,
                }"
                @click.prevent="showQuote(post)"
              >
                <i class="bx bxs-zap text-lg mr-3 boost"></i>
              </a>
              <ul
                v-if="askQuote === post.id"
                class="
                  dropdown-menu
                  bg-white
                  shadow-xl
                  dark:bg-black
                  border border-gray-200
                  dark:border-gray-700
                "
              >
                <li>
                  <a
                    href="javascript:void(0)"
                    class="dark:text-gray-300 hover:text-purple-500"
                    @click="boost(post)"
                  >
                    <i class="bx bxs-zap text-lg mr-3"></i>
                    {{ $t('singlePost.orderBoost') }}
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    class="dark:text-gray-300 hover:text-purple-500"
                    @click="quote(post)"
                  >
                    <i class="bx bxs-comment-detail text-lg mr-3"></i>
                    {{ $t('singlePost.orderQuote') }}
                  </a>
                </li>
              </ul>
            </div>

            <a
              class="flex items-center cursor-pointer"
              :class="{ 'text-yellow-500': post.is_favorited_count }"
              @click.prevent="favorite(post.id)"
            >
              <i class="bx bxs-star text-lg mr-3"></i>
            </a>
            <div ref="share" class="flex items-center relative">
              <a
                class="share"
                href="javascript:void(0)"
                @click.prevent="showShareList(post)"
              >
                <i class="bx bx-share-alt text-lg share"></i
              ></a>
              <ul
                v-if="showShare === post.id"
                class="
                  dropdown-menu dropdown-menu-right
                  bg-white
                  shadow-xl
                  dark:bg-black
                  border border-gray-200
                  dark:border-gray-700
                "
              >
                <li>
                  <a
                    href="javascript:void(0)"
                    class="dark:text-gray-300 hover:text-purple-500"
                    @click.prevent="copyLink(post)"
                  >
                    <i class="bx bxs-copy-alt text-lg mr-3"></i>
                    {{ $t('singlePost.copy') }}
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    class="dark:text-gray-300 hover:text-purple-500"
                    @click.prevent="shareTwitter(post)"
                  >
                    <i class="bx bxl-twitter text-lg mr-3"></i>
                    {{ $t('singlePost.twitter') }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QuotedPost from './QuotedPost.vue'
import linkClickRouting from '../../helpers/mixins/linkClickRouting'
export default {
  components: { QuotedPost },
  mixins: [linkClickRouting],
  props: {
    post: {
      type: Object,
      defult: null,
      required: true,
    },
  },
  data() {
    return {
      smallAvatar: process.env.AVATAR_SMALL,
      mediumImagePath: process.env.POSTIMAGE_MEDIUM,
      largeImagePath: process.env.POSTIMAGE_LARGE,
      askQuote: null,
      showShare: null,
      index: null,
      images: [],
    }
  },
  mounted() {
    document.addEventListener('click', this.clickHandler)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.clickHandler)
    this.$emit('null', true)
  },
  methods: {
    favorite(id) {
      this.$emit('favorite-post', id)
    },
    boost(post) {
      this.$emit('boost-post', post)
    },
    quote(post) {
      this.$emit('quote-post', post)
    },
    async showVideoViewer(video) {
      await this.images.push({
        src: `https://www.youtube.com/watch?v=${video}`,
      })
      this.index = 0
    },
    async showImageViewer(payload) {
      await payload.post.image.forEach((image) => {
        this.images.push(`${this.largeImagePath + image.image}.jpg`)
      })
      this.index = payload.index
    },
    async closeImageViewer() {
      this.index = null
      this.images = []
    },
    showQuote(post) {
      if (post.is_boosted_count) {
        this.boost(post)
      } else {
        if (this.askQuote && this.askQuote === post.id) {
          this.askQuote = null
        } else {
          this.askQuote = post.id
        }
      }
    },
    showShareList(post) {
      if (this.showShare && this.showShare === post.id) {
        this.showShare = null
      } else {
        this.showShare = post.id
      }
    },
    shareTwitter(post) {
      // Opens a pop-up with twitter sharing dialog
      var shareURL = 'http://twitter.com/share?' //url base
      //params
      var params = {
        url: `https://gasome.com/p/${post.id}`,
        // text: 'Replace this with your text',
        via: 'gasomecom',
        hashtags: 'gasome',
      }
      for (var prop in params)
        shareURL += '&' + prop + '=' + encodeURIComponent(params[prop])
      window.open(
        shareURL,
        '',
        'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0'
      )
    },
    copyLink(post) {
      navigator.clipboard.writeText(`https://gasome.com/p/${post.id}`)
    },
    clickHandler(event) {
      const { target } = event
      if (!target.classList.contains('boost')) {
        if (this.askQuote) {
          this.askQuote = null
        }
      }
      if (!target.classList.contains('share')) {
        if (this.showShare) {
          this.showShare = null
        }
      }
    },
  },
}
</script>
