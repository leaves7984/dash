import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserService} from './provider/provider-user/user.service';
import { CreateService} from './provider/provider-create/create.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { UserComponent } from './user/user.component';

import { SignInComponent } from './user/sign-in/sign-in.component';
import { RouterModule} from '@angular/router';
import { appRoutes} from './routes';
import { HomeComponent } from './home/home.component';
import {AuthGuard} from './auth/auth.guard';
import {AuthIntercepter} from './auth/auth.intercepter';
import { CategoryComponent } from './home/category/category.component';
import { ArticleComponent } from './home/article/article.component';
import { TipComponent } from './home/tip/tip.component';
import { CategoryPageComponent } from './home/category/category-page/category-page.component';
import { ArticlePageComponent } from './home/article/article-page/article-page.component';
import { TipPageComponent } from './home/tip/tip-page/tip-page.component';
import { PatchUsersComponent } from './home/patch-users/patch-users.component';
import { MainPageComponent } from './home/main-page/main-page.component';
import { UserDetailComponent } from './home/user-detail/user-detail.component';
import { UserInfoComponent } from './home/user-detail/user-info/user-info.component';
import { UserWheelchairComponent } from './home/user-detail/user-wheelchair/user-wheelchair.component';
import { UserVendorComponent } from './home/user-detail/user-vendor/user-vendor.component';
import { UserRepairComponent } from './home/user-detail/user-repair/user-repair.component';
import { UserTrackingComponent } from './home/user-detail/user-tracking/user-tracking.component';
import { UserGpsComponent } from './home/user-detail/user-gps/user-gps.component';
import { UserLogComponent } from './home/user-detail/user-log/user-log.component';
import { FilterPipe} from './home/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
    HomeComponent,
    CategoryComponent,
    ArticleComponent,
    TipComponent,
    CategoryPageComponent,
    ArticlePageComponent,
    TipPageComponent,
    PatchUsersComponent,
    MainPageComponent,
    UserDetailComponent,
    UserInfoComponent,
    UserWheelchairComponent,
    UserVendorComponent,
    UserRepairComponent,
    UserTrackingComponent,
    UserGpsComponent,
    UserLogComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService,
    CreateService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthIntercepter, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
