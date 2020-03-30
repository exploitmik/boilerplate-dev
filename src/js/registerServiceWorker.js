export default function registerServiceWorker(){

  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {

    window.addEventListener('DOMContentLoaded', () => { 
      navigator.serviceWorker.register('/sw.js').then(registration => {
      }).catch(registrationError => {
      });
    });

  }else{

    if ( 'serviceWorker' in navigator ){
      window.addEventListener('DOMContentLoaded', () => {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
          for(let registration of registrations) {
            registration.unregister()
          }
        });
      });
    }
    
  }

}