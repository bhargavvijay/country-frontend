import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Countries } from '../../types';
import { HttpParams } from '@angular/common/http';

// Define an interface for parameters
export interface ExtendedPaginationParams {
  page: number;
  perPage: number;
  search?: string;
  region?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  getProducts(url: string, params: ExtendedPaginationParams): Observable<Countries> {
    // Construct HttpParams, filter out undefined values
    let httpParams = new HttpParams()
      .set('page', params.page.toString())
      .set('perPage', params.perPage.toString());

    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }
    if (params.region) {
      httpParams = httpParams.set('region', params.region);
    }

    return this.apiService.get(url, {
      params: httpParams,
      responseType: 'json'
    });
  }
}
