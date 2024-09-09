import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './portal/home/home.component'
import { AuthGuard } from './_helpers'
import { AdminActionsComponent } from './portal/admin-actions/admin-actions.component';
import { AdminTestComponent } from './portal/admin-test/admin-test.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'portal/admin-actions', component: AdminActionsComponent, canActivate: [AuthGuard] },
  { path: 'portal/admin-test', component: AdminTestComponent, canActivate: [AuthGuard] },
  { path: 'portal/admin-actions/failed-logins-summary', component: AdminActionsComponent, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  { path: '**', redirectTo: '' }
];

// imports: [RouterModule.forRoot(routes, { useHash: true })],
// imports: [RouterModule.forRoot(routes)],

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

