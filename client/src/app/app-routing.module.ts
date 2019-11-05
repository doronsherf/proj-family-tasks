import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlltComponent } from './allt/allt.component';
import { AddtComponent } from './addt/addt.component';
import{ FamMembersComponent } from './fam-members/fam-members.component';
//import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
    {path:'all', component:AlltComponent},
	{path:'add', component:AddtComponent},
	{path:'fam-members', component: FamMembersComponent},

    {path:'', redirectTo:'all', pathMatch:"full"},
    // {path:'**', component:NotfoundComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
