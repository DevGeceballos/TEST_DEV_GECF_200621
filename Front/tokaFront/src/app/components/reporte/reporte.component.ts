import { Component,ViewChild, ElementRef, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import Swal from 'sweetalert2';
import { customer } from '../../models/customer';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
  providers: [UserService,DatePipe]
})
export class ReporteComponent implements OnInit {
@ViewChild('table') table:any = ElementRef;

@ViewChild('table2') table2:any = ElementRef;

public page_title: string;
public identity:any;
customer:any = [];

  constructor(
  		private _userService: UserService,
  		private http: HttpClient,
  		private datePipe: DatePipe

  	) { 
  this.page_title = "Modulo de Reporte de clientes";
  this.identity = this._userService.getIdentity();
}

  ngOnInit(): void {
  	this.test();
  }

  test(){
    this._userService.gettoken().subscribe(
        response => {

        	var token = Object.values(response).toString();
        	
		    this._userService.obtenerDatos(token).subscribe(
		        response => {
		        	//Respuesta de todos los customes
		        	
		        	var customer = Object.values(response);

		        	this.customer = customer[0];

					$(document).ready( function () {
					    $('#tablecustomer').DataTable({
			            "pageLength": 20,
				        "dom": 'Bfrtip'	    
					    });    
					} ); 


		        },
		        error =>{
		          console.log(error);
		        }
		      )


        },
        error =>{
          console.log(error);
        }
      );
  }

fireEvent(id:number)
{
if(id == 1){
	  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
	  const wb: XLSX.WorkBook = XLSX.utils.book_new();
	  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
	  
	  /* save to file */
	  XLSX.writeFile(wb, 'RegistrosActuales.xlsx');
  }
  if(id == 2 ){
	  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table2.nativeElement);
	  const wb: XLSX.WorkBook = XLSX.utils.book_new();
	  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
	  
	  /* save to file */
	  XLSX.writeFile(wb, 'RegistrosTotales.xlsx');  	
  }
}




}
