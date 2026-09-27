import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Captain Trading | Glass, construction materials and glue guns',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'products',
    title: 'Products | Captain Trading',
    loadComponent: () => import('./pages/products/products').then((m) => m.Products),
  },
  {
    path: 'products/:slug',
    title: 'Product | Captain Trading',
    loadComponent: () => import('./pages/product-detail/product-detail').then((m) => m.ProductDetail),
  },
  {
    path: 'quote',
    title: 'Your quote | Captain Trading',
    loadComponent: () => import('./pages/quote/quote').then((m) => m.Quote),
  },
  {
    path: 'about',
    title: 'About us | Captain Trading',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: 'contact',
    title: 'Contact | Captain Trading',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
  },
  { path: '**', redirectTo: '' },
];
