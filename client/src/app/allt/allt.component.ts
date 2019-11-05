 
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { TasksService } from "../tasks.service";
import {FamilyService} from '../family.service';


@Component({
  selector: 'app-allt',
  templateUrl: './allt.component.html',
  styleUrls: ['./allt.component.css']
})

export class AlltComponent implements OnInit {
	constructor(public tsk_srvc:TasksService,public famService:FamilyService, public frm_bldr:FormBuilder) { }

    public all_tasks_arr// var declaretion
	public fam_membrs_arr// var declaretion
	
	// adding subscribe (built in angular func) to get_all_tasks func - turns get_all_tasks() to an Observable. inside the () of the subscribe, we defin what to do with the get_all_tasks() responses which in this case are: http responses(res,err)
	show_all_tasks() { // get all tasks from DB (using 'tasks service')
		  	this.tsk_srvc.get_all_tasks().subscribe(   
				res=>{
				console.log(res)
				this.all_tasks_arr = res
				},
				err=>console.log(err)
			);
	}
	get_fam_membrs(){
		this.famService.getFamily().subscribe(
			res=> {
				console.log(res)
				this.fam_membrs_arr = res
			},
			err=> console.log(err)
		) 
	}

	del_a_tsk(tsk2del) {  
		this.tsk_srvc.del_task(tsk2del).subscribe(   
			res=>{
				console.log('Task to del is: ',tsk2del)
				console.log(res);
				this.show_all_tasks();
			},
			err=>console.log('Delete Task Error: ', err)	
		)
	}	

	ngOnInit() {
	this.show_all_tasks();
	this.get_fam_membrs();
	}

	ngOnSubmit() {  
	}


}
