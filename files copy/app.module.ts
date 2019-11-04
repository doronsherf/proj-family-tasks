import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllComponent } from './all/all.component';
import { AddComponent } from './add/add.component';
import { FamMembersComponent } from './fam-members/fam-members.component'
import { NotfoundComponent } from './notfound/notfound.component';
import {FormsModule} from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AllComponent,
    AddComponent,
	FamMembersComponent,
	NotfoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
	AppRoutingModule,
	FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
