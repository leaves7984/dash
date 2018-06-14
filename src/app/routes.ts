import {Routes} from '@angular/router';
import {UserComponent} from './user/user.component';
import {SignUpComponent} from './user/sign-up/sign-up.component';
import {SignInComponent} from './user/sign-in/sign-in.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth/auth.guard';
import {PatchUsersComponent} from './home/patch-users/patch-users.component';
import {MainPageComponent} from './home/main-page/main-page.component';
import {UserDetailComponent} from './home/user-detail/user-detail.component';
import {UserInfoComponent} from './home/user-detail/user-info/user-info.component';
import {UserWheelchairComponent} from './home/user-detail/user-wheelchair/user-wheelchair.component';
import {UserVendorComponent} from './home/user-detail/user-vendor/user-vendor.component';
import {UserRepairComponent} from './home/user-detail/user-repair/user-repair.component';
import {UserTrackingComponent} from './home/user-detail/user-tracking/user-tracking.component';
import {UserGpsComponent} from './home/user-detail/user-gps/user-gps.component';
import {UserLogComponent} from './home/user-detail/user-log/user-log.component';

export const appRoutes: Routes = [
  {
    path: 'home', component: HomeComponent,
    canActivate: [AuthGuard],
    children: [{path: '', component: MainPageComponent}]
  },
    {
        path: 'detail', component: HomeComponent,
        canActivate: [AuthGuard],
        children: [{
            path: '', component: UserDetailComponent,
            canActivate: [AuthGuard],
            children: [
                {path: 'info/:userId', component: UserInfoComponent},
                {path: 'wheelchair/:userId', component: UserWheelchairComponent},
                {path: 'vendor/:userId', component: UserVendorComponent},
                {path: 'repair/:userId', component: UserRepairComponent},
                {path: 'gps/:userId', component: UserGpsComponent},
                {path: 'log/:userId', component: UserLogComponent}
            ]
        }]
    },
    {
        path: 'tracking/:id', component: HomeComponent,
        canActivate: [AuthGuard],
        children: [{path: '', component: UserTrackingComponent}]
    },
  {
    path: 'patch-users', component: HomeComponent,
    canActivate: [AuthGuard],
    children: [{path: '', component: PatchUsersComponent}]
  },
    {
        path: 'auth', component: UserComponent,
        children: [
            {path: 'signup', component: SignUpComponent},
            {path: 'signin', component: SignInComponent}
            ]
    },
  { path: '', redirectTo: '/auth/signin', pathMatch: 'full'}
  ];
