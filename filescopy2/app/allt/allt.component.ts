// <div [formGroup]="a_task" (ngSubmit)="del_tsk()" *ngFor="let tsk of all_tasks">
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { TasksService } from "../tasks.service";
import {FamilyService} from '../family.service';

import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-allt',
  templateUrl: './allt.component.html',
  styleUrls: ['./allt.component.css']
})

export class AlltComponent implements OnInit {
	constructor(public tsk_srvc:TasksService,public famService:FamilyService, public frm_bldr:FormBuilder) { }

    public all_tasks// var declaretion
	public tsk2del 
	public fam_membrs
	public fam_membr
	// public tasksize:Number // var declaretion
	//public a_task
	
	show_all_tasks() { // get all tasks from DB (using 'tasks service')
		  	this.tsk_srvc.get_all_tasks().subscribe(   
			res=>{
			console.log(res)
			this.all_tasks = res
			},
			err=>console.log(err)
		);
	}
	get_fam_membrs(){
		this.famService.getFamily().subscribe(
			res=> {
				console.log(res)
				this.fam_membrs = res
			},
			err=> console.log(err)
		) 
	}

//console.log(this.tsk2del.controls.task_numbr.value);
//console.log(this.tsk2del._id);

// adding subscribe (built in angular func) to get_all_tasks func - turns get_all_tasks() to an Observable. inside the () subscribe, we defin what to do with the get_all_tasks() responses which in this case are: http responses(res,err)


	del_a_tsk(tsk2del) {  
		this.tsk_srvc.del_task(tsk2del).subscribe(   
		res=>{
			console.log('all.component.ts say: Task to del is:')
			console.log(tsk2del)
			console.log(res);
			this.show_all_tasks();
		},
		err=>{console.log('err53 ');
			console.log(err)
		}
		)
	}

/*
	   this.tsk_srvc.del_tsk((this.a_task.value.task_numbr).subscribe(
		   	res => {
			console.log(res)
			console.log('Deleted')
			},
			err=> console.log('Error:Did NOT Delete ' , err)
		);
*/
ngOnInit() {

	this.tsk2del = this.frm_bldr.group({
		_id:[],
		del_btn:["false"], 
		task_numbr:[],
		descrptn:[],
		created:[],		
		hendler:[]
  })

// console.log(this.tsk2del);

this.show_all_tasks();
this.get_fam_membrs();

}

ngOnSubmit() {  }


}
