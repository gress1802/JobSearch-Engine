import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileManagementComponent } from './components/profile-management/management';
import { JobSearchComponent } from './components/job-search/job-search.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { RedirectAuthenticatedGuard } from './guards/redirect-authenticated.guard';
import { MarketAnalysisComponent } from './components/market-analysis/market-analysis.component';

//create routes for each of the components
const routes: Routes = [
  { path: "job-search", component: JobSearchComponent, canActivate: [AuthGuard]},
  { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'login', component: LoginComponent, canActivate: [RedirectAuthenticatedGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile-management', component: ProfileManagementComponent, canActivate: [AuthGuard] },
  { path: 'market-analysis', component: MarketAnalysisComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
