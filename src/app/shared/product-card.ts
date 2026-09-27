import { Component, computed, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product, categoryBySlug } from '../data/catalog';
import { QuoteService } from '../services/quote.service';
import { Icon } from './icon';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, DecimalPipe, Icon],
  host: { class: 'block' },
  template: `
    <article class="group flex h-full flex-col overflow-hidden rounded-[28px] bg-paper shadow-[var(--shadow-ring)] transition hover:shadow-[var(--shadow-lift)]">
      <a [routerLink]="['/products', product().slug]" class="relative block aspect-[4/3] overflow-hidden bg-fog">
        <img [src]="product().image" [alt]="product().name" loading="lazy"
             class="size-full object-cover transition duration-500 group-hover:scale-[1.04]">
        <span class="absolute left-3 top-3 tag">{{ category()?.short }}</span>
        @if (!product().inStock) {
          <span class="absolute right-3 top-3 chip bg-paper">On order</span>
        }
      </a>
      <div class="flex flex-1 flex-col gap-2 p-5">
        <p class="text-xs font-medium text-pebble">{{ product().sku }} · {{ product().origin }}</p>
        <h3 class="text-lg font-bold leading-snug">
          <a [routerLink]="['/products', product().slug]" class="no-underline hover:underline">{{ product().name }}</a>
        </h3>
        <p class="line-clamp-2 text-[15px] text-slate">{{ product().summary }}</p>
        <div class="mt-auto flex items-end justify-between gap-3 pt-3">
          <div>
            <p class="text-2xl font-black tracking-[-0.04em] text-forest tabular-nums">
              SAR {{ product().price | number: '1.2-2' }}
            </p>
            <p class="text-xs text-slate">per {{ product().unit }} · MOQ {{ product().moq | number }}</p>
          </div>
          <button type="button" (click)="quote.add(product())"
                  class="btn btn-sm" [class.btn-gold]="!inQuote()" [class.btn-outline]="inQuote()"
                  [attr.aria-label]="(inQuote() ? 'Add more ' : 'Add ') + product().name + ' to quote'">
            <app-icon [name]="inQuote() ? 'check' : 'plus'" [size]="16" [stroke]="2.4" />
            {{ inQuote() ? 'Added' : 'Quote' }}
          </button>
        </div>
      </div>
    </article>
  `,
})
export class ProductCard {
  readonly product = input.required<Product>();
  protected readonly quote = inject(QuoteService);
  protected readonly category = computed(() => categoryBySlug(this.product().category));
  protected readonly inQuote = computed(() => this.quote.has(this.product().id));
}
