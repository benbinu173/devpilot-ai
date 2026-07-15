import { Component, input } from '@angular/core';

@Component({
  selector: 'app-welcome-banner',
  standalone: true,
  imports: [],
  templateUrl: './welcome-banner.html',
  styleUrl: './welcome-banner.css'
})
export class WelcomeBanner {

  title = input('Good Morning');

  username = input('Developer');

  subtitle = input(
    'Welcome back to DevPilot AI.'
  );

}