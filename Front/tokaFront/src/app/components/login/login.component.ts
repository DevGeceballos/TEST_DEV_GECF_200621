import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import {UserService} from '../../services/user.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]  
})
export class LoginComponent implements OnInit {
	public page_title: string;
	public user: User;
  public identity:any;
  constructor(
  		private _userService: UserService,
      private _router: Router,
      private _route: ActivatedRoute
  	) { 
  	this.page_title = 'Identificate';
  	this.user = new User('','','');
  }

  ngOnInit(): void {
      this.logout();
  }
  onSubmit(form:any){
    this._userService.login(this.user).subscribe(
        response => {                   
          localStorage.setItem('token', "DENEGADO");      
          if(response[0].RESPONSE == "DENEGADO"){
              Swal.fire(
              'Tu contraseña o correo son incorrectos',
              'Favor de intentarlo nuevamente',
              'error'
            )             
          }else{
            this.identity = response[0].RESPONSE;
            localStorage.setItem('token', "OK");            
            localStorage.setItem('identity', this.identity);   
          }
        },
        error =>{
            Swal.fire(
              'Ah ocurrido un error con la aplicación',
              'Lamentamos mucho la molestia',
              'error'
            )           
        }
      )
    form.reset();
  }

  logout(){
    this._route.params.subscribe(params =>{
      let logout = +params['sure'];

      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');    
        
        this.identity = null;

        this._router.navigate(['']);

      }

    });
  }

  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
  }


}
