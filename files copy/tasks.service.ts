import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class TasksService {

	constructor(public http: HttpClient) { }

  // GET ALL TASKS 
	public get_all_tasks() { //get alltasks from the DB
		console.log("'tasks.service' did get all tasks")
		return this.http.get('http://localhost:3000/all_tasks')
	}

 // ADD A TASK
	public srvc2add_task(task): Observable<any> { //post(send) the new task to the DB
		console.log("tasks.service work to add new task");
		console.log( task);
		return this.http.post('http://localhost:3000/new_task',task);
  	}
  
  //DELETE A TASK
  	public del_task(tsk2del): Observable<any> { 
	
		let url2del = `http://localhost:3000/del/${tsk2del._id}` ;
		console.log(url2del);
		
		if(window.confirm('Are you sure?')) {
			return this.http.get(url2del);
		}
  	}
}
