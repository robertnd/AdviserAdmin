import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './layout/header/header.component'
import { FooterComponent } from './layout/footer/footer.component'
import { LeftbarComponent } from './layout/leftbar/leftbar.component'
import { ContentComponent } from './layout/content/content.component'
import { HomeComponent } from './portal/home/home.component'
import { AlertComponent } from './_components/alert/alert.component'
import { BreadcrumbComponent } from './_components/breadcrumb/breadcrumb.component';
import { AdminActionsComponent } from './portal/admin-actions/admin-actions.component';
import { FailedLoginsSummaryComponent } from './portal/admin-actions/failed-logins-summary/failed-logins-summary.component'
import { AdminTestComponent } from './portal/admin-test/admin-test.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LeftbarComponent,
    ContentComponent,
    HomeComponent,
    AlertComponent,
    BreadcrumbComponent,
    AdminActionsComponent,
    FailedLoginsSummaryComponent,
    AdminTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
