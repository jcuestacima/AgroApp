import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayourPageComponent } from './pages/layour-page/layour-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [

  {
    path:'',
    component: LayourPageComponent,
    children:[
      {
        path:'login',
        component: LoginPageComponent
      },{
        path:'register',
        component: RegisterPageComponent
      },
      {
        path:'**',
        redirectTo:'login'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
