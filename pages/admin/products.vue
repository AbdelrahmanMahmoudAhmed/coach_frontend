<template>
  <div class="pb-10">
    <div v-if="popup">
<ManageProducts :currentProduct="currentProduct" :type="type" @closePopup="closePopup" @getProductData="getProductData" />
    </div>
    <div v-if="detailsPopup">
      <DisplayProductDetails page="product" :currentPackage="currentProduct" @closePopup="closeDetailsPopup" />
    </div>
    <div class="min-h-[60vh] overflow-x-auto">
      <DataTable
        :pagination="pagination"
        :dataFetched="dataFetched"
        :headers="headers"
        :rows="rows"
        page="manage-product"
        :withSearch=" true"
        :withAdd="global.user.allowEdit"
        :searchPlaceholder="$t(`admin.actions.search_product`)"
        :addButtonTitle="t(`admin.actions.add_product`)"
        @changeQuery="changeQuery"
        @openPopup="openPopup"
      >
        <template v-if=" global.user.allowEdit" #actions="{rowData}">
          
          <button
          v-if="global.user.allowEdit"
            @click="() => openPopup('edit', rowData?.currentItem)"
            class="panel-table-action"
          >
            {{ t(`table.headers.edit`) }}
          </button>

          <button
          v-if="global.user.allowDelete"
            @click="() => openPopup('delete', rowData?.currentItem)"
            class="panel-table-delete"
          >
            {{ $t(`table.headers.delete`) }}
          </button>
        </template>
        <template  #details="{rowData}">
          
          <button
          v-if="global.user"
            @click="() => openDetailsPopup(rowData?.currentItem)"
            class="panel-table-action"
          >
            {{ t(`table.headers.details`) }}
          </button>


        </template>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "panel",
  middleware: "admin-guard",
});

import DataTable from "~/components/panel/DataTable.vue";
import useRequest from "~/composables/useRequest";
import { useGlobalStore } from "~/stores/global";
import ManageProducts from "~/components/panel/popups/ManageProducts";
import DisplayProductDetails from "~/components/panel/popups/DisplayDetails.vue";

const query = reactive({
  page: 1,
  search: "",
});
const pagination = reactive({
  perPage: "",
  totalCount: "",
});
const type = ref("");
const detailsPopup = ref(false);
const global = useGlobalStore();
const { locale, locales, setLocale, t } = useI18n();
const currentProduct = ref("");
const popup = ref(false);
const { getAllProducts } = useRequest();
const headers = ref(["title_ar", "title_en","img" , "price", "details"]);
(global.user.allowDelete || global.user.allowEdit ) && (headers.value = ([...headers.value , "actions"  ]))
const rows = ref([]);
const dataFetched = ref(false);
const totalRecords = ref(100);

const closePopup = () => {
  popup.value = false;
  global.changePopupState(false);
};
const openPopup = (operationType, product) => {
  currentProduct.value = product;
  type.value = operationType;
  popup.value = true;
};
const openDetailsPopup = ( progPackage) => {
  currentProduct.value = progPackage;
  detailsPopup.value = true;
};
const closeDetailsPopup = ( ) => {
  detailsPopup.value = false;
};



const changeQuery = (type, val) => {
  const types = ["page", "search"];

  if (typeof type == "string" && types.includes(type)) query[type] = val;
};

const getProductData = async () => {
  dataFetched.value = false;

  try {
    const res = await getAllProducts(query);
    totalRecords.value = res.data?.data?.count;

    query.page = res.data.pagination?.currentPage;

    pagination.totalCount = res.data.pagination?.totalCount;
    pagination.perPage = res.data.pagination?.perPage;

    const allProducts = res.data?.data;
    const handeldAdmins = allProducts.map((item) => {
      return [
        {
          id: item?.id,
          item: item?.titleAr,
        },
        {
          id: item?.id,
          item: item?.titleEn,
        },
 
        {
          id: item?.id,
          item: item?.image,
          isImg: true,
        },
 
        {
          id: item?.id,
          item: item.price,
        },
        // {
        //   id: item?.id,
        //   item: `${item?.discountPercentage}%`,
        // },
        // {
        //   id: item?.id,
        //   item: item?.shippingPrice,
        // },
        {
          id: item?.id,
          item: null,
          isSlot: true,
          slotName:"details",
          currentItem: {
            id: item?.id,
            titleAr: item?.titleAr,
            titleEn: item?.titleEn,
            discountPercentage: item?.discountPercentage,
            image:item.image,
            price: item?.price,
            period: item?.period,
            descriptionAr: item?.descriptionAr,
            descriptionEn: item?.descriptionEn,
            PackageFeatures:item.PackageFeatures,
            shippingPrice:item.shippingPrice
          }
        },
        {
          id: item?.id,
          item: "action",
          actions: true,
          hideTd:global.user?.role == 'admin',
          currentItem: {
            id: item?.id,
            titleAr: item?.titleAr,
            titleEn: item?.titleEn,
            discountPercentage: item?.discountPercentage,
            image:item.image,
            price: item?.price,
            period: item?.period,
            descriptionAr: item?.descriptionAr,
            descriptionEn: item?.descriptionEn,
            PackageFeatures:item.PackageFeatures,
            shippingPrice:item.shippingPrice
            

          }
        },
      ];
    });
    rows.value = handeldAdmins;
  } catch (err) {
    console.error(err);
  } finally {
    dataFetched.value = true;
  }
};

// hooks
onBeforeMount(() => {
  getProductData();
});

watch(
  () => query.page,
  () => {
    getProductData(query);
  }
);
watch(
  () => query.search,
  () => {
    getProductData(query);
  }
);
</script>

<style></style>
