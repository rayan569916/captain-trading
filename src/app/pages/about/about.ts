import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMAGES } from '../../data/catalog';
import { COMPANY } from '../../data/company';
import { Icon, IconName } from '../../shared/icon';

@Component({
  selector: 'app-about',
  imports: [RouterLink, Icon],
  template: `
    <section class="pt-12 text-center sm:pt-16">
      <div class="container-x">
        <h1 class="display mx-auto max-w-[13ch] text-[clamp(44px,8vw,105px)]">We source it. We stock it. We deliver it.</h1>
        <p class="mx-auto mt-6 max-w-[50ch] text-[clamp(17px,1.6vw,20px)]">
          {{ company.name }} is the trading arm of {{ company.legal }}. We buy glass, hardware, building materials and tools directly from factories and sell them to contractors, fabricators and shops across Saudi Arabia.
        </p>
      </div>
      <div class="container-x mt-12">
        <img [src]="img.warehouseAisle" alt="Long aisle of warehouse racking stocked with pallets" class="h-[clamp(260px,40vw,500px)] w-full rounded-[28px] object-cover">
      </div>
    </section>

    <section class="container-x grid grid-cols-2 gap-8 py-14 text-center md:grid-cols-4">
      @for (s of company.stats; track s.label) {
        <div>
          <p class="text-[clamp(40px,5vw,61px)] font-black leading-none tracking-[-0.045em] text-forest tabular-nums">{{ s.value }}</p>
          <p class="mt-2 text-sm font-medium text-slate">{{ s.label }}</p>
        </div>
      }
    </section>

    <section class="bg-fog py-16 sm:py-24">
      <div class="container-x">
        <h2 class="mb-10 max-w-[20ch] text-[clamp(30px,3.8vw,45px)] font-bold leading-[1.1] tracking-[-0.02em]">How an order moves from factory to your site</h2>
        <ol class="grid gap-5 md:grid-cols-4">
          @for (s of steps; track s.title) {
            <li class="rounded-[28px] bg-paper p-6">
              <p class="mb-4 text-sm font-bold text-slate tabular-nums">Step {{ $index + 1 }}</p>
              <div class="icon-ring mb-4"><app-icon [name]="s.icon" /></div>
              <h3 class="mb-2 text-lg font-bold">{{ s.title }}</h3>
              <p class="text-[15px] text-slate">{{ s.text }}</p>
            </li>
          }
        </ol>
      </div>
    </section>

    <section class="container-x" id="trade">
      <div class="grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16">
        <img [src]="img.siteWorker" alt="Site engineer in a hard hat using a power tool" loading="lazy" class="aspect-[4/4.2] w-full rounded-[28px] object-cover">
        <div>
          <h2 class="mb-4 text-[clamp(32px,4.2vw,56px)] font-bold leading-[1.05] tracking-[-0.025em]">Trade accounts</h2>
          <p class="mb-6 max-w-[40ch] text-[17px]">For contractors and fabricators who buy every month. Apply with your CR and VAT certificate and get a decision within three working days.</p>
          <ul class="mb-7 grid gap-3">
            @for (p of tradePoints; track p) {
              <li class="flex items-center gap-3"><span class="grid size-6 place-items-center rounded-full bg-forest text-gold"><app-icon name="check" [size]="14" [stroke]="3" /></span>{{ p }}</li>
            }
          </ul>
          <a routerLink="/contact" class="btn btn-gold">Apply for an account</a>
        </div>
      </div>
    </section>

    <section class="container-x pb-16" id="white-label">
      <div class="grid items-center gap-10 rounded-[28px] bg-forest p-6 text-paper sm:p-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 class="display mb-5 text-[clamp(36px,5vw,64px)] text-gold">Your brand on the box</h2>
          <p class="mb-6 max-w-[42ch] text-[17px] text-[#dfe7d6]">We manufacture glue guns, sealants, glass hardware and tile adhesives with partner factories and pack them under your label, with your artwork, barcodes and Arabic–English packaging.</p>
          <div class="mb-7 flex flex-wrap gap-2">
            @for (t of ['MOQ from 1,000 units', 'Artwork support', 'SASO paperwork', 'Sea or air freight']; track t) {
              <span class="rounded-full bg-spruce px-3 py-1.5 text-[13px] font-semibold text-gold">{{ t }}</span>
            }
          </div>
          <a routerLink="/contact" class="btn btn-gold">Start a white-label project</a>
        </div>
        <img [src]="img.toolsTable" alt="Hand tools and supplies laid out on a work table" loading="lazy" class="aspect-[4/3.6] w-full rounded-[20px] object-cover">
      </div>
    </section>
  `,
})
export class About {
  protected readonly company = COMPANY;
  protected readonly img = IMAGES;
  protected readonly steps: { icon: IconName; title: string; text: string }[] = [
    { icon: 'factory', title: 'Sourced', text: 'Bought direct from audited factories in China, Turkey, the Gulf, India and Europe.' },
    { icon: 'shield', title: 'Checked', text: 'Every batch is inspected and arrives with test certificates and data sheets.' },
    { icon: 'box', title: 'Stocked', text: 'Held in our Riyadh warehouse, ready to pick, cut or pack the same day.' },
    { icon: 'truck', title: 'Delivered', text: 'Loaded onto Captain Cargo trucks and delivered to your site or shop.' },
  ];
  protected readonly tradePoints = ['30-day credit terms', 'Project and volume pricing', 'Dedicated account manager', 'Priority delivery slots'];
}
