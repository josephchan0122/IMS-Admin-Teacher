import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthGuard } from "./auth.guard";
import { USERROLE } from './@core/models/user';
import { RoleGuard } from './@core/guards/role.guard';
export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
    canActivate:[AuthGuard],

  },
  // {
  //   path:'teacher',
  //   loadChildren:() => import('./teacher/teacher.module').then(m=>m.TeacherModule),
  //   canActivate:[AuthGuard],
  //   data:{
  //     role:USERROLE.Teacher
  //   }
  // },
  {
    path: 'auth',
    loadChildren:()=>import('./auth/auth.module')
      .then(m=>m.AuthModule)
  },  
  { path: '', redirectTo:'default', pathMatch: 'full' },
  { path: '**', redirectTo:'404' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
