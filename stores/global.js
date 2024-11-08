import { defineStore } from 'pinia'
// import { localStorageBasicData, OWNERS, isTokenValid, locStorage, lowerString, ROUTESNAMES } from "@/helpers/tools";
// import requist from '../composables/requist'
// import { useRouter } from 'nuxt/app';



export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      loader: false,
      isAuth: false,
      user: {},
      token:"",
      socialMedia:{},
      footerDescription:{},
      mainDescription:{},

      isPopup: false,
      currentSection: true,
      afterConfirmationPopup:false,
      checker:true
    }
  },

  actions: {

    setMainData(payload){
      this.socialMedia = payload.socialMedia;
      this.footerDescription = payload.footerDescription;
      this.mainDescription = payload.mainDescription;
    },

    toggleChecker(payload){
      this.checker = payload;
    },
    openAfterConfirmationPopup(){
      this.afterConfirmationPopup = true
    },
    closeAfterConfirmationPopup(){
      this.afterConfirmationPopup = false
    },

    toggleCurrentSection(payload){
      this.currentSection = payload
    },
    turnLoaderOn() {
      this.loader = true;
    },
    turnLoaderOff() {
      this.loader = false;
    },
    updateAuth(payload) {

      this.user = payload.user;
      this.isAuth = payload.isAuth
      this.token = payload.token
    },
    updateUserInfo(payload){
      this.user = payload;

    },
    updateUserSpecificData(payload) {
      if (payload.name) {
        this.user.name = payload.name
      }
      if (payload.email) {
        this.user.email = payload.email
      }
      if (payload.country) {
        this.user.country = payload.country
      }
    },
    changePopupState(payload) {
      this.isPopup = payload
    }




  },
})