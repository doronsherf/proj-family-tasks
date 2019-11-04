import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { FamilyService } from '../family.service';

@Component({
  selector: 'app-addt',
  templateUrl: './addt.component.html',
  styleUrls: ['./addt.component.css']
})
export class AddtComponent implements OnInit {
	  
	constructor(public tsk_srvc:TasksService, public frm_bldr:FormBuilder, public famService:FamilyService) { } //Building varibles to enable use with Services & FormBuilder
  
	
	// Short way to form items by using FormBuilder (not formControl+formGroup) 
	public newTask = this.frm_bldr.group({
		task_numbr:[0,  Validators.min(1), ] ,
		// NOT WORKING,Why?  task_numbr:[0,Validators.required, Validators.min(1)], 
		descrptn:["", Validators.required],
		created:["Auto"],// date value inserted automaticly (this.today_date)		
		hendler:["", Validators.required ]
	})
	   /* 	
	 // form items using(formGroup + formControl+) 
		public newTask = new FormGroup({// entering the inputs into the variable:'newTask' + Declairing FormGroup of few single FormControl's
			task_numbr: new FormControl(""),  // using FormControl to build input box
			descrptn: new FormControl(""), // using FormControl to build input box
			created: new FormControl(""),  // using FormControl to build input box
			hendler: new FormControl(""),   // using FormControl to build input box
		  })
	 */
	 /*
	 public fam1membr   = this.frm_bldr.group({
		famid:Number,
		name:String,
		nick:String,
		role:String	
	 })  
	 */
	public fam_membrs_arr; // var declaretion to contain array
	public fam_membrs_build(){
		this.famService.getFamily().subscribe(
			res=> {
				console.log(res)
				this.fam_membrs_arr = res
			},
			err=> console.log(err)
		) 
	}
	// public today_date:Date= new Date();// var declaretion
	public task_added:boolean;// var declaretion

	public add_task(){ // building the func. add_task which will call srvc2add_task from 'tasks service'
		this.newTask.value.created = new Date()	
		//console.log( new Date() );
		console.log(this.newTask.value)
		this.tsk_srvc.srvc2add_task(this.newTask.value).subscribe( // calling the function srvc2add_task from the service)//subscribe is conected to the observable that return from server
			res=>{
				console.log(res);
				this.task_added = true;
			},
			err=>{
				console.log(err); 
				this.task_added = false;
			}
		) // close subscribe
	}// close add_task()



  
	ngOnInit() {
		this.fam_membrs_build()
	} // close ngOnInit	
  
	ngonsubmit(){
		this.add_task()
	} // close ngonsubmit()
  
  
	  
	
}// close export class AddtComponent OnInit  
  