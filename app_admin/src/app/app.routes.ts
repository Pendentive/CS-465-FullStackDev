import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

import { PageEditorComponent } from './admin/page-editor/page-editor.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [

  { path: '', 
    redirectTo: '/admin', 
    pathMatch: 'full'
  },
  {
    path: 'admin', 
    component: DashboardLayoutComponent, 
    children: [
      { path: 'pages/:id', component: PageEditorComponent },
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent }, // SHOULD BE LOGIN COMPONENT
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
