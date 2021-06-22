import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";
import { HttpClientModule } from '@angular/common/http'; 

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { PersonasfisicasComponent } from './components/personasfisicas/personasfisicas.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    PersonasfisicasComponent,
    ReporteComponent
    
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    DataTablesModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
