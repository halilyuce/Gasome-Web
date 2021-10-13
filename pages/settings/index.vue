<template>
  <div class="bg-white dark:bg-black col-span-12 min-h-screen overflow-auto">
    <!-- Breadcrumb -->

    <div
      class="
        flex
        items-center
        py-3
        px-5
        border-b border-gray-200
        dark:border-gray-700
      "
    >
      <vs-button
        active
        size="small"
        transparent
        @click.prevent="$router.back()"
      >
        <i class="bx bxs-chevron-left text-xl"></i>
      </vs-button>
      <div class="flex flex-col ml-9">
        <h5>{{ $t('main.settings') }}</h5>
        <span class="text-gray-400 text-sm mr-1">{{
          $t('main.textPart')
        }}</span>
      </div>
    </div>

    <ul>
      <li
        class="
          flex
          justify-between
          hover:bg-purple-300 hover:bg-opacity-10
          items-center
          p-5
          border-b border-gray-200
          dark:border-gray-700
        "
      >
        <n-link :to="'/settings/language'" class="flex flex-row items-center">
          <i class="bx bx-world text-gray-600 dark:text-gray-300 text-2xl"></i>
          <div class="flex flex-col ml-4">
            <h3>{{ $t('main.language') }}</h3>
            <span class="text-xs text-gray-600 dark:text-gray-300">{{
              $t('main.languageDesc')
            }}</span>
          </div>
        </n-link>
        <vs-button :to="'/settings/language'" icon flat
          ><i class="bx bxs-chevron-right"></i
        ></vs-button>
      </li>
      <li
        class="
          flex
          justify-between
          hover:bg-purple-300 hover:bg-opacity-10
          items-center
          p-5
          border-b border-gray-200
          dark:border-gray-700
        "
      >
        <n-link
          :to="'/settings/change-password'"
          class="flex flex-row items-center"
        >
          <i class="bx bxs-lock text-gray-600 dark:text-gray-300 text-2xl"></i>
          <div class="flex flex-col ml-4">
            <h3>{{ $t('main.changeA') }}</h3>
            <span class="text-xs text-gray-600 dark:text-gray-300">{{
              $t('main.changeB')
            }}</span>
          </div>
        </n-link>
        <vs-button :to="'/settings/change-password'" icon flat
          ><i class="bx bxs-chevron-right"></i
        ></vs-button>
      </li>
      <li
        class="
          flex
          justify-between
          hover:bg-purple-300 hover:bg-opacity-10
          items-center
          p-5
          border-b border-gray-200
          dark:border-gray-700
        "
      >
        <n-link :to="'/privacy'" class="flex flex-row items-center">
          <i
            class="
              bx
              bxs-check-shield
              text-gray-600
              dark:text-gray-300
              text-2xl
            "
          ></i>
          <div class="flex flex-col ml-4">
            <h3>{{ $t('main.privacyA') }}</h3>
            <span class="text-xs text-gray-600 dark:text-gray-300">{{
              $t('main.privacyB')
            }}</span>
          </div>
        </n-link>
        <vs-button :to="'/privacy'" icon flat
          ><i class="bx bxs-chevron-right"></i
        ></vs-button>
      </li>
      <li
        class="
          flex
          justify-between
          hover:bg-purple-300 hover:bg-opacity-10
          items-center
          p-5
          border-b border-gray-200
          dark:border-gray-700
        "
      >
        <a
          href="mailto:support@gasome.com"
          target="_blank"
          class="flex flex-row items-center"
        >
          <i
            class="bx bxs-help-circle text-gray-600 dark:text-gray-300 text-2xl"
          ></i>
          <div class="flex flex-col ml-4">
            <h3>{{ $t('main.supportA') }}</h3>
            <span class="text-xs text-gray-600 dark:text-gray-300">{{
              $t('main.supportB')
            }}</span>
          </div>
        </a>
        <vs-button
          icon
          flat
          @click.stop.prevent="openWindow('mailto:support@gasome.com')"
          ><i class="bx bxs-chevron-right"></i
        ></vs-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  layout: 'sidebars',
  head() {
    return {
      title: this.$t('pageHead.settingsTitle'),
    }
  },
  methods: {
    openWindow(link) {
      window && window.open(link, '_blank')
    },
  },
}
</script>

<style></style>
