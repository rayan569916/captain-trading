import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CATEGORIES, PRODUCTS, categoryBySlug } from '../../data/catalog';
import { ProductCard } from '../../shared/product-card';
import { Icon } from '../../shared/icon';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';

@Component({
  selector: 'app-products',
  imports: [RouterLink, ProductCard, Icon],
  templateUrl: './products.html',
})
export class Products {
  private readonly router = inject(Router);

  // Bound from query params (?category=glass&q=tempered&sort=price-asc&stock=1)
  readonly category = input<string>();
  readonly q = input<string>();
  readonly sort = input<string>();
  readonly stock = input<string>();

  protected readonly categories = CATEGORIES;
  protected readonly term = linkedSignal(() => this.q() ?? '');
  protected readonly activeCategory = computed(() => categoryBySlug(this.category()));
  protected readonly sortKey = computed<SortKey>(() => {
    const s = this.sort();
    return s === 'price-asc' || s === 'price-desc' || s === 'name' ? s : 'featured';
  });
  protected readonly inStockOnly = computed(() => this.stock() === '1');

  protected readonly countFor = (slug: string) => PRODUCTS.filter((p) => p.category === slug).length;
  protected readonly totalCount = PRODUCTS.length;

  protected readonly results = computed(() => {
    const cat = this.activeCategory()?.slug;
    const words = this.term().toLowerCase().split(/\s+/).filter(Boolean);
    let list = PRODUCTS.filter((p) => {
      if (cat && p.category !== cat) return false;
      if (this.inStockOnly() && !p.inStock) return false;
      if (!words.length) return true;
      const haystack = `${p.name} ${p.sku} ${p.summary} ${p.origin} ${categoryBySlug(p.category)?.name}`.toLowerCase();
      return words.every((w) => haystack.includes(w));
    });
    switch (this.sortKey()) {
      case 'price-asc': list = [...list].sort((a, b) => a.price - b.price); break;
      case 'price-desc': list = [...list].sort((a, b) => b.price - a.price); break;
      case 'name': list = [...list].sort((a, b) => a.name.localeCompare(b.name)); break;
      default: list = [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
    return list;
  });

  protected setParams(params: Record<string, string | null>): void {
    this.router.navigate([], { queryParams: params, queryParamsHandling: 'merge', replaceUrl: true });
  }

  protected onSearch(value: string): void {
    this.term.set(value);
    this.setParams({ q: value.trim() || null });
  }

  protected clearFilters(): void {
    this.term.set('');
    this.router.navigate([], { queryParams: {}, replaceUrl: true });
  }
}
