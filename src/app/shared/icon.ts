import { Component, input } from '@angular/core';

export type IconName =
  | 'arrow' | 'search' | 'truck' | 'factory' | 'badge' | 'phone' | 'mail' | 'pin' | 'clock'
  | 'check' | 'plus' | 'minus' | 'trash' | 'list' | 'menu' | 'close' | 'shield' | 'tag' | 'box' | 'whatsapp';

/** Small stroke icon set (24px grid). */
@Component({
  selector: 'app-icon',
  host: { class: 'inline-block shrink-0', 'aria-hidden': 'true' },
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         [attr.stroke-width]="stroke()" stroke-linecap="round" stroke-linejoin="round">
      @switch (name()) {
        @case ('arrow') { <svg:path d="M5 12h14m-6-6 6 6-6 6"/> }
        @case ('search') { <svg:circle cx="11" cy="11" r="7"/><svg:path d="m20 20-3.5-3.5"/> }
        @case ('truck') { <svg:path d="M2 6h11v10H2zM13 9h4l4 4v3h-8z"/><svg:circle cx="6" cy="17.5" r="1.8"/><svg:circle cx="17" cy="17.5" r="1.8"/> }
        @case ('factory') { <svg:path d="M3 21V10l5 3V10l5 3V6l8 4v11z"/><svg:path d="M7 17h2m4 0h2"/> }
        @case ('badge') { <svg:circle cx="12" cy="9" r="6"/><svg:path d="m9 14-1.5 7L12 19l4.5 2L15 14"/> }
        @case ('phone') { <svg:path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/> }
        @case ('mail') { <svg:rect x="3" y="5" width="18" height="14" rx="2"/><svg:path d="m3 7 9 6 9-6"/> }
        @case ('pin') { <svg:path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><svg:circle cx="12" cy="9" r="2.5"/> }
        @case ('clock') { <svg:circle cx="12" cy="12" r="8.5"/><svg:path d="M12 7v5l3 2"/> }
        @case ('check') { <svg:path d="m5 12 5 5 9-10"/> }
        @case ('plus') { <svg:path d="M12 5v14M5 12h14"/> }
        @case ('minus') { <svg:path d="M5 12h14"/> }
        @case ('trash') { <svg:path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/> }
        @case ('list') { <svg:path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/> }
        @case ('menu') { <svg:path d="M4 7h16M4 12h16M4 17h16"/> }
        @case ('close') { <svg:path d="M6 6l12 12M18 6 6 18"/> }
        @case ('shield') { <svg:path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><svg:path d="m8.5 12 2.5 2.5 4.5-5"/> }
        @case ('tag') { <svg:path d="M3 12V4h8l10 10-8 8z"/><svg:circle cx="7.5" cy="8.5" r="1.5"/> }
        @case ('box') { <svg:path d="m12 3 9 5v8l-9 5-9-5V8z"/><svg:path d="m3 8 9 5 9-5M12 13v8"/> }
        @case ('whatsapp') { <svg:path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><svg:path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2z"/> }
      }
    </svg>
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(20);
  readonly stroke = input(1.8);
}
