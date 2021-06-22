import { RouterModule } from '@angular/router';
//Importacion de componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { PersonasfisicasComponent } from './components/personasfisicas/personasfisicas.component';
import { ReporteComponent } from './components/reporte/reporte.component';
//Definicion de rutas
const appRoutes = [
    { path: '', component: LoginComponent },
    { path: 'logout/:sure', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: 'personasfisicas', component: PersonasfisicasComponent },
    { path: 'reporte', component: ReporteComponent },
    { path: '**', component: ErrorComponent }
];
// Exportarcion de configuracion de las rutas
export const appRoutingProviders = [];
export const routing = RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map