import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from 'express';

export const userAuthGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
    const userLoggerdData = localStorage.getItem('userToken')
    if (userLoggerdData !== null) {
      return true;
    }
    router.navigate(['/login']);
    return false;
};
