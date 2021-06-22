import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';
import { personasfisicas } from '../../models/personasfisicas';
import {UserService} from '../../services/user.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import {global} from '../../services/global';



@Component({
  selector: 'app-personasfisicas',
  templateUrl: './personasfisicas.component.html',
  styleUrls: ['./personasfisicas.component.css'],
  providers: [UserService,DatePipe]
})
export class PersonasfisicasComponent implements OnInit {
	public identity:any;
	public url: string;
	public page_title: string;
	personasfisicas: personasfisicas[] = [];
	public addPerson: personasfisicas;
	myDate:any = new Date();

  constructor(
  		private _userService: UserService,
  		private http: HttpClient,
  		private datePipe: DatePipe
  		
  	) { 
  	this.page_title = "Modulo de personas fisicas";
  	this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  	this.addPerson = new personasfisicas(0,this.myDate,this.myDate,'','','','','',0,true);
  	this.url = global.url+'Personas';
  	this.identity = this._userService.getIdentity();
  }
  ngOnInit(): void {
  	this.loadTable();
  }


  onSubmit(form:any){

  	if(this.addPerson.IdPersonaFisica != null){
 	    this._userService.updateperson(this.addPerson).subscribe(
	        response => {
	          var res = response[0].MENSAJEERROR;
	          if(res == "Registro exitoso"){
	          	this.ngOnInit();
	            Swal.fire(
	              'Registro completado!',
	              'Has actualizado la persona fisica',
	              'success'
	            )               
	          }else if(res == "Este rfc ya esta en uso por otra persona."){
	            Swal.fire(
	              'El RFC ya existe en el sistema',
	              'Trata de usar otro rfc',
	              'error'
	            );             
	          }

	        },
	        error =>{
	            Swal.fire(
	              'Ah ocurrido un error con la aplicación',
	              'Lamentamos mucho la molestia',
	              'error'
	            )  
	          
	        }
	      );
  	}else {
  		this.addPerson.IdPersonaFisica = 0;
	    this._userService.createperson(this.addPerson).subscribe(
	        response => {
	          var res = response[0].MENSAJEERROR;
	          if(res == "Registro exitoso"){
	          	this.ngOnInit();
	            Swal.fire(
	              'Registro completado!',
	              'Has añadido una nueva persona fisica',
	              'success'
	            )               
	          }else if(res == "El RFC ya existe en el sistema"){
	            Swal.fire(
	              'El RFC ya existe en el sistema',
	              'Trata de usar otro rfc',
	              'error'
	            );             
	          }

	        },
	        error =>{
	        	console.log(error);
	            Swal.fire(
	              'Ah ocurrido un error con la aplicación',
	              'Lamentamos mucho la molestia',
	              'error'
	            )  
	          
	        }
	      );
	    form.reset(); 
  	}       
  }  



  onSubmitC(form:any){
		this.myDate = this.personasfisicas[form].FechaNacimiento;

		var date = this.myDate.substring(0, 10);

	  	this.addPerson = new personasfisicas(
	  		this.personasfisicas[form].IdPersonaFisica,
	  		this.myDate,
	  		this.myDate,
	  		this.personasfisicas[form].Nombre,
	  		this.personasfisicas[form].ApellidoPaterno,
	  		this.personasfisicas[form].ApellidoMaterno,  		
	  		this.personasfisicas[form].RFC,  		
	  		date,
	  		this.personasfisicas[form].UsuarioAgrega,  		
	  		this.personasfisicas[form].Activo  		
	  		);	
  }  


  onSubmitD(IdPersonaFisica:number){


		Swal.fire({
		  title: '¿Estas seguro de borrar a esta persona',
		  text: "Esto no se puede revertir",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Si!',
		  cancelButtonText: 'No'
		}).then((result) => {
		  if (result.isConfirmed) {

 	    this._userService.deleteperson(IdPersonaFisica).subscribe(
	        response => {
	          var res = response[0].MENSAJEERROR;	          
	          if(res == "Persona fisica eliminada"){
	          this.ngOnInit();	          	
	            Swal.fire(
	              'Eliminación completada!',
	              'Has eliminado a la persona',
	              'success'
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
	      );
		  }
		})
  }  


  loadTable(){

	    this._userService.readperson().subscribe(
	        response => {
	        	this.personasfisicas = response;

				$(document).ready( function () {
				    $('#tablePer').DataTable();    
				} ); 
	        },
	        error =>{
	          
	        }
	      );
     	
  }

  clickFunction() {
	  	$('#registerForm').trigger("reset");	
	  	$("#title1").show();
	  	$("#title2").hide();  	
	  	$("#bot1").show();
	  	$("#bot2").hide();    	
  }
  clickFunction2() {
	  	$("#title2").show();
	  	$("#title1").hide();
	  	$("#bot2").show();
	  	$("#bot1").hide();     	
  }

}