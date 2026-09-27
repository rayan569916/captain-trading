import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CATEGORIES, IMAGES, PRODUCTS, tiersFor, unitPriceFor } from '../../data/catalog';
import { COMPANY } from '../../data/company';
import { QuoteService } from '../../services/quote.service';
import { ProductCard } from '../../shared/product-card';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DecimalPipe, ProductCard, Icon],
  templateUrl: './home.html',
})
export class Home {
  private readonly router = inject(Router);
  protected readonly quote = inject(QuoteService);

  protected readonly img = IMAGES;
  protected readonly company = COMPANY;
  protected readonly categories = CATEGORIES;
  protected readonly featured = PRODUCTS.filter((p) => p.featured).slice(0, 6);
  protected readonly calcProducts = PRODUCTS.filter((p) => p.inStock);

  protected readonly categoryCount = (slug: string) => PRODUCTS.filter((p) => p.category === slug).length;

  // Hero search
  protected readonly search = signal('');
  protected submitSearch(event: Event): void {
    event.preventDefault();
    const q = this.search().trim();
    this.router.navigate(['/products'], { queryParams: q ? { q } : {} });
  }

  // Bulk price calculator
  protected readonly calcId = signal(this.calcProducts.find((p) => p.slug === 'opc-cement-50kg')?.id ?? this.calcProducts[0].id);
  protected readonly calcProduct = computed(() => this.calcProducts.find((p) => p.id === this.calcId())!);
  protected readonly calcQty = signal(1600);
  protected readonly calcSafeQty = computed(() => Math.max(this.calcProduct().moq, Math.round(this.calcQty() || 0)));
  protected readonly calcTiers = computed(() => tiersFor(this.calcProduct()));
  protected readonly calcUnit = computed(() => unitPriceFor(this.calcProduct(), this.calcSafeQty()));
  protected readonly calcTotal = computed(() => this.calcUnit() * this.calcSafeQty());
  protected readonly calcSaving = computed(() => (this.calcProduct().price - this.calcUnit()) * this.calcSafeQty());
  protected readonly calcAdded = signal(false);
  protected readonly belowMoq = computed(() => (this.calcQty() || 0) < this.calcProduct().moq);
  protected readonly calcActiveTier = computed(() => {
    const qty = this.calcSafeQty();
    let active = 0;
    this.calcTiers().forEach((t, i) => {
      if (qty >= t.minQty) active = i;
    });
    return active;
  });

  protected onCalcProduct(id: string): void {
    this.calcId.set(id);
    this.calcQty.set(this.calcProduct().moq * 4);
    this.calcAdded.set(false);
  }

  protected onCalcQty(value: string): void {
    this.calcQty.set(Number(value));
    this.calcAdded.set(false);
  }

  protected addCalcToQuote(): void {
    this.quote.add(this.calcProduct(), this.calcSafeQty());
    this.calcAdded.set(true);
  }
}
