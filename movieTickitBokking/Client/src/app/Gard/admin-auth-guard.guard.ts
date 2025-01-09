import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminAuthGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const addminLoggerdData = localStorage.getItem('adminToken')
  if (addminLoggerdData !== null) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
