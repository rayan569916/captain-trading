import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { QuoteService } from '../services/quote.service';
import { Icon } from '../shared/icon';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Icon],
  template: `
    <header class="sticky top-0 z-50 bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div class="container-x flex h-16 items-center gap-4">
        <a routerLink="/" class="flex items-center gap-2 text-forest no-underline" aria-label="Captain Trading home">
          <span class="grid size-10 place-items-center rounded-full bg-forest">
            <img src="logo.png" alt="" class="size-7" width="28" height="28">
          </span>
          <span class="text-[22px] font-black leading-none tracking-[-0.045em]">captain<span class="font-semibold text-slate"> trading</span></span>
        </a>

        <nav class="ml-4 hidden items-center gap-0.5 lg:flex" aria-label="Main">
          @for (item of nav; track item.label) {
            <a [routerLink]="item.link" [queryParams]="item.query ?? null"
               routerLinkActive="bg-fog" [routerLinkActiveOptions]="{ exact: true }"
               class="rounded-full px-3.5 py-2 text-sm font-semibold text-forest no-underline hover:bg-gold-soft">{{ item.label }}</a>
          }
        </nav>

        <div class="ml-auto flex items-center gap-1.5">
          <a routerLink="/contact" class="hidden rounded-full px-3 py-2 text-sm font-semibold text-forest no-underline hover:bg-gold-soft md:inline-flex">Help</a>
          <a routerLink="/quote" class="relative inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-forest no-underline hover:bg-gold-soft"
             [attr.aria-label]="'Quote list, ' + quote.count() + ' items'">
            <app-icon name="list" [size]="18" />
            <span class="hidden sm:inline">Quote list</span>
            @if (quote.count() > 0) {
              <span class="grid min-w-5 place-items-center rounded-full bg-forest px-1.5 text-[11px] font-bold leading-5 text-gold tabular-nums">{{ quote.count() }}</span>
            }
          </a>
          <a routerLink="/contact" class="btn btn-gold btn-sm hidden sm:inline-flex">Get a quote</a>
          <button type="button" class="grid size-10 place-items-center rounded-full text-forest hover:bg-gold-soft lg:hidden"
                  (click)="open.set(!open())" [attr.aria-expanded]="open()" aria-controls="mobile-nav"
                  [attr.aria-label]="open() ? 'Close menu' : 'Open menu'">
            <app-icon [name]="open() ? 'close' : 'menu'" />
          </button>
        </div>
      </div>

      @if (open()) {
        <nav id="mobile-nav" class="border-t border-fog bg-paper lg:hidden" aria-label="Mobile">
          <div class="container-x flex flex-col gap-1 py-4">
            @for (item of nav; track item.label) {
              <a [routerLink]="item.link" [queryParams]="item.query ?? null"
                 class="rounded-[10px] px-3 py-3 text-base font-semibold text-forest no-underline hover:bg-gold-soft">{{ item.label }}</a>
            }
            <a routerLink="/contact" class="btn btn-gold mt-2">Get a quote</a>
          </div>
        </nav>
      }
    </header>
  `,
})
export class Header {
  protected readonly quote = inject(QuoteService);
  protected readonly open = signal(false);

  protected readonly nav: { label: string; link: string; query?: Record<string, string> }[] = [
    { label: 'All products', link: '/products' },
    { label: 'Glass', link: '/products', query: { category: 'glass' } },
    { label: 'Construction', link: '/products', query: { category: 'construction' } },
    { label: 'Glue guns', link: '/products', query: { category: 'adhesives' } },
    { label: 'About', link: '/about' },
  ];

  constructor() {
    inject(Router)
      .events.pipe(filter((e) => e instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => this.open.set(false));
  }
}
