import { Component, OnInit } from '@angular/core';
import { ProductsService, ExtendedPaginationParams } from '../services/products.service';
import { Countries, Country } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Country[] = [];
  searchTerm = '';
  selectedRegion = '';
  currentPage = 0;
  perPage = 8;
  totalPages = 0;
  totalItems = 0;
  pages: number[] = [];
  selectedCountry: Country | null = null;  // To track the selected country
  message = ''; // Add a message property to show notifications

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    const params: ExtendedPaginationParams = {
      page: this.currentPage,
      perPage: this.perPage,
      search: this.searchTerm || '',
      region: this.selectedRegion || ''
    };

    this.productsService.getProducts('https://countries-sever.onrender.com', params).subscribe((response: Countries) => {
      if (response.countries.length === 0) {
        this.message = 'No such country found';
        this.products = [];
      } else {
        this.message = ''; // Clear the message if countries are found
        this.products = response.countries;
        this.totalItems = response.totalCountries || 0;
        this.totalPages = Math.ceil(this.totalItems / this.perPage);
        this.updatePageNumbers();
      }
    }, error => {
      console.error('Error loading products', error);
      this.message = 'No such country found';
    });
  }

  filterProducts() {
    this.currentPage = 0;
    this.loadProducts();
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }

  updatePageNumbers() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
  }

  selectCountry(country: Country) {
    this.selectedCountry = country;  // Save the selected country
  }

  goBack() {
    this.selectedCountry = null;  // Reset to show the list of countries again
  }
}
