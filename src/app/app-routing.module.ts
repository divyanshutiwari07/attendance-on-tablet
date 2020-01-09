import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonComponent } from './component/person/person.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './shared/guard/auth.guard';


const routes: Routes = [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent},
      { path: 'person', component: PersonComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
