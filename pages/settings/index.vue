<template>
  <div
    class="bg-white dark:bg-black col-span-12 md:col-span-8 min-h-screen overflow-auto"
  >
    <!-- Breadcrumb -->

    <div
      class="flex items-center py-3 px-5 border-b border-gray-200 dark:border-gray-700"
    >
      <vs-button
        active
        @click.prevent="$router.back()"
        size="small"
        transparent
      >
        <i class="bx bxs-chevron-left text-xl"></i>
      </vs-button>
      <div class="flex flex-col ml-9">
        <h5>Settings</h5>
        <span class="text-gray-400 text-sm mr-1">Update your preferences</span>
      </div>
    </div>

    <ul>
      <li
        class="flex justify-between hover:bg-purple-300 hover:bg-opacity-10 items-center p-5 border-b border-gray-200 dark:border-gray-700"
      >
        <n-link
          :to="'/settings/change-password'"
          class="flex flex-row items-center"
        >
          <i class="bx bxs-lock text-3xl"></i>
          <div class="flex flex-col ml-4">
            <h3>Change Password</h3>
            <span class="text-xs">Update your account password</span>
          </div>
        </n-link>
        <vs-button :to="'/settings/change-password'" icon flat
          ><i class="bx bxs-chevron-right"></i
        ></vs-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  layout: 'sidebars',
}
</script>

<style></style>
