<template>
  <div class="bg-white dark:bg-black max-h-screen overflow-y-auto">
    <div class="my-5">
      <div class="flex justify-between items-center px-5">
        <vs-input
          color="#7d33ff"
          type="search"
          v-model="search"
          icon-after
          placeholder="Search A Game or User"
          class="mb-3 w-72"
        >
          <template #icon>
            <i class="bx bx-search"></i>
          </template>
        </vs-input>
        <vs-button :active="true">
          <i class="bx bx-edit text-xl"></i>

          <template #animate>
            <span class="px-6">Post</span>
          </template>
        </vs-button>
      </div>
      <Posts :posts="posts" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Posts from '../components/Posts/Posts.vue'
export default {
  layout: 'sidebars',
  components: {
    Posts,
  },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
      posts: (state) => state.posts.posts,
      loading: (state) => state.posts.loading,
    }),
  },
  data() {
    return {
      search: '',
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    ...mapActions({
      getPosts: 'posts/getPosts',
      clearAlert: 'alert/clear',
    }),
  },
}
</script>
