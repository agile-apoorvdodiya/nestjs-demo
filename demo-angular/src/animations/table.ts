import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";

export const fadeRow = [
  trigger('fadeRow', [
    state('void', style({ opacity: 0 })),
    transition(':enter', [
      animate('{{duration}} {{delay}}')
    ], {
      params: { delay: '0ms', duration: '100ms' }
    }),
  ])
]