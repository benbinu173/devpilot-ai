import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { WelcomeBanner } from '../../../../shared/components/banners/welcome-banner/welcome-banner';
import { StatCard } from '../../../../shared/components/cards/stat-card/stat-card';
import { SectionHeader } from '../../../../shared/components/layout/section-header/section-header';
import { ActionCard } from '../../../../shared/components/cards/action-card/action-card';
import { ConversationCard } from '../../../../shared/components/cards/conversation-card/conversation-card';
import { WorkspaceSnapshotCard } from '../../../../shared/components/cards/workspace-snapshot-card/workspace-snapshot-card';
import { RecentSnippetCard } from '../../../../shared/components/cards/recent-snippet-card/recent-snippet-card';
import { ActivityTimelineCard } from '../../../../shared/components/cards/activity-timeline-card/activity-timeline-card';

import { DashboardService } from '../../services/dashboard.service';

import { DashboardActivity } from './interfaces/dashboard-activity.interface';
import { DashboardAction } from './interfaces/dashboard-action.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    WelcomeBanner,
    StatCard,
    SectionHeader,
    ActionCard,
    ConversationCard,
    WorkspaceSnapshotCard,
    RecentSnippetCard,
    ActivityTimelineCard
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  private router = inject(Router);

  private dashboardService = inject(DashboardService);

  readonly greeting = this.getGreeting();

  readonly subtitle = this.getSubtitle();

  readonly stats = this.dashboardService.stats;

  readonly loading = this.dashboardService.loading;

  readonly workspaceSnapshot =
    this.dashboardService.workspaceSnapshot;

  readonly recentSnippets =
    this.dashboardService.recentSnippets;

  constructor() {

    this.dashboardService.load();

  }

  // ==========================================================
  // Temporary Conversations
  // (Will be replaced with live API in Phase 11.0.7)
  // ==========================================================

 readonly recentConversations =
    this.dashboardService.recentConversations;

  // ==========================================================
  // Activity Timeline
  // ==========================================================

  activities: DashboardActivity[] = [

    {
      id: '1',
      icon: 'snippet',
      title: 'Code Snippet Saved',
      description: 'JWT Authentication Middleware',
      timestamp: '2 minutes ago'
    },

    {
      id: '2',
      icon: 'favorite',
      title: 'Snippet Added to Favorites',
      description: 'Axios Request Helper',
      timestamp: '15 minutes ago'
    },

    {
      id: '3',
      icon: 'ai',
      title: 'AI Code Explanation',
      description: 'auth.service.ts',
      timestamp: '1 hour ago'
    },

    {
      id: '4',
      icon: 'workspace',
      title: 'Workspace Updated',
      description: 'Added 3 new project files',
      timestamp: 'Yesterday'
    }

  ];

  // ==========================================================
  // Quick Actions
  // ==========================================================

  actions: DashboardAction[] = [

    {
      icon: 'ai',
      title: 'AI Assistant',
      description: 'Start a new AI conversation.',
      route: '/ai'
    },

    {
      icon: 'workspace',
      title: 'Developer Workspace',
      description: 'Open your AI-powered coding workspace.',
      route: '/developer-workspace'
    },

    {
      icon: 'snippets',
      title: 'Code Snippets',
      description: 'Browse and manage your saved snippets.',
      route: '/snippets'
    },

    {
      icon: 'files',
      title: 'Workspace Files',
      description: 'Upload and organize project files.',
      route: '/developer-workspace'
    }

  ];

  // ==========================================================
  // Welcome Banner
  // ==========================================================

  private getGreeting(): string {

    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {

      return 'Good Morning';

    }

    if (hour >= 12 && hour < 17) {

      return 'Good Afternoon';

    }

    if (hour >= 17 && hour < 21) {

      return 'Good Evening';

    }

    return 'Good Night';

  }

  private getSubtitle(): string {

    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {

      return 'Start your day by building something amazing with DevPilot AI.';

    }

    if (hour >= 12 && hour < 17) {

      return 'Keep your momentum going. Your workspace is ready for the next challenge.';

    }

    if (hour >= 17 && hour < 21) {

      return 'Welcome back. Continue building smarter with AI-powered development.';

    }

    return 'Your projects are waiting. Build, learn and ship with DevPilot AI.';

  }

  // ==========================================================
  // Navigation
  // ==========================================================

  navigate(route: string): void {

    this.router.navigate([route]);

  }

}