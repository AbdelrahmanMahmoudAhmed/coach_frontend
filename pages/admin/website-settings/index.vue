<template>
  <div class="pb-14 px-4 pt-8">
    <h1
      class="text-center font-bold text-[18px] mb-6 sm:text-[26px] lg:text-[32px]"
    >
      {{ $t("admin.manage_website.title") }}
    </h1>

    <form class="" @submit.prevent="updateWebsiteSettings">
      <div class="p-6 mb-8 rounded-lg bg-[#2FA3F726] dark:bg-[--third-color]">
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
              v-model="state.mainTitleEn"
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
              v-model="state.mainTitleAr"
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
              v-model="state.mainDescEn"
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
              v-model="state.mainDescAr"
              :placeholder="$t('admin.manage_website.main_desc_ar')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] pt-2 mb-[5px] border border-[#B5C4C9] min-h-[90px] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] xs:text-[14px] sm:min-h-[120px] sm:pt-3 sm:text-[16px]"
              type="text"
            ></textarea>
          </div>

          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.footer") }}</label
            >
            <textarea
              v-model="state.footerDescEn"
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
              v-model="state.footerDescAr"
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
              v-model="state.email"
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
              v-model="state.phone"
              :placeholder="$t('admin.manage_website.phone_number')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] h-[35px] xs:text-[14px] sm:h-[50px] sm:text-[16px]"
              type="tele"
            />
          </div>
        </div>
      </div>

      <div class="p-6 mb-8 rounded-lg bg-[#2FA3F726] dark:bg-[--third-color]">
        <h3 class="font-bold text-[14px] mb-3 sm:text-[20px] lg:text-[26px]">
          {{ $t("admin.manage_website.social_media") }}
        </h3>
        <div class="flex flex-col gap-4 justify-center flex-wrap xl:flex-row">
          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.youtube") }}</label
            >
            <input
              v-model="state.youtube"
              :placeholder="$t('admin.manage_website.youtube')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] h-[35px] xs:text-[14px] sm:h-[50px] sm:text-[16px]"
              type="text"
            />
          </div>
          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.tiktok") }}</label
            >
            <input
              v-model="state.tiktok"
              :placeholder="$t('admin.manage_website.tiktok')"
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
              v-model="state.instagram"
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
              v-model="state.facebook"
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
              v-model="state.x"
              :placeholder="$t('admin.manage_website.x')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] mb-[5px] border border-[#B5C4C9] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] h-[35px] xs:text-[14px] sm:h-[50px] sm:text-[16px]"
              type="text"
            />
          </div>
        </div>
      </div>

      <div class="p-6 mb-8 rounded-lg bg-[#2FA3F726] dark:bg-[--third-color]">
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
              v-model="state.aboutEn"
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
              v-model="state.aboutAr"
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
              v-model="state.termsEn"
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
              v-model="state.termsAr"
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
              v-model="state.policyEn"
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
              v-model="state.policyAr"
              :placeholder="$t('admin.manage_website.policy_ar')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] pt-2 mb-[5px] border border-[#B5C4C9] min-h-[90px] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] xs:text-[14px] sm:min-h-[120px] sm:pt-3 sm:text-[16px]"
              type="text"
            ></textarea>
          </div>

          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.contact") }}</label
            >
            <textarea
              v-model="state.contactContentEn"
              :placeholder="$t('admin.manage_website.contact')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] pt-2 mb-[5px] border border-[#B5C4C9] min-h-[90px] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] xs:text-[14px] sm:min-h-[120px] sm:pt-3 sm:text-[16px]"
              type="text"
            ></textarea>
          </div>
          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.contact_ar") }}</label
            >
            <textarea
              v-model="state.contactContentAr"
              :placeholder="$t('admin.manage_website.contact_ar')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] pt-2 mb-[5px] border border-[#B5C4C9] min-h-[90px] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] xs:text-[14px] sm:min-h-[120px] sm:pt-3 sm:text-[16px]"
              type="text"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="p-6 mb-8 rounded-lg bg-[#2FA3F726] dark:bg-[--third-color]">
        <h3 class="font-bold text-[14px] mb-3 sm:text-[20px] lg:text-[26px]">
          {{ $t("admin.manage_website.seo") }}
        </h3>
        <div class="flex flex-col gap-4 justify-center flex-wrap xl:flex-row">


          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.keywords_lable") }}</label
            >
            <textarea
              v-model="state.keywords"
              :placeholder="$t('admin.manage_website.keywords')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] pt-2 mb-[5px] border border-[#B5C4C9] min-h-[90px] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] xs:text-[14px] sm:min-h-[120px] sm:pt-3 sm:text-[16px]"
              type="text"
            ></textarea>
          </div>
          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.description") }}</label
            >
            <textarea
              v-model="state.description"
              :placeholder="$t('admin.manage_website.description')"
              class="text-[12px] outline-0 w-full bg-[#FFFFFF61] text-[#000000] flex items-center rounded-[46px] px-[25px] pt-2 mb-[5px] border border-[#B5C4C9] min-h-[90px] dark:border-transparent placeholder:text-[#94a3b8] focus:border-[--main-color] focus:dark:border-[--main-color] placeholder:dark:text-[#ffffff82] dark:bg-[#1a3145] dark:text-[#fff] xs:text-[14px] sm:min-h-[120px] sm:pt-3 sm:text-[16px]"
              type="text"
            ></textarea>
          </div>
          <div class="w-full xl:w-[49%]">
            <label
              class="font-bold pb-1 block text-[12px] xs:text-[14px] sm:pb-2 sm:text-[16px]"
              for=""
            >
              {{ $t("admin.manage_website.titleSEO") }}</label
            >
            <input
              v-model="state.title"
              :placeholder="$t('admin.manage_website.titleSEO')"
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
import showToast from "~/composables/useToast";

const { getAllSettings, setAllSettings } = useRequest();
const { locale, locales, setLocale, t } = useI18n();

const removeNonNumricValue = () => {
  state.phone = state.phone.replace(/\D/g, "");
};

const state = reactive({
  aboutEn: "",
  aboutAr: "",
  policyEn: "",
  policyAr: "",
  termsEn: "",
  termsAr: "",
  contactContentAr: "",
  contactContentEn: "",
  mainTitleEn: "",
  mainTitleAr: "",
  mainDescEn: "",
  mainDescAr: "",
  footerDescEn: "",
  footerDescAr: "",
  email: "",
  phone: "",
  title: "",
  description: "",
  keywords: "",
  facebook: "",
  x: "",
  instagram: "",
  youtube: "",
  tiktok: "",


});

const updateWebsiteSettings = async() => {


  try{
    const res = await setAllSettings(state);
    console.log('res.success' , res.data)

   if(res.data?.success) showToast({ message: t("toast.update_website_data") });

  }catch(err){
    console.error(err)
  //  showToast({ type: "error", message: "err" });  
  }
 

}



//hooks
onBeforeMount(()=>{
  getAllSettings().then((res)=>{
    console.log(res.data)
    state.aboutEn = res.data?.data?.pages?.aboutEn
    state.aboutAr = res.data?.data?.pages?.aboutAr
    state.policyEn = res.data?.data?.pages?.policyEn
    state.policyAr = res.data?.data?.pages?.policyAr
    state.termsEn = res.data?.data?.pages?.termsEn
    state.termsAr = res.data?.data?.pages?.termsAr
    state.contactContentAr = res.data?.data?.pages?.contactContentAr
    state.contactContentEn = res.data?.data?.pages?.contactContentEn
    state.mainTitleEn = res.data?.data?.desc?.mainTitleEn
    state.mainTitleAr = res.data?.data?.desc?.mainTitleAr
    state.mainDescEn = res.data?.data?.desc?.mainDescEn
    state.mainDescAr = res.data?.data?.desc?.mainDescAr
    state.footerDescEn = res.data?.data?.desc?.footerDescEn
    state.footerDescAr = res.data?.data?.desc?.footerDescAr
    state.email = res.data?.data?.desc?.email
    state.phone = res.data?.data?.desc?.phone
    state.title = res.data?.data?.seo?.title
    state.description = res.data?.data?.seo?.description
    state.keywords = res.data?.data?.seo?.keywords
    state.facebook = res.data?.data?.socialMedia?.facebook
    state.x = res.data?.data?.socialMedia?.x
    state.instagram = res.data?.data?.socialMedia?.instagram
    state.youtube = res.data?.data?.socialMedia?.youtube
    state.tiktok = res.data?.data?.socialMedia?.tiktok
    state.tiktok = res.data?.data?.socialMedia?.tiktok
    
  })
})


</script>

<style>
</style>