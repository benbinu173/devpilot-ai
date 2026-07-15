import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

const SIDEBAR_COLLAPSED_KEY = 'devpilot-sidebar-collapsed';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  collapsed = signal(this.readStoredState());

  private readStoredState(): boolean {
    try {
      return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === 'true';
    } catch {
      // localStorage unavailable (private browsing, SSR, etc.) — default to expanded
      return false;
    }
  }

  toggleCollapse(): void {
    this.collapsed.update(value => {
      const next = !value;
      try {
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
      } catch {
        // state just won't persist across reloads — not worth failing over
      }
      return next;
    });
  }

  menuItems = [
    {
      title: 'Dashboard',
      route: '/dashboard',
      icon: 'dashboard'
    },
    {
      title: 'AI Workspace',
      route: '/ai',
      icon: 'ai'
    },
    {
      title: 'Developer Workspace',
      route: '/developer-workspace',
      icon: 'workspace'
    },
    {
      title: 'Code Snippets',
      route: '/snippets',
      icon: 'snippets'
    },
    {
      title: 'Profile',
      route: '/profile',
      icon: 'profile'
    },
    {
      title: 'Settings',
      route: '/settings',
      icon: 'settings'
    }
  ];

}