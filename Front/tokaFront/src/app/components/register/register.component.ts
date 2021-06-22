import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import {UserService} from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
	public page_title: string;
  public user: User;
  public identity:any;
  constructor(
      private _userService: UserService
    ) { 
  	this.page_title = "Registrate";
    this.user = new User('','','');
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._userService.register(this.user).subscribe(
        response => {
          var res = response[0].MENSAJEERROR;
          if(res == "Registro exitoso"){
            Swal.fire(
              'Registro completado!',
              'Ahora puedes iniciar sesion!',
              'success'
            )               
          }else{
            Swal.fire(
              'Este correo ya estaba registrado',
              'Que tal si tratas de acordarte de tu contraseña',
              'error'
            )             
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

}
