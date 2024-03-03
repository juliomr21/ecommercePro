import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)  
  if(typeof localStorage !== 'undefined' && localStorage.getItem('token'))
    {
      router.navigateByUrl('');
      return false;
    }
      
  return true ;
};
