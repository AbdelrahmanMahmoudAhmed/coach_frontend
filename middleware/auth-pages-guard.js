
export default defineNuxtRouteMiddleware(async (to, from ) => {
    const type = useCookie('type' );


  if(process.server || process.client ){
    if( type.value && type.value !== ''){
        return navigateTo('/');
    }
  }
  // if(process.client){
  //   const user = localStorage.getItem('auth')

  //   if(user){
  //     return navigateTo('/');
  //   }
  // }
})