<template>
    <div class="mb-[30px] lg:mb-[80px]">
      <div>
        <SectionTitle :title="`${$t('header.products')}`" :isColored="true" />
      </div>
      <div class="app-container pt-[25px] lg:pt-[40px]">
        <!-- class="grid grid-cols-1 gap-[10px] md:grid-cols-2 justify-center lg:grid-cols-3 2xl:gap-[23px] 2xl:grid-cols-4" -->
  
        <div class="flex gap-[10px] justify-center flex-wrap">
          <div
            v-for="(item, idx) in packages"
            :key="idx"
            class="flex flex-col bg-[--main-color-opacity] p-[20px] rounded-[20px] border-2 border-[--main-color] w-full dark:bg-[#00C2F729] md:min-w-[250px] md:max-w-[350px] lg:min-w-[250px] lg:max-w-[350px]"
          >
          <h5
              class="font-[800] uppercase text-center text-[18px] mb-[12px] md:text-[22px]"
            >
              {{ locale == "ar" ? item.titleAr : item.titleEn }}
            </h5>
            <div
              class="mx-auto mt-[11px] mb-[16px] rounded-xl bg-[--main-color] w-full aspect-square flex justify-center items-center overflow-hidden "
            >
              <img
                class="w-[90%] h-[90%] rounded-xl object-contain"
                :src="`${baseURL}${item?.image}`"
                alt=""
              />
            </div>

            <p
              v-html="
                locale == 'ar'
                  ? item?.descriptionAr?.replace(/(?:\r\n|\r|\n)/g, '<br>') || ''
                  : item?.descriptionEn?.replace(/(?:\r\n|\r|\n)/g, '<br>') || ''
              "
              :class="`${
                locale == 'ar' ? 'pr-[5px]' : 'pl-[5px]'
              } text-center text-[16px] mb-[7px] text-[#557A97] dark:text-[#A1AFBA] lg:text-start`"
            ></p>
            <div
              class="h-[1px] w-[90%] bg-[--main-color] rounded-xl mx-auto"
            ></div>
            <div class="my-6 p-[5px] h-[82px]">
              <div class="flex gap-6 items-center">
                <span class="font-[900] uppercase">{{ $t('global.price') }}</span>
                <span
                  :class="`${
                    item?.discountPercentage &&
                    item?.discountPercentage != '0' &&
                    'line-through'
                  }`"
                  >{{
                    locale == "ar" ? useArabicNums(item?.price) : item?.price
                  }}</span
                >
              </div>
              <div
                v-if="item.discountPercentage && item.discountPercentage != '0'"
                class="flex gap-6 items-center"
              >
                <span class="font-[900] uppercase">{{ $t('global.discountPercentage') }}</span>
                <span :class="``">
                  {{
                    locale == "ar"
                      ? useArabicNums(item?.discountPercentage)
                      : item?.discountPercentage
                  }}
                  %
                </span>
              </div>
              <div
                v-if="item?.discountPercentage && item?.discountPercentage != '0'"
                class="flex gap-6 items-center"
              >
                <span class="font-[900] uppercase">{{ $t('global.current_price') }}</span>
                <span :class="``"
                  >{{
                    locale == "ar"
                      ? useArabicNums(
                          +(item?.price -
                            (item.price * item?.discountPercentage) / 100).toFixed(2)
                        )
                      : (item?.price -
                        (item?.price * item?.discountPercentage) / 100).toFixed(2)
                  }}
                </span>
              </div>
            </div>
  
  <div class="mt-auto" >
    <div
              class="h-[1px] w-[90%] bg-[--main-color] rounded-xl mx-auto"
            ></div>
  
            <button class="text-center block m-auto mt-[16px] text-nowrap bg-[--main-color] text-white rounded-[23px] px-[27px] py-[8px] text-[18px] xs:text-[21px]">
                call to action 
            </button>
  </div>
          </div>
        </div>
      </div>
    </div>
  </template>
    
    <script setup>
  import useServerRequist from "~/composables/useServerRequist";
  import SectionTitle from "../home/SectionTitle.vue";
  import useDateAndNums from "~/composables/useDateAndNums";
  
  const { useArabicNums } = useDateAndNums();
  
  const { getAllProducts } = useServerRequist();
  const { data, error, pending } = await getAllProducts();
  const packages = data.value?.data;
  
  const config = useRuntimeConfig();
  const baseURL = config.public.base_url;
  
  const { locale, locales, setLocale } = useI18n();
  </script>
    
    <style>
  </style>
    
    
    