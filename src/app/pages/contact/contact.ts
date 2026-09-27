import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMAGES } from '../../data/catalog';
import { COMPANY } from '../../data/company';
import { Icon, IconName } from '../../shared/icon';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, Icon],
  template: `
    <section class="bg-fog pb-12 pt-12 sm:pt-16">
      <div class="container-x">
        <h1 class="display text-[clamp(44px,8vw,105px)]">Talk to sales</h1>
        <p class="mt-4 max-w-[52ch] text-[17px]">Send a bill of quantities, a drawing or a simple question. A sales engineer replies within one working day.</p>
      </div>
    </section>

    <section class="container-x grid gap-10 py-12 lg:grid-cols-[1fr_1.2fr]">
      <div class="grid content-start gap-4">
        @for (c of channels; track c.label) {
          <div class="flex items-start gap-4 rounded-[28px] bg-paper p-5 shadow-[var(--shadow-ring)]">
            <span class="grid size-11 shrink-0 place-items-center rounded-full bg-gold text-forest"><app-icon [name]="c.icon" /></span>
            <div>
              <p class="text-sm font-semibold text-slate">{{ c.label }}</p>
              <p class="text-lg font-bold text-obsidian select-all tabular-nums">{{ c.value }}</p>
            </div>
          </div>
        }
        <img [src]="img.welding" alt="Worker welding steel reinforcement on a building site" loading="lazy" class="mt-2 aspect-[4/3] w-full rounded-[28px] object-cover">
      </div>

      @if (sent()) {
        <div class="h-fit rounded-[28px] bg-forest px-6 py-12 text-center text-paper sm:px-10">
          <div class="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-gold text-forest"><app-icon name="check" [size]="28" [stroke]="3" /></div>
          <h2 class="display mb-4 text-[clamp(32px,4.6vw,52px)] text-gold">Message sent</h2>
          <p class="mb-6 text-[#dfe7d6]">Thanks, {{ form.controls.name.value }}. This demo form doesn't deliver messages yet. Connect it to your inbox or CRM before launch.</p>
          <button type="button" class="btn btn-gold" (click)="reset()">Send another message</button>
        </div>
      } @else {
        <form [formGroup]="form" (ngSubmit)="submit()" novalidate class="h-fit rounded-[28px] bg-paper p-6 shadow-[var(--shadow-float)] sm:p-8">
          <div class="grid gap-4">
            <div>
              <p class="mb-2 text-sm font-semibold text-forest" id="topic-label">What do you need?</p>
              <div class="flex flex-wrap gap-2" role="radiogroup" aria-labelledby="topic-label">
                @for (t of topics; track t) {
                  <label class="cursor-pointer rounded-full bg-fog px-4 py-2 text-sm font-semibold text-charcoal has-[:checked]:bg-gold has-[:checked]:text-forest">
                    <input type="radio" class="sr-only" formControlName="topic" [value]="t">{{ t }}
                  </label>
                }
              </div>
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label for="c-name" class="mb-1 block text-sm font-semibold text-forest">Full name</label>
                <input id="c-name" class="input" formControlName="name" autocomplete="name">
                @if (invalid('name')) { <p class="mt-1 text-xs text-alarm">Enter your name.</p> }
              </div>
              <div>
                <label for="c-company" class="mb-1 block text-sm font-semibold text-forest">Company</label>
                <input id="c-company" class="input" formControlName="company" autocomplete="organization">
              </div>
              <div>
                <label for="c-phone" class="mb-1 block text-sm font-semibold text-forest">Mobile</label>
                <input id="c-phone" class="input" type="tel" formControlName="phone" autocomplete="tel" placeholder="+966 5X XXX XXXX">
                @if (invalid('phone')) { <p class="mt-1 text-xs text-alarm">Enter a phone number with at least 8 digits.</p> }
              </div>
              <div>
                <label for="c-email" class="mb-1 block text-sm font-semibold text-forest">Email</label>
                <input id="c-email" class="input" type="email" formControlName="email" autocomplete="email">
                @if (invalid('email')) { <p class="mt-1 text-xs text-alarm">Enter a valid email, like name&#64;company.com.</p> }
              </div>
            </div>
            <div>
              <label for="c-msg" class="mb-1 block text-sm font-semibold text-forest">Message</label>
              <textarea id="c-msg" class="input min-h-36" rows="5" formControlName="message"
                        placeholder="e.g. 220 m² of 10 mm clear tempered glass for a showroom in Jeddah, delivery in March"></textarea>
              @if (invalid('message')) { <p class="mt-1 text-xs text-alarm">Tell us briefly what you need.</p> }
            </div>
          </div>
          <button type="submit" class="btn btn-gold mt-6 w-full">Send message</button>
        </form>
      }
    </section>
  `,
})
export class Contact {
  protected readonly company = COMPANY;
  protected readonly img = IMAGES;
  protected readonly sent = signal(false);
  protected readonly topics = ['Price quote', 'Glass cutting', 'Trade account', 'White-label', 'Other'];

  protected readonly channels: { icon: IconName; label: string; value: string }[] = [
    { icon: 'phone', label: 'Sales line', value: COMPANY.phone },
    { icon: 'whatsapp', label: 'WhatsApp', value: COMPANY.whatsapp },
    { icon: 'mail', label: 'Email', value: COMPANY.email },
    { icon: 'pin', label: 'Warehouse & showroom', value: COMPANY.address },
    { icon: 'clock', label: 'Opening hours', value: COMPANY.hours },
  ];

  protected readonly form = inject(FormBuilder).nonNullable.group({
    topic: ['Price quote'],
    name: ['', Validators.required],
    company: [''],
    phone: ['', [Validators.required, Validators.pattern(/^[+0-9 ()-]{8,}$/)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  protected invalid(name: 'name' | 'phone' | 'email' | 'message'): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.sent.set(true);
  }

  protected reset(): void {
    this.form.reset();
    this.sent.set(false);
  }
}
