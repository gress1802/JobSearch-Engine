import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileManagementComponent } from './components/profile-management/management';
import { NavbarComponent } from './components/navbar/navbar.component';
import { JobDetailsModalComponent } from './components/job-details-modal/job-details-modal.component';
import { UserDetailsModalComponent } from './components/user-details-modal/user-details-modal.component';
import { JobSearchComponent } from './components/job-search/job-search.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { MarketAnalysisComponent } from './components/market-analysis/market-analysis.component';
import { NgChartsModule } from 'ng2-charts';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    LoginComponent,
    DashboardComponent,
    ProfileManagementComponent,
    NavbarComponent,
    JobDetailsModalComponent,
    UserDetailsModalComponent,
    JobSearchComponent,
    RegisterModalComponent,
    UserProfileComponent,
    FooterComponent,
    MarketAnalysisComponent,
  ],
  imports: [
    NgChartsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
