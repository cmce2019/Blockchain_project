import { NgModule, Component } from '@angular/core';  
import {RouterModule,Routes} from '@angular/router';

import {AppComponent} from '../app.component';
import {EjercicioComponent} from '../ejercicio/ejercicio.component';
import {RegistroPredioComponent} from '../registro-predio/registro-predio.component';
import {RegistroPropietarioComponent} from '../registro-propietario/registro-propietario.component';
import {TransaccionPredioComponent} from '../transaccion-predio/transaccion-predio.component';
import {RegistroEncuestasComponent} from '../registro-encuestas/registro-encuestas.component';
import {LlenadoEncuestasComponent} from '../llenado-encuestas/llenado-encuestas.component';
import {VerEncuestasComponent} from '../ver-encuestas/ver-encuestas.component';
const routes: Routes =[
{path: 'home', component: AppComponent},
{path: 'registro-encuestas', component: RegistroEncuestasComponent},
{path: 'llenado-encuestas', component: LlenadoEncuestasComponent},
{path: 'registro-predio', component: RegistroPredioComponent},
{path: 'registro-propietario', component: RegistroPropietarioComponent},
{path: 'transaccion-predio', component: TransaccionPredioComponent},
{path: 'ver-encuestas', component: VerEncuestasComponent}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ], 
  exports: [RouterModule]
})
export class RouteModule { }
