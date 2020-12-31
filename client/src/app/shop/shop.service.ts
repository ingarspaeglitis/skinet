import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';

import { IPagination } from '../shared/models/pagination';
import { IType } from '../shared/models/productType';
import { IBrand } from '../shared/models/brand';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:44313/api/';

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {

    let httpParams: any = {};
    if (shopParams.brandId !== 0) {
      httpParams['brandId'] = shopParams.brandId;
    }

    if (shopParams.typeId !== 0) {
      httpParams['typeId'] = shopParams.typeId;
    }

    httpParams['sort'] = shopParams.sort; 
    httpParams['pageIndex'] = shopParams.pageNumber;
    httpParams['pageSize'] = shopParams.pageSize;

    return this.http.get<IPagination>(this.baseUrl + 'products', { observe: 'response', params: httpParams })    
      .pipe(
        map(response => {
          return response.body;
        })
      );     
  }

  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getProductTypes() {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
}
