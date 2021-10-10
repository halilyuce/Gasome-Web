<template>
  <div
    class="
      bg-white
      dark:bg-black
      dark:text-white
      min-h-screen
      flex flex-col
      items-center
    "
  >
    <div class="container my-auto flex flex-wrap items-center">
      <div
        class="
          flex
          justify-between
          absolute
          top-0
          items-center
          w-full
          container
          p-10
        "
      >
        <Logo />
        <n-link :to="'/'">
          <vs-button :active="true" animation-type="vertical">
            <span class="mx-2">{{ $t('errorPage.contactButton') }}</span>
            <template #animate>
              <i class="bx bx-mail-send"></i>
            </template>
          </vs-button>
        </n-link>
      </div>
      <div class="w-full md:w-5/12 text-center p-5 lg:p-20">
        <h1 class="text-404 font-black">404</h1>
        <div class="text-xl md:text-3xl font-medium">
          {{ $t('errorPage.missing') }}
        </div>
        <div class="text-lg mb-8">
          {{ $t('errorPage.errorMessage') }}
        </div>
        <div class="flex justify-center">
          <n-link :to="'/'">
            <vs-button size="large" :active="true" animation-type="vertical">
              <span class="mx-2">{{ $t('errorPage.homePageBtn') }}</span>
              <template #animate>
                <i class="bx bx-home-alt"></i>
              </template>
            </vs-button>
          </n-link>
        </div>
      </div>

      <div class="w-full md:w-7/12 text-center p-4">
        <lottie :options="lottieOptions" @animCreated="handleAnimation" />
      </div>
    </div>
  </div>
</template>
<script>
import Logo from '../../components/Logo.vue'
import lottie from 'vue-lottie/src/lottie.vue'
import * as animationData from '~/assets/lottie/404.json'
export default {
  components: { Logo, lottie },
  layout: 'blank',
  data() {
    return {
      anim: null,
      lottieOptions: { animationData: animationData.default },
    }
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim
    },
  },
}
</script>
<style lang="scss">
.text-404 {
  font-size: 8rem;
  line-height: initial;
}
</style>
