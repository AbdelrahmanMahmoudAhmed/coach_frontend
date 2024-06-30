<template>
  <div class="pb-14 px-4 pt-8">
    <h1
      class="text-center font-bold text-[18px] mb-6 sm:text-[26px] lg:text-[32px]"
    >
      {{ $t("admin.manage_website.title") }}
    </h1>
    <div
      class="p-6 mb-8 rounded-lg bg-[#2FA3F726] flex justify-between gap-2 items-center dark:bg-[--third-color] "
    >
<p class=" pt-2 font-bold text-[14px] mb-3 sm:text-[20px] lg:text-[22px]">{{ $t("admin.manage_website.clear_cashed_data") }}</p>

    <button  @click="()=>clearCacheFun()"         class="rounded-md px-6 font-[700] py-2 border border-[#6fb7eb] dark:bg-[--rows-color]  hover:bg-[#c6e3f7]  hover:dark:bg-[#3b74a3] lg:px-8"
>{{ $t("admin.manage_website.clear") }}</button>
  </div>
    <form class="" @submit.prevent="updateWebsiteSettings">
      <div
        class="p-6 mb-8 rounded-lg bg-[#2FA3F726] dark:bg-[--third-color]"
      >
        <h3 class="font-bold text-[14px] mb-3 sm:text-[20px] lg:text-[26px]">
          {{ $t("admin.manage_website.main_content") }}
        </h3>

        <div class="flex flex-col gap-4 justify-center flex-wrap xl:flex-row">
          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.main_title") }}</label
            >
            <input
              v-model="state.title.en"
              :placeholder="$t('admin.manage_website.main_title')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] h-[35px] xs:text-[14px] sm:h-[50px] sm:text-[16px]"
              type="text"
            />
          </div>

          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.main_title_ar") }}</label
            >
            <input
              v-model="state.title.ar"
              :placeholder="$t('admin.manage_website.main_title_ar')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] h-[35px] xs:text-[14px] sm:h-[50px] sm:text-[16px]"
              type="text"
            />
          </div>

          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.main_desc") }}</label
            >
            <textarea
              v-model="state.description.en"
              :placeholder="$t('admin.manage_website.main_desc')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] pt-2 mb-[5px] border border-[#B5C4C9] min-h-[90px] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] xs:text-[14px] sm:min-h-[120px] sm:pt-3 sm:text-[16px]"
              type="text"
            ></textarea>
          </div>

          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.main_desc_ar") }}</label
            >
            <textarea
              v-model="state.description.ar"
              :placeholder="$t('admin.manage_website.main_desc_ar')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] pt-2 mb-[5px] border border-[#B5C4C9] min-h-[90px] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] xs:text-[14px] sm:min-h-[120px] sm:pt-3 sm:text-[16px]"
              type="text"
            ></textarea>
          </div>

          <!-- <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.contact") }}</label
            >
            <textarea
              v-model="state.contactContent.en"
              :placeholder="$t('admin.manage_website.contact')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] pt-2 mb-[5px] border border-[#B5C4C9] min-h-[90px] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] xs:text-[14px] sm:min-h-[120px] sm:pt-3 sm:text-[16px]"
              type="text"
            ></textarea>
          </div> -->

          <!-- <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.contact_ar") }}</label
            >
            <textarea
              v-model="state.contactContent.ar"
              :placeholder="$t('admin.manage_website.contact_ar')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] pt-2 mb-[5px] border border-[#B5C4C9] min-h-[90px] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] xs:text-[14px] sm:min-h-[120px] sm:pt-3 sm:text-[16px]"
              type="text"
            ></textarea>
          </div> -->

          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.footer") }}</label
            >
            <textarea
              v-model="state.footer.en"
              :placeholder="$t('admin.manage_website.footer')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] pt-2 mb-[5px] border border-[#B5C4C9] min-h-[90px] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] xs:text-[14px] sm:min-h-[120px] sm:pt-3 sm:text-[16px]"
              type="text"
            ></textarea>
          </div>

          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.footer_ar") }}</label
            >
            <textarea
              v-model="state.footer.ar"
              :placeholder="$t('admin.manage_website.footer_ar')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] pt-2 mb-[5px] border border-[#B5C4C9] min-h-[90px] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] xs:text-[14px] sm:min-h-[120px] sm:pt-3 sm:text-[16px]"
              type="text"
            ></textarea>
          </div>

          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.email") }}</label
            >
            <input
              v-model="state.contactEmail"
              :placeholder="$t('admin.manage_website.email')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] h-[35px] xs:text-[14px] sm:h-[50px] sm:text-[16px]"
              type="text"
            />
          </div>

          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.phone_number") }}</label
            >
            <input
              @keyup="removeNonNumricValue"
              v-model="state.contactPhone"
              :placeholder="$t('admin.manage_website.phone_number')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] h-[35px] xs:text-[14px] sm:h-[50px] sm:text-[16px]"
              type="tele"
            />
          </div>

          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.percentage_profits") }}</label
            >
            <input
              @keyup="removeNonNumricValue"
              v-model="state.profits"
              :placeholder="$t('admin.manage_website.percentage_profits')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] h-[35px] xs:text-[14px] sm:h-[50px] sm:text-[16px]"
              type="number"
            />
          </div>
        </div>
      </div>

      <div
        class="p-6 mb-8 rounded-lg bg-[#2FA3F726] dark:bg-[--third-color]"
      >
        <h3 class="font-bold text-[14px] mb-3 sm:text-[20px] lg:text-[26px]">
          {{ $t("admin.manage_website.social_media") }}
        </h3>
        <div class="flex flex-col gap-4 justify-center flex-wrap xl:flex-row">
          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.discord") }}</label
            >
            <input
              v-model="state.socialMedia.discord"
              :placeholder="$t('admin.manage_website.discord')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] h-[35px] xs:text-[14px] sm:h-[50px] sm:text-[16px]"
              type="text"
            />
          </div>
          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.insta") }}</label
            >
            <input
              v-model="state.socialMedia.instagram"
              :placeholder="$t('admin.manage_website.insta')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] h-[35px] xs:text-[14px] sm:h-[50px] sm:text-[16px]"
              type="text"
            />
          </div>
          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.facebook") }}</label
            >
            <input
              v-model="state.socialMedia.facebook"
              :placeholder="$t('admin.manage_website.facebook')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] h-[35px] xs:text-[14px] sm:h-[50px] sm:text-[16px]"
              type="text"
            />
          </div>
          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.x") }}</label
            >
            <input
              v-model="state.socialMedia.twitter"
              :placeholder="$t('admin.manage_website.x')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] h-[35px] xs:text-[14px] sm:h-[50px] sm:text-[16px]"
              type="text"
            />
          </div>
        </div>
      </div>

      <div
        class="p-6 mb-8 rounded-lg bg-[#2FA3F726] dark:bg-[--third-color]"
      >
        <h3 class="font-bold text-[14px] mb-3 sm:text-[20px] lg:text-[26px]">
          {{ $t("admin.manage_website.static_pages") }}
        </h3>

        <div class="flex flex-col gap-4 justify-center flex-wrap xl:flex-row">
          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.about_us") }}</label
            >
            <textarea
              v-model="state.aboutUs.en"
              :placeholder="$t('admin.manage_website.about_us')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] pt-2 mb-[5px] border border-[#B5C4C9] min-h-[90px] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] xs:text-[14px] sm:min-h-[120px] sm:pt-3 sm:text-[16px]"
              type="text"
            ></textarea>
          </div>

          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.about_us_ar") }}</label
            >
            <textarea
              v-model="state.aboutUs.ar"
              :placeholder="$t('admin.manage_website.about_us_ar')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] pt-2 mb-[5px] border border-[#B5C4C9] min-h-[90px] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] xs:text-[14px] sm:min-h-[120px] sm:pt-3 sm:text-[16px]"
              type="text"
            ></textarea>
          </div>

          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.terms") }}</label
            >
            <textarea
              v-model="state.terms.en"
              :placeholder="$t('admin.manage_website.terms')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] pt-2 mb-[5px] border border-[#B5C4C9] min-h-[90px] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] xs:text-[14px] sm:min-h-[120px] sm:pt-3 sm:text-[16px]"
              type="text"
            ></textarea>
          </div>

          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.terms_ar") }}</label
            >
            <textarea
              v-model="state.terms.ar"
              :placeholder="$t('admin.manage_website.terms_ar')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] pt-2 mb-[5px] border border-[#B5C4C9] min-h-[90px] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] xs:text-[14px] sm:min-h-[120px] sm:pt-3 sm:text-[16px]"
              type="text"
            ></textarea>
          </div>

          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.policy") }}</label
            >
            <textarea
              v-model="state.privacyPolicy.en"
              :placeholder="$t('admin.manage_website.policy')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] pt-2 mb-[5px] border border-[#B5C4C9] min-h-[90px] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] xs:text-[14px] sm:min-h-[120px] sm:pt-3 sm:text-[16px]"
              type="text"
            ></textarea>
          </div>
          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.policy_ar") }}</label
            >
            <textarea
              v-model="state.privacyPolicy.ar"
              :placeholder="$t('admin.manage_website.policy_ar')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] pt-2 mb-[5px] border border-[#B5C4C9] min-h-[90px] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] xs:text-[14px] sm:min-h-[120px] sm:pt-3 sm:text-[16px]"
              type="text"
            ></textarea>
          </div>
        </div>
      </div>

      <div
        class="p-6 mb-8 rounded-lg bg-[#2FA3F726] dark:bg-[--third-color]"
      >
        <h3 class="font-bold text-[14px] mb-3 sm:text-[20px] lg:text-[26px]">
          {{ $t("admin.manage_website.settings") }}
        </h3>
        <div class="flex flex-col gap-4 justify-center flex-wrap xl:flex-row">
          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.telegramBotId") }}</label
            >
            <input
              v-model="state.telegramBotId"
              :placeholder="$t('admin.manage_website.telegramBotId')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] h-[35px] xs:text-[14px] sm:h-[50px] sm:text-[16px]"
              type="text"
            />
          </div>
          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.telegramChannelId") }}</label
            >
            <input
              v-model="state.telegramChannelId"
              :placeholder="$t('admin.manage_website.telegramChannelId')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] h-[35px] xs:text-[14px] sm:h-[50px] sm:text-[16px]"
              type="text"
            />
          </div>

          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.proxySellerDiscountCoupon") }}</label
            >
            <input
              v-model="state.proxySellerDiscountCoupon"
              :placeholder="
                $t('admin.manage_website.proxySellerDiscountCoupon')
              "
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] h-[35px] xs:text-[14px] sm:h-[50px] sm:text-[16px]"
              type="text"
            />
          </div>
          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.DigiProxyApiKey") }}</label
            >
            <input
              v-model="state.DigiProxyApiKey"
              :placeholder="$t('admin.manage_website.DigiProxyApiKey')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] h-[35px] xs:text-[14px] sm:h-[50px] sm:text-[16px]"
              type="text"
            />
          </div>
          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.proxySellerApiKey") }}</label
            >
            <input
              v-model="state.proxySellerApiKey"
              :placeholder="$t('admin.manage_website.proxySellerApiKey')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] h-[35px] xs:text-[14px] sm:h-[50px] sm:text-[16px]"
              type="text"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <button
          type="submit"
          class="bg-[--main-color] text-white font-bold px-10 py-2 rounded-md text-[16px] xs:text-[18px] sm:text-[22px]"
        >
          {{ $t("global.updateData") }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "panel",
  middleware: "admin-guard",
});

import useRequest from "~/composables/useRequest";
const { getAllSettings, setAllSettings ,clearCache} = useRequest();
const { locale, locales, setLocale, t } = useI18n();

const removeNonNumricValue = () => {
  state.contactPhone = state.contactPhone.replace(/\D/g, "");
  state.profits = state.profits.replace(/\D/g, "");
};


const clearCacheFun = ( ) => {
  clearCache().then((res)=>{
    console.log("res" , res);

  })
}
const state = reactive({
  aboutUs: {
    en: "",
    ar: "",
  },
  contactContent: {
    en: "",
    ar: "",
  },
  contactEmail: "",
  contactPhone: "",
  description: {
    en: "",
    ar: "",
  },
  footer: {
    en: "",
    ar: "",
  },
  privacyPolicy: {
    en: "",
    ar: "",
  },
  profits: 0,
  socialMedia: {
    facebook: "",
    twitter: "",
    instagram: "",
    discord: "",
  },
  terms: {
    en: "",
    ar: "",
  },
  title: {
    en: "",
    ar: "",
  },
  telegramBotId: "",
  telegramChannelId: "",
  proxySellerDiscountCoupon: "",
  DigiProxyApiKey: "",
  proxySellerApiKey: "",
});

const updateWebsiteSettings = () => {
  // const dataObj = JSON.parse(JSON.stringify(state))

  const objKeys = Object.keys(state);
  const data = [];

  objKeys.forEach((item) => {
    let obj = {};
    if (typeof state[item] == "object" && item != "socialMedia") {
      obj = {
        key: item,
        value: state[item]?.en,
        valueAr: state[item]?.ar,
      };
    } else if (typeof state[item] == "object" && item == "socialMedia") {
      obj = {
        key: "socialMedia",
        value: {
          facebook: state.socialMedia.facebook,
          twitter: state.socialMedia.twitter,
          instagram: state.socialMedia.instagram,
          discord: state.socialMedia.discord,
        },
      };
    } else {
      obj = {
        key: item,
        value: state[item],
      };
    }
    data.push(obj);
  });
  setAllSettings(data)
    .then((res) => {

    })
    .catch(console.error);
};

//hooks
onBeforeMount(() => {
  getAllSettings()
    .then((res) => {
      state.aboutUs.en = res?.data?.data?.aboutUs?.en;
      state.aboutUs.ar = res?.data?.data?.aboutUs?.ar;
      // state.contactContent.en = res?.data?.data?.contactContent?.en;
      // state.contactContent.ar = res?.data?.data?.contactContent?.ar;

      state.contactEmail = res?.data?.data?.contactEmail;
      state.contactPhone = res?.data?.data?.contactPhone;

      state.description.en = res?.data?.data?.description?.en;
      state.description.ar = res?.data?.data?.description?.ar;

      state.footer.en = res?.data?.data?.footer?.en;
      state.footer.ar = res?.data?.data?.footer?.ar;

      state.privacyPolicy.en = res?.data?.data?.privacyPolicy?.en;
      state.privacyPolicy.ar = res?.data?.data?.privacyPolicy?.ar;

      state.profits = res?.data?.data?.profits;

      state.socialMedia.facebook = res?.data?.data?.socialMedia?.facebook;
      state.socialMedia.twitter = res?.data?.data?.socialMedia?.twitter;
      state.socialMedia.instagram = res?.data?.data?.socialMedia?.instagram;
      state.socialMedia.discord = res?.data?.data?.socialMedia?.discord;

      state.terms.en = res?.data?.data?.terms?.en;
      state.terms.ar = res?.data?.data?.terms?.ar;

      state.title.en = res?.data?.data?.title?.en;
      state.title.ar = res?.data?.data?.title?.ar;
    })
    .catch(console.error);
});
</script>

<style>
</style>