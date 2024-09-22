import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { RegisterComponent } from './core/auth/pages/register/register.component';
import { FolderComponent } from './features/folder/pages/folder.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { authGuard } from './core/auth/guards/auth.guard';
import { roleGuard } from './core/auth/guards/role.guard';

export const routes: Routes = [

    {
        path: 'workspace/:userId',
        component: FolderComponent,
        canActivate:[authGuard,roleGuard],
        data: { role: ['User' ,'Admin'] , context : 'workspace' }

    },
    {
        path: 'shared-directories',
        component: FolderComponent,
        canActivate:[authGuard,roleGuard],
        data: { role: ['User' ,'Admin'] , context : 'shared' }
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