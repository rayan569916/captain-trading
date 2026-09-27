import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { COMPANY } from '../../data/company';
import { QuoteService } from '../../services/quote.service';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-quote',
  imports: [RouterLink, DecimalPipe, ReactiveFormsModule, Icon],
  templateUrl: './quote.html',
})
export class Quote {
  protected readonly quote = inject(QuoteService);
  protected readonly company = COMPANY;
  protected readonly submitted = signal<string | null>(null);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', Validators.required],
    company: [''],
    phone: ['', [Validators.required, Validators.pattern(/^[+0-9 ()-]{8,}$/)]],
    email: ['', [Validators.required, Validators.email]],
    city: ['Riyadh', Validators.required],
    delivery: ['delivery'],
    notes: [''],
  });

  protected invalid(name: 'name' | 'phone' | 'email'): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  protected onQty(productId: string, value: string): void {
    this.quote.setQty(productId, Number(value));
  }

  protected submit(): void {
    if (this.form.invalid || this.quote.count() === 0) {
      this.form.markAllAsTouched();
      return;
    }
    // Dummy submission: connect this to your API or email service.
    const ref = 'RFQ-' + Math.floor(100000 + Math.random() * 900000);
    this.submitted.set(ref);
  }

  protected startOver(): void {
    this.quote.clear();
    this.form.reset();
    this.submitted.set(null);
  }
}
