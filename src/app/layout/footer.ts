import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CATEGORIES } from '../data/catalog';
import { COMPANY } from '../data/company';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="bg-forest pt-16 pb-10 text-[15px] text-[#d9e2cf]">
      <div class="container-x">
        <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a routerLink="/" class="mb-4 flex items-center gap-2 no-underline">
              <img src="logo.png" alt="" width="40" height="40" class="size-10">
              <span class="text-[22px] font-black tracking-[-0.045em] text-gold">captain trading</span>
            </a>
            <p class="max-w-[34ch]">{{ company.tagline }} A {{ company.legal }} company.</p>
            <p class="mt-4 font-semibold text-paper tabular-nums select-all">{{ company.phone }}</p>
            <p class="select-all">{{ company.email }}</p>
          </div>
          <div>
            <h4 class="mb-3 text-sm font-bold text-gold">Products</h4>
            <ul class="grid gap-2">
              @for (c of categories; track c.slug) {
                <li><a routerLink="/products" [queryParams]="{ category: c.slug }" class="no-underline hover:underline">{{ c.name }}</a></li>
              }
            </ul>
          </div>
          <div>
            <h4 class="mb-3 text-sm font-bold text-gold">Buy</h4>
            <ul class="grid gap-2">
              <li><a routerLink="/quote" class="no-underline hover:underline">Quote list</a></li>
              <li><a routerLink="/contact" class="no-underline hover:underline">Request a quote</a></li>
              <li><a routerLink="/about" fragment="trade" class="no-underline hover:underline">Trade accounts</a></li>
              <li><a routerLink="/about" fragment="white-label" class="no-underline hover:underline">White-label sourcing</a></li>
            </ul>
          </div>
          <div>
            <h4 class="mb-3 text-sm font-bold text-gold">Company</h4>
            <ul class="grid gap-2">
              <li><a routerLink="/about" class="no-underline hover:underline">About us</a></li>
              <li><a routerLink="/contact" class="no-underline hover:underline">Contact</a></li>
              <li><a href="https://www.captaincargo.co" target="_blank" rel="noopener" class="no-underline hover:underline">Delivery by Captain Cargo</a></li>
            </ul>
          </div>
        </div>

        <p class="display mt-14 text-[clamp(52px,12vw,160px)] text-gold" aria-hidden="true">Captain Trading</p>

        <div class="mt-8 flex flex-wrap justify-between gap-3 border-t border-spruce pt-5 text-[13px] text-[#a9b99b]">
          <span>© {{ year }} {{ company.legal }} · {{ company.cr }} · {{ company.vat }}</span>
          <span>Prices exclude 15% VAT. Figures on this site are sample data.</span>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly company = COMPANY;
  protected readonly categories = CATEGORIES;
  protected readonly year = new Date().getFullYear();
}
