import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

	constructor(public http: HttpClient) { }

  	public getFamily(){
    	console.log("getFamily:'family.service' was called");
		console.log(this.http.get('http://localhost:3000/all_fam') )

		return this.http.get('http://localhost:3000/all_fam')
	}

}
