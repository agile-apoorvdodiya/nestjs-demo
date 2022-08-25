import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";

export const fadeRow = [
  trigger('fadeRow', [
    transition('void => *', [
      style({ opacity: 0 }),
      animate(`500ms {{index}}ms`, style({ opacity: 1 }))
    ], { params: { index: 1000 } })
  ])
]