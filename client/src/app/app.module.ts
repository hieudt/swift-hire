import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdSelectModule,
  MdSidenavModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';

import {
  CovalentCommonModule,
  CovalentDataTableModule,
  CovalentDialogsModule,
  CovalentLayoutModule,
  CovalentLoadingModule,
  CovalentMediaModule,
  CovalentMenuModule,
  CovalentNotificationsModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentStepsModule
} from '@covalent/core';

import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { CallbackComponent } from './pages/callback/callback.component';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { WindowRef } from './services/WindowRef.service';

const routes: Routes = [
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardPageComponent
      },
      {
        path: 'profile',
        component: ProfilePageComponent
      }
    ]
  }
];

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenGetter: (() => localStorage.getItem('access_token'))
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    DashboardPageComponent,
    ProfilePageComponent,
    CallbackComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FlexLayoutModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdListModule,
    MdMenuModule,
    MdTooltipModule,
    MdSlideToggleModule,
    MdInputModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdSnackBarModule,
    MdSidenavModule,
    MdTabsModule,
    MdSelectModule,
    CovalentDataTableModule,
    CovalentMediaModule,
    CovalentLoadingModule,
    CovalentNotificationsModule,
    CovalentLayoutModule,
    CovalentMenuModule,
    CovalentPagingModule,
    CovalentSearchModule,
    CovalentStepsModule,
    CovalentCommonModule,
    CovalentDialogsModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    WindowRef,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}