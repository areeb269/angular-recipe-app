// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
// import { Recipes } from './recipes.model';
// import { Observable } from 'rxjs';
// import { DataStorageService } from '../shared/data-storage.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class RecipeResolverService implements Resolve<Recipes[]> {
//   constructor(private dsService: DataStorageService) { }

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipes[]> {
//     return this.dsService.fetchData();
//   }
// }