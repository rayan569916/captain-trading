import { Component, computed, effect, inject, input, linkedSignal, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { PRODUCTS, categoryBySlug, productBySlug, tiersFor, unitPriceFor } from '../../data/catalog';
import { QuoteService } from '../../services/quote.service';
import { ProductCard } from '../../shared/product-card';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, DecimalPipe, ProductCard, Icon],
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  /** Route param :slug */
  readonly slug = input.required<string>();

  protected readonly quote = inject(QuoteService);
  private readonly title = inject(Title);

  protected readonly product = computed(() => productBySlug(this.slug()));
  protected readonly category = computed(() => categoryBySlug(this.product()?.category));
  protected readonly tiers = computed(() => (this.product() ? tiersFor(this.product()!) : []));
  protected readonly related = computed(() => {
    const p = this.product();
    return p ? PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3) : [];
  });

  protected readonly qty = linkedSignal(() => this.product()?.moq ?? 1);
  protected readonly safeQty = computed(() => Math.max(this.product()?.moq ?? 1, Math.round(this.qty() || 0)));
  protected readonly unitPrice = computed(() => (this.product() ? unitPriceFor(this.product()!, this.safeQty()) : 0));
  protected readonly lineTotal = computed(() => this.unitPrice() * this.safeQty());
  protected readonly activeTier = computed(() => {
    let active = 0;
    this.tiers().forEach((t, i) => {
      if (this.safeQty() >= t.minQty) active = i;
    });
    return active;
  });
  protected readonly added = signal(false);

  constructor() {
    effect(() => {
      const p = this.product();
      this.title.setTitle(p ? `${p.name} | Captain Trading` : 'Product not found | Captain Trading');
    });
  }

  protected step(direction: 1 | -1): void {
    const p = this.product();
    if (!p) return;
    const step = Math.max(1, Math.round(p.moq / 2));
    this.qty.set(Math.max(p.moq, this.safeQty() + direction * step));
    this.added.set(false);
  }

  protected onQty(value: string): void {
    this.qty.set(Number(value));
    this.added.set(false);
  }

  protected addToQuote(): void {
    const p = this.product();
    if (!p) return;
    this.quote.add(p, this.safeQty());
    this.added.set(true);
  }
}
