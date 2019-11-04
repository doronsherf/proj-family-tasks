import { Component, OnInit } from '@angular/core';
'@angular/forms';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { FamilyService } from '../family.service';

@Component({
  selector: 'app-addt',
  templateUrl: './addt.component.html',
  styleUrls: ['./addt.component.css']
})
export class AddtComponent implements OnInit {
	public newTask  // var declaretion
	public task_added:boolean
  
	public fam1membr 
	public chosen_membr:Number
	public fam_membrs // var declaretion
  
  
	constructor(public tsk_srvc:TasksService, public frm_bldr:FormBuilder, public famService:FamilyService) { } //Building varibles to enable use with TasksService & FormBuilder service
  
	public today_date:Date= new Date();
  
		ngOnInit() {
		  /*
		  this.newTask = new FormGroup({// entering the inputs into the variable:'newTask' + Declairing FormGroup of few single FormControl's
		  task_numbr: new FormControl(""),  // using FormControl to build input box
		  descrptn: new FormControl(""), // using FormControl to build input box
		  created: new FormControl(""),  // using FormControl to build input box
		  hendler: new FormControl(""),   // using FormControl to build input box
		  })
	   */
		  // Short way to form items(formControl+formGroup) by using FormBuilder
		  this.newTask = this.frm_bldr.group({
				//del_btn:[false] ,
				// NOT WORKING,Why?  task_numbr:[0,Validators.required, Validators.min(1)], 
				task_numbr:[0,  Validators.min(1), ] ,
				descrptn:["", Validators.required],
				created:["Auto"],// not 'required': the value is inserted automaticly (this.today_date)		
				hendler:["", Validators.required ]
		  })
		  console.log(this.newTask) // the formGroup object with all properties
		  console.log(this.newTask.value)  
  
		  this.fam1membr = this.frm_bldr.group({
			  famid:Number,
			  name:String,
			  nick:String,
			  role:String	
	  
		  })
  
		  this.famService.getFamily().subscribe(
			  res=> {
				  console.log(res)
				  this.fam_membrs = res
			  },
			  err=> console.log(err)
		  ) 
	  	} // close ngOnInit	
  
		ngonsubmit(){
			  
			// console.log(this.newTask);/dont work!
			// this.tsk_srvc.task_count = this.tsk_srvc.task_count + 1
		
	  	} // close ngonsubmit()
  
  
	  
		  public add_task(){ // building the func. add_task which will call srvc2add_task from 'tasks service'
			  this.newTask.value.created = new Date()	
		  
			  console.log( new Date() );
			  
			  console.log(this.newTask.value)
		  
			  this.tsk_srvc.srvc2add_task(this.newTask.value).subscribe( // calling the function srvc2add_task from the service)//subscribe is conected to the observable that return from server
				  res=>{
					  console.log(res);
					  this.task_added = true;
				  },
				  err=>{
					  console.log(err); 
					  console.log(this.task_added);
					  this.task_added = false;
				  }
			  ) // close subscribe
		  }
  	}// close add_task()
  