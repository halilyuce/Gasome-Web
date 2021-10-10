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
        <h5>{{ $t('Language') }}</h5>
        <span class="text-gray-400 text-sm mr-1">{{
          $t('Update your language settings')
        }}</span>
      </div>
    </div>

    <form
      class="px-5 md:px-20 space-y-6 lg:px-5"
      @submit.prevent="updateLanguage"
    >
      <vs-select
        v-if="languages"
        :placeholder="$t('Select a language')"
        class="block w-full mt-5"
        v-model="selected"
        @change="languageChanged = false"
      >
        <vs-option
          v-for="language in languages"
          :key="language.code"
          :label="language.name"
          :value="language.iso"
        >
          {{ language.name }}
        </vs-option>
      </vs-select>

      <div v-if="languageChanged">
        <vs-alert success class="text-xs mb-6">
          <template #icon>
            <i class="bx bx-world"></i>
          </template>
          {{ $t('Language settings updated successfully') }}
        </vs-alert>
      </div>

      <vs-button
        block
        type="submit"
        size="large"
        animation-type="vertical"
        @keyup.enter="updateLanguage"
      >
        <b>{{ $t('Update Language') }}</b>
        <template #animate>
          <i class="bx bx-world"></i>
        </template>
      </vs-button>
    </form>
  </div>
</template>

<script>
export default {
  layout: 'sidebars',
  computed: {
    languages() {
      return this.$i18n.locales
    },
  },
  data() {
    return {
      selected: 'en_EN',
      languageChanged: false,
      isDark: false,
    }
  },
  watch: {
    isDark(val) {
      if (val === true) {
        localStorage.setItem('mode', 'light')
        this.$vs.setTheme('light')
        this.$colorMode.preference = 'light'
      } else {
        localStorage.setItem('mode', 'dark')
        this.$vs.setTheme('dark')
        this.$colorMode.preference = 'dark'
      }
    },
  },
  mounted() {
    let lang = this.$i18n.getLocaleCookie()
    let locale = lang + '-' + lang.toUpperCase()
    this.selected = locale
    this.isDark = localStorage.getItem('mode') === 'light' ? true : false
  },
  methods: {
    async updateLanguage() {
      let lang = this.languages.find(
        (language) => language.iso === this.selected
      )
      this.$i18n.setLocale(lang.code)
      this.$i18n.setLocaleCookie(lang.code)
      this.languageChanged = true
    },
  },
}
</script>

<style></style>
