import { Component } from '@angular/core';

@Component({
  selector: 'sfeir-home',
  template: `
    <mat-card appearance="outlined">{{ name }}</mat-card>
  `,
  standalone: false
})
export class HomeComponent {
  name: string = 'This is my name';
}