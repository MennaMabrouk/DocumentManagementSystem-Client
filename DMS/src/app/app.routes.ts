import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { RegisterComponent } from './core/auth/pages/register/register.component';
import { SharedDirectoriesComponent } from './features/shared-directories/shared-directories.component';
import { WorkspaceComponent } from './features/workspace/workspace.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

export const routes: Routes = [

    {
        path: 'workspace/:userId',
        component: WorkspaceComponent
    },
    {
        path: 'shared-directories',
        component: SharedDirectoriesComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    { // Redirect to login by default
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    } ,
    { //Wildcard
        path:'**',
        component: NotFoundComponent
    }

];
