import { Routes } from '@angular/router';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LandingEditorComponent } from './admin/landing-editor/landing-editor.component';
import { PersonalEditorComponent } from './admin/personal-editor/personal-editor.component';

import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent }, // TODO: UPDATE

    { path: 'admin', component: DashboardComponent, children: [
        { path: 'landing', component: LandingEditorComponent },
        { path: 'personal', component: PersonalEditorComponent }
    ]},
    { path: '', redirectTo: '/admin', pathMatch: 'full' }
];
