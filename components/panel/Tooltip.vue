<template>
     <div @click.self="closeTooltip" v-if="showTooltip" class="  fixed top-0 left-0 w-[100vw] h-[100vh] z-[666]">
            
        </div>
       <div  class="inline-block relative">
       
                    <div v-if="showTooltip" class=" p-2 z-[667] absolute top-[-115px] left-0  h-[110px] min-w-[300px] w-fit bg-[#fff] border rounded-md border-[#5cade7] dark:bg-[#0F426B]"
                    >
                  
                      <div class="flex justify-between gap-2 mt-1">
                        <span>
                          {{ $t("table.headers.port") }} :
                          {{`${ tooltipData?.toolTipContent?.ip}:${ tooltipData?.toolTipContent?.port}` }}
                        </span>
                        <Button
                          @click="() => copyText(tooltipData?.toolTipContent?.port)"
                          class="w-[22px] h-[22px] p-[2px] mx-2 hover:bg-[--main-card-color] hover:border-[--main-card-color]"
                          v-tooltip="{
                            value: $t('global.copy'),
                            showDelay: 200,
                            hideDelay: 300,
                          }"
                        >
                          <img
                            class="w-[20px] h-[20px]"
                            src="../../assets/imgs/clipboard.svg"
                            alt=""
                          />
                        </Button>

   
                      </div>
                      <div class="flex justify-between gap-2 mt-1">
                        <span>
                          {{ $t("table.headers.username") }} :
                          {{ tooltipData?.toolTipContent?.username }}
                        </span>
                        <Button
                          @click="() => copyText(tooltipData?.toolTipContent?.username)"
                          class="w-[22px] h-[22px] p-[2px] mx-2 hover:bg-[--main-card-color] hover:border-[--main-card-color]"
                          v-tooltip="{
                            value: $t('global.copy'),
                            showDelay: 200,
                            hideDelay: 300,
                          }"
                        >
                          <img
                            class="w-[20px] h-[20px]"
                            src="../../assets/imgs/clipboard.svg"
                            alt=""
                          />
                        </Button>

   
                      </div>
                      <div class="flex justify-between gap-2 mt-1">
                        <span>
                          {{ $t("table.headers.password") }} :
                          {{ tooltipData?.toolTipContent?.password }}
                        </span>
                        <Button
                          @click="() => copyText(tooltipData?.toolTipContent?.password)"
                          class="w-[22px] h-[22px] p-[2px] mx-2 hover:bg-[--main-card-color] hover:border-[--main-card-color]"
                          v-tooltip="{
                            value: $t('global.copy'),
                            showDelay: 200,
                            hideDelay: 300,
                          }"
                        >
                          <img
                            class="w-[20px] h-[20px]"
                            src="../../assets/imgs/clipboard.svg"
                            alt=""
                          />
                        </Button>

   
                      </div>
        
                    </div>
                    <Button
                    @click="openTooltip"
                      class="w-[27px] h-[27px] p-[2px] mx-2 hover:bg-[--main-card-color] hover:border-[--main-card-color]"
                    >
          
                      <img
                        class="w-[30px] h-[30px]"
                        src="../../assets/imgs/white-tooltip.svg"
                        alt=""
                      />
                    </Button>
                  </div>
</template>

<script setup>
const props = defineProps({
    tooltipData:Object
})

const showTooltip = ref(false);

function openTooltip (){
    showTooltip.value =true;
}
function closeTooltip (){
    showTooltip.value =false;
}


function copyText(text) {
  navigator.clipboard.writeText(text);
}

</script>

<style>

</style>