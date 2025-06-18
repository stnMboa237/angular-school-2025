import { ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { inject } from '@angular/core';

// si l'id contenu dans la route ne respecte pas le pattern de la regex, alors, on redirige l'user vers la route 'home'
export function UpdatePeopleGuard(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const id = route.paramMap.get('id') ?? '';
    const isValidId = /^[a-z0-9]{24}$/.test(id);
    return isValidId ? true : inject(Router).createUrlTree(['home']);
}
