import {Routes} from '@angular/router';
import {UserComponent} from './user/user.component';
import {SignUpComponent} from './user/sign-up/sign-up.component';
import {SignInComponent} from './user/sign-in/sign-in.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth/auth.guard';
import {PatchUsersComponent} from './home/patch-users/patch-users.component';
import {MainPageComponent} from './home/main-page/main-page.component';
import {CategoryPageComponent} from './home/category/category-page/category-page.component';
import {CategoryComponent} from './home/category/category.component';
import {ArticleComponent} from './home/article/article.component';
import {ArticlePageComponent} from './home/article/article-page/article-page.component';
import {TipComponent} from './home/tip/tip.component';
import {UserDetailComponent} from './home/user-detail/user-detail.component';
import {UserInfoComponent} from './home/user-detail/user-info/user-info.component';
import {UserWheelchairComponent} from './home/user-detail/user-wheelchair/user-wheelchair.component';
import {UserVendorComponent} from './home/user-detail/user-vendor/user-vendor.component';
import {UserRepairComponent} from './home/user-detail/user-repair/user-repair.component';
import {UserTrackingComponent} from './home/user-detail/user-tracking/user-tracking.component';

export const appRoutes: Routes = [
  {
    path: 'home', component: HomeComponent,
    canActivate: [AuthGuard],
    children: [{path: '', component: MainPageComponent}]
  },
    {
        path: 'detail/:userId', component: HomeComponent,
        canActivate: [AuthGuard],
        children: [{
            path: '', component: UserDetailComponent,
            canActivate: [AuthGuard],
            children: [
                {path: 'info/:userId', component: UserInfoComponent},
                {path: 'wheelchair/:userId', component: UserWheelchairComponent},
                {path: 'vendor/:userId', component: UserVendorComponent},
                {path: 'repair/:userId', component: UserRepairComponent}
            ]
        }]
    },
    {
        path: 'tracking/:id', component: HomeComponent,
        canActivate: [AuthGuard],
        children: [{path: '', component: UserTrackingComponent}]
    },
  {
    path: 'category-page', component: HomeComponent,
    canActivate: [AuthGuard],
    children: [{path: '', component: CategoryPageComponent}]
  },
  {
    path: 'category', component: HomeComponent,
    canActivate: [AuthGuard],
    children: [{path: '', component: CategoryComponent}]
  },
  {
    path: 'article', component: HomeComponent,
    canActivate: [AuthGuard],
    children: [{path: '', component: ArticleComponent}]
  },
  {
    path: 'article-page', component: HomeComponent,
    canActivate: [AuthGuard],
    children: [{path: '', component: ArticlePageComponent}]
  },
  {
    path: 'patch-users', component: HomeComponent,
    canActivate: [AuthGuard],
    children: [{path: '', component: PatchUsersComponent}]
  },
  {
    path: 'tip', component: HomeComponent,
    canActivate: [AuthGuard],
    children: [{path: '', component: TipComponent}]
  },
  {
    path: 'signup', component: UserComponent,
  children: [{path: '', component: SignUpComponent}]
  },
  {
    path: 'login', component: UserComponent,
    children: [{path: '', component: SignInComponent}]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full'}
  ];
