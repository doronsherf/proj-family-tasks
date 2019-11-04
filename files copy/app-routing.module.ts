import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllComponent } from './all/all.component';
import { AddComponent } from './add/add.component';
import{ FamMembersComponent } from './fam-members/fam-members.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
    {path:'all', component:AllComponent},
	{path:'add', component:AddComponent},
	{path:'fam-members', component: FamMembersComponent},

    {path:'', redirectTo:'all', pathMatch:"full"},
    {path:'**', component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
