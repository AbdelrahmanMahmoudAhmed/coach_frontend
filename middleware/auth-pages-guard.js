
export default defineNuxtRouteMiddleware(async (to, from ) => {
    const role = useCookie('role' );


  if(process.server || process.client ){
    if( role.value && role.value !== ''){
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