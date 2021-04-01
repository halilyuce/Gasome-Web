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
      <ul
        class="divide-y divide-gray-100 dark:divide-gray-600 dark:divide-opacity-20 divide-solid mt-2 border-t border-gray-100 dark:border-gray-600 dark:border-opacity-20"
      >
        <li class="pt-5 px-5 pb-2">
          <div class="flex flex-row">
            <div class="user">
              <vs-avatar size="50">
                <img src="~assets/img/avatar.jpeg" alt="Avatar" />
              </vs-avatar>
            </div>
            <div class="ml-4 w-full">
              <div class="flex justify-between">
                <div class="flex flex-row items-center">
                  <h4 class="">Halil</h4>
                  <span class="text-gray-400 ml-2">@halil</span>
                </div>
                <span class="text-gray-500 text-sm">1 Nis</span>
              </div>
              <div>
                <p>Thanks Edward! We're glad you like it :)</p>
                <div
                  class="flex flex-col border rounded-xl px-3 py-2 border-gray-300 dark:border-gray-700 mt-1"
                >
                  <div class="flex justify-between">
                    <div class="flex flex-row items-center">
                      <vs-avatar size="20">
                        <img
                          src="https://vuesax.com/avatars/avatar-8.png"
                          alt="Avatar"
                        />
                      </vs-avatar>
                      <h4 class="ml-2">Edward</h4>
                      <span class="text-gray-400 ml-2">@cyberward</span>
                    </div>
                    <span class="text-gray-500 text-sm">27 Mar</span>
                  </div>

                  <p>
                    Great website! Congratulations guys :) The UI is really cool
                    as it should be. I'll write if anything comes to my mind to
                    make it better!
                  </p>
                </div>
              </div>
              <div class="flex justify-between mt-2 text-gray-500">
                <div class="flex items-center">
                  <i class="bx bx-message-square-detail text-lg mr-3"></i>
                  4
                </div>
                <div class="flex items-center">
                  <i class="bx bxs-zap text-lg mr-3"></i>0
                </div>
                <div class="flex items-center">
                  <i class="bx bx-star text-lg mr-3"></i>71
                </div>
                <div class="flex items-center">
                  <i class="bx bx-share-alt text-lg"></i>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="pt-5 px-5 pb-2">
          <div class="flex flex-row items-center text-gray-400 ml-10 mb-1">
            <i class="bx bxs-zap mr-1"></i>
            <span>Halil Yüce Boosted</span>
          </div>
          <div class="flex flex-row">
            <div class="user">
              <vs-avatar size="50">
                <img
                  src="https://vuesax.com/avatars/avatar-3.png"
                  alt="Avatar"
                />
              </vs-avatar>
            </div>
            <div class="ml-4 w-full">
              <div class="flex justify-between">
                <div class="flex flex-row items-center">
                  <h4 class="">Chen</h4>
                  <span class="text-gray-400 ml-2">@excalibur</span>
                </div>
                <span class="text-gray-500 text-sm">31 Mar</span>
              </div>
              <div>
                <p>
                  Is there anyone who knows when
                  <a href="#" class="text-purple-500">#GasomeEvent2021</a> is
                  gonna start?
                </p>
              </div>
              <div class="flex justify-between mt-2 text-gray-500">
                <div class="flex items-center">
                  <i class="bx bx-message-square-detail text-lg mr-3"></i>
                  0
                </div>
                <div class="flex items-center text-purple-500">
                  <i class="bx bxs-zap text-lg mr-3"></i>1
                </div>
                <div class="flex items-center text-yellow-500">
                  <i class="bx bxs-star text-lg mr-3"></i>4
                </div>
                <div class="flex items-center">
                  <i class="bx bx-share-alt text-lg"></i>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="pt-5 px-5 pb-2">
          <div class="flex flex-row">
            <div class="user">
              <vs-avatar size="50">
                <img
                  src="https://vuesax.com/avatars/avatar-2.png"
                  alt="Avatar"
                />
              </vs-avatar>
            </div>
            <div class="ml-4 w-full">
              <div class="flex justify-between">
                <div class="flex flex-row items-center">
                  <h4 class="">Angelina</h4>
                  <span class="text-gray-400 ml-2">@angel</span>
                </div>
                <span class="text-gray-500 text-sm">29 Mar</span>
              </div>
              <div>
                <p>New Cyberpunk 2077 update is not bad ha?</p>
              </div>
              <div class="flex justify-between mt-2 text-gray-500">
                <div class="flex items-center">
                  <i class="bx bx-message-square-detail text-lg mr-3"></i>
                  1
                </div>
                <div class="flex items-center">
                  <i class="bx bxs-zap text-lg mr-3"></i>2
                </div>
                <div class="flex items-center">
                  <i class="bx bx-star text-lg mr-3"></i>47
                </div>
                <div class="flex items-center">
                  <i class="bx bx-share-alt text-lg"></i>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="pt-5 px-5 pb-2">
          <div class="flex flex-row">
            <div class="user">
              <vs-avatar size="50">
                <img
                  src="https://vuesax.com/avatars/avatar-5.png"
                  alt="Avatar"
                />
              </vs-avatar>
            </div>
            <div class="ml-4 w-full">
              <div class="flex justify-between">
                <div class="flex flex-row items-center">
                  <h4 class="">Esila Su</h4>
                  <span class="text-gray-400 ml-2">@esila</span>
                </div>
                <span class="text-gray-500 text-sm">29 Mar</span>
              </div>
              <div>
                <p>Korona bitiyor galiba, Vice City'deki doktorlar gelmiş</p>
                <img
                  src="https://pbs.twimg.com/media/Ew_o4ngXIAAC3md?format=jpg&name=small"
                  class="mt-3 rounded-xl"
                  alt=""
                />
              </div>
              <div class="flex justify-between mt-3 text-gray-500">
                <div class="flex items-center">
                  <i class="bx bx-message-square-detail text-lg mr-3"></i>
                  2
                </div>
                <div class="flex items-center">
                  <i class="bx bxs-zap text-lg mr-3"></i>0
                </div>
                <div class="flex items-center text-yellow-500">
                  <i class="bx bxs-star text-lg mr-3"></i>25
                </div>
                <div class="flex items-center">
                  <i class="bx bx-share-alt text-lg"></i>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="pt-5 px-5 pb-2">
          <div class="flex flex-row">
            <div class="user">
              <vs-avatar size="50">
                <img
                  src="https://vuesax.com/avatars/avatar-8.png"
                  alt="Avatar"
                />
              </vs-avatar>
            </div>
            <div class="ml-4 w-full">
              <div class="flex justify-between">
                <div class="flex flex-row items-center">
                  <h4 class="">Edward</h4>
                  <span class="text-gray-400 ml-2">@cyberward</span>
                </div>
                <span class="text-gray-500 text-sm">27 Mar</span>
              </div>
              <div>
                <p>
                  Great website! Congratulations guys :) The UI is really cool
                  as it should be. I'll write if anything comes to my mind to
                  make it better!
                </p>
              </div>
              <div class="flex justify-between mt-2 text-gray-500">
                <div class="flex items-center">
                  <i class="bx bx-message-square-detail text-lg mr-3"></i>
                  1
                </div>
                <div class="flex items-center">
                  <i class="bx bxs-zap text-lg mr-3"></i>0
                </div>
                <div class="flex items-center">
                  <i class="bx bx-star text-lg mr-3"></i>7
                </div>
                <div class="flex items-center">
                  <i class="bx bx-share-alt text-lg"></i>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="pt-5 px-5 pb-2">
          <div class="flex flex-row">
            <div class="user">
              <vs-avatar size="50">
                <img src="~assets/img/avatar.jpeg" alt="Avatar" />
              </vs-avatar>
            </div>
            <div class="ml-4 w-full">
              <div class="flex justify-between">
                <div class="flex flex-row items-center">
                  <h4 class="">Halil Yüce</h4>
                  <span class="text-gray-400 ml-2">@halil</span>
                </div>
                <span class="text-gray-500 text-sm">30 Mar</span>
              </div>
              <div>
                <p>New Update is available!</p>
                <p class="my-2">
                  Download & Update on Store:
                  <a href="#" class="text-purple-500"
                    >http://onelink.to/5wumgq</a
                  >
                </p>
                <ul>
                  <li>- Social Media Features Added</li>
                  <li>- New Profile Designs</li>
                  <li>- UI Updates</li>
                  <li>- Bug Fixes & Performance Updates</li>
                </ul>
                <img
                  src="https://pbs.twimg.com/media/Ewd0TpEXEAE8Ohg?format=jpg&name=4096x4096"
                  class="rounded-xl mt-3"
                  alt=""
                />
              </div>
              <div class="flex justify-between mt-3 text-gray-500">
                <div class="flex items-center">
                  <i class="bx bx-message-square-detail text-lg mr-3"></i>
                  0
                </div>
                <div class="flex items-center text-purple-500">
                  <i class="bx bxs-zap text-lg mr-3"></i>12
                </div>
                <div class="flex items-center">
                  <i class="bx bx-star text-lg mr-3"></i>138
                </div>
                <div class="flex items-center">
                  <i class="bx bx-share-alt text-lg"></i>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'sidebars',
  data() {
    return {
      search: '',
    }
  },
}
</script>
