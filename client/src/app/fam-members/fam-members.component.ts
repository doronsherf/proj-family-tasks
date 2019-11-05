
import { Component, OnInit } from '@angular/core';
import{FormBuilder} from '@angular/forms'
import{ FamilyService} from '../family.service';

@Component({
  selector: 'app-fam-members',
  templateUrl: './fam-members.component.html',
  styleUrls: ['./fam-members.component.css']
})
export class FamMembersComponent implements OnInit  {
	constructor(public famService:FamilyService, public frm_bldr:FormBuilder) { }

	public chosen_num:Number // var declaretion
	public fam_membrs_arr // var declaretion

	public get_fam_membrs(){ // function declaretion
		this.famService.getFamily().subscribe(
			res=> {
				console.log(res)
				this.fam_membrs_arr = res
			},
			err=> console.log(err)
		) 
	}

  	ngOnInit() {
		this.get_fam_membrs()
	}
}