import { Component, computed, input } from '@angular/core';

export type StatIcon = 'snippets' | 'favorites' | 'conversations' | 'time' | 'files' | 'streak';

@Component({
  selector: 'app-profile-stat-card',
  standalone: true,
  imports: [],
  templateUrl: './profile-stat-card.html',
  styleUrl: './profile-stat-card.css'
})
export class ProfileStatCard {

  title = input.required<string>();
  value = input.required<number>();
  icon = input.required<StatIcon>();

  variant = input<'primary' | 'accent' | 'warning' | 'success' | 'neutral'>('neutral');

  /** Maps the icon keyword to its display label for a11y purposes */
  iconLabel = computed(() => this.icon());

}