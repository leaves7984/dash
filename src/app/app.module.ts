import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { SignUpComponent } from './home/management/sign-up/sign-up.component';
import { UserService} from './provider/provider-user/user.service';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { UserComponent } from './user/user.component';

import { SignInComponent } from './user/sign-in/sign-in.component';
import { RouterModule} from '@angular/router';
import { appRoutes} from './routes';
import { HomeComponent } from './home/home.component';
import { AuthGuard} from './auth/auth.guard';
import { AuthIntercepter} from './auth/auth.intercepter';
import { PatchUsersComponent } from './home/management/patch-users/patch-users.component';
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
import { VendorFilterPipe} from './home/user-detail/user-vendor/vendor.filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
    HomeComponent,
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
    FilterPipe,
    VendorFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    NgbModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [
    UserService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthIntercepter, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
