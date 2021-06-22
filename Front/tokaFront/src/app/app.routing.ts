//Archivo para rutas de angular
//Necesarios
import{ ModuleWithProviders } from '@angular/core';
import{ Routes, RouterModule } from '@angular/router';
//Importacion de componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { PersonasfisicasComponent } from './components/personasfisicas/personasfisicas.component';
import { ReporteComponent } from './components/reporte/reporte.component';


//Definicion de rutas
const appRoutes: Routes = [
	{path: '', component: LoginComponent},
	{path: 'logout/:sure', component: LoginComponent},	
	{path: 'registro', component: RegisterComponent},
	{path: 'personasfisicas', component: PersonasfisicasComponent},
	{path: 'reporte', component: ReporteComponent},	
	{path: '**', component: ErrorComponent}	
];
// Exportarcion de configuracion de las rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);