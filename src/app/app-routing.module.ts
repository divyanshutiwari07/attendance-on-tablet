import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonComponent } from './component/person/person.component';


const routes: Routes = [
      { path: '', pathMatch: 'full', redirectTo: 'person' },
      { path: 'person', component: PersonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
