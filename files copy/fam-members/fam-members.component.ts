import { Component, OnInit } from '@angular/core';
import{FormBuilder} from '@angular/forms'
import{ FamilyService} from '../family.service';

@Component({
  selector: 'app-fam-members',
  templateUrl: './fam-members.component.html',
  styleUrls: ['./fam-members.component.css']
})




export class FamMembersComponent implements OnInit {
	public fam1membr
	public chosen_num:Number
	public fam_membrs // var declaretion
	public chosen_membr
	public chosen_num2arr:Number 




  constructor(public famService:FamilyService, public frm_bldr:FormBuilder) { }

  ngOnInit() {

this.fam1membr = this.frm_bldr.group({
	famid:Number,
	name:String,
	nick:String,
	role:String	
})

this.famService.getFamily().subscribe(
	res=> {console.log(res);
		this.fam_membrs = res;
	},
	err=> console.log(err)
  )
  
  }
}
