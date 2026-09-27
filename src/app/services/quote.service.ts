import { Injectable, computed, effect, signal } from '@angular/core';
import { PRODUCTS, Product, unitPriceFor } from '../data/catalog';

export interface QuoteLine {
  productId: string;
  qty: number;
}

export interface QuoteRow {
  product: Product;
  qty: number;
  unitPrice: number;
  lineTotal: number;
}

const STORAGE_KEY = 'captain-trading.quote';

function readStored(): QuoteLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as QuoteLine[]) : [];
    return Array.isArray(parsed) ? parsed.filter((l) => PRODUCTS.some((p) => p.id === l.productId)) : [];
  } catch {
    return [];
  }
}

/** The visitor's request-for-quote list. Kept in memory and mirrored to localStorage when available. */
@Injectable({ providedIn: 'root' })
export class QuoteService {
  private readonly lines = signal<QuoteLine[]>(readStored());

  readonly rows = computed<QuoteRow[]>(() =>
    this.lines()
      .map((l) => {
        const product = PRODUCTS.find((p) => p.id === l.productId)!;
        const unitPrice = unitPriceFor(product, l.qty);
        return { product, qty: l.qty, unitPrice, lineTotal: unitPrice * l.qty };
      })
  );

  readonly count = computed(() => this.lines().length);
  readonly subtotal = computed(() => this.rows().reduce((sum, r) => sum + r.lineTotal, 0));
  readonly vat = computed(() => this.subtotal() * 0.15);
  readonly total = computed(() => this.subtotal() + this.vat());

  constructor() {
    effect(() => {
      const value = JSON.stringify(this.lines());
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch {
        /* storage unavailable: keep the list in memory only */
      }
    });
  }

  has(productId: string): boolean {
    return this.lines().some((l) => l.productId === productId);
  }

  add(product: Product, qty = product.moq): void {
    const safeQty = Math.max(product.moq, Math.round(qty));
    this.lines.update((ls) =>
      ls.some((l) => l.productId === product.id)
        ? ls.map((l) => (l.productId === product.id ? { ...l, qty: l.qty + safeQty } : l))
        : [...ls, { productId: product.id, qty: safeQty }]
    );
  }

  setQty(productId: string, qty: number): void {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    const safeQty = Math.max(product.moq, Math.round(qty || 0));
    this.lines.update((ls) => ls.map((l) => (l.productId === productId ? { ...l, qty: safeQty } : l)));
  }

  remove(productId: string): void {
    this.lines.update((ls) => ls.filter((l) => l.productId !== productId));
  }

  clear(): void {
    this.lines.set([]);
  }
}
