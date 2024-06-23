export default defineNuxtRouteMiddleware(async (to, from ) => {
    const type = useCookie('type' );


  if(process.server || process.client){
    if( type.value && type.value == 'client'){
        return navigateTo('/user');
    }else if(!type.value || type.value != 'admin'){
        return navigateTo('/admin/login');
    }
  }
  // if(process.client){
    
  //   const user = localStorage.getItem('auth')

  //   if(user){
  //   const pareUser = JSON.parse(user)

  //       if(pareUser?.type == 'user'){
  //           return navigateTo('/user');

  //       }else if(pareUser?.type != 'admin'){
  //           return navigateTo('/admin/login');
  //       }
  //   }else{
  //     return navigateTo('/admin/login');
  //   }
  // }
})