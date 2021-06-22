import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {personasfisicas} from '../models/personasfisicas';
import {global} from './global';


@Injectable()
export class UserService{	
	public url: string;
	public identity:any;
	constructor(
			public _http: HttpClient
		) {
		// code...
			this.url = global.url;
	}

	register(user:any): Observable<any>{
		let json = JSON.stringify(user);
		let params = json;

		let headers = new HttpHeaders().set('content-type', 'application/json' /*, 'application/x-www-form-urlencoded'*/);

		return this._http.post(this.url + 'Users', params, {headers: headers});
	}

	login(user:any): Observable<any>{
		let json = JSON.stringify(user);
		let params = json;

		let headers = new HttpHeaders().set('content-type', 'application/json' /*, 'application/x-www-form-urlencoded'*/);

		return this._http.post(this.url + 'Login', params, {headers: headers});
	}

	getIdentity(){
		let identity = localStorage.getItem('identity');


		if(identity && identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity = null;
		}

		return this.identity;
		
	}


	/*Apartado para funciones del crud*/

	createperson(personasfisicas:any): Observable<any>{
		let json = JSON.stringify(personasfisicas);
		let params = json;

		let headers = new HttpHeaders().set('content-type', 'application/json' /*, 'application/x-www-form-urlencoded'*/);
		return this._http.post(this.url + 'Personas', params, {headers: headers});
	}

	readperson(): Observable<any>{
		let headers = new HttpHeaders().set('content-type', 'application/json' /*, 'application/x-www-form-urlencoded'*/);

		return this._http.get(this.url + 'Personas', {headers: headers});
	}

	updateperson(personasfisicas:any): Observable<any>{
		let json = JSON.stringify(personasfisicas);
		let params = json;
		let headers = new HttpHeaders().set('content-type', 'application/json' /*, 'application/x-www-form-urlencoded'*/);
		return this._http.put(this.url + 'Personas', params, {headers: headers});
	}

	deleteperson(IdPersonaFisica: number): Observable<any>{
		let headers = new HttpHeaders().set('content-type', 'application/json' /*, 'application/x-www-form-urlencoded'*/);

		return this._http.delete(this.url +IdPersonaFisica, {headers: headers});

	}


	/*Apartado para funciones del reporte*/

	gettoken(){
		var urltok = 'https://api.toka.com.mx/candidato/api/login/authenticate';
		var json = JSON.stringify ({
			"Username": "ucand0021", 
			"Password": "yNDVARG80sr@dDPc2yCT!"
		});
		let params = json;
		let headers = new HttpHeaders().set('content-type', 'application/json' /*, 'application/x-www-form-urlencoded'*/);		
		return this._http.post(urltok, params, {headers: headers});
	}

	obtenerDatos(token:string){
		var urldatos = 'https://api.toka.com.mx/candidato/api/customers';

		let headers = new HttpHeaders().set('Authorization', ''+token /*, 'application/x-www-form-urlencoded'*/);

		return this._http.get(urldatos, {headers: headers});

	}

}



