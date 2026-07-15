import { DeveloperWorkspace } from './features/developer-workspace/pages/developer-workspace/developer-workspace.page';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';


export const routes: Routes = [

  // Landing Page
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/pages/landing/landing')
        .then(m => m.Landing)
  },

  // Authentication
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login')
        .then(m => m.Login)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register/register')
        .then(m => m.Register)
  },

  // Main Application Layout
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/main-layout/main-layout')
        .then(m => m.MainLayout),

    children: [

      {
        path: 'dashboard',
         canActivate: [authGuard],
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard/dashboard')
            .then(m => m.Dashboard)
      },

      {
        path: 'ai',
         canActivate: [authGuard],
        loadComponent: () =>
          import('./features/ai/pages/workspace/workspace')
            .then(m => m.Workspace)
      },

      {
        path: 'snippets',
         canActivate: [authGuard],
        loadComponent: () =>
          import('./features/snippets/pages/snippets/snippets')
            .then(m => m.SnippetsPage)
      },

      {
    path:'profile',
    canActivate:[authGuard],
    loadComponent:()=>

        import(
            './features/profile/pages/profile/profile'
        ).then(
            m=>m.Profile
        )
},
      {
        path: 'settings',
         canActivate: [authGuard],
        loadComponent: () =>
          import('./features/settings/pages/settings/settings')
            .then(m => m.Settings)
      },

{
    path: 'developer-workspace',

    canActivate: [authGuard],

    loadComponent: () =>

        import(
            './features/developer-workspace/pages/developer-workspace/developer-workspace.page'
        ).then(
            m => m.DeveloperWorkspace
        )
}

//       {
//     path:'code-assistant/workspace',

//     loadComponent:()=>

//       import(

// './features/code-assistant/pages/code-workspace/'

//       ).then(

// m=>m.CodeWorkspace

//       )
// }
      

    ]

  },

  {
    path: '**',
    redirectTo: ''
  }

];