import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouteModule} from './route/route.module'
import { AppComponent } from './app.component';
import {MetaModule} from './meta/meta.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';
import { StructExampleComponent } from './struct-example/struct-example.component';
import { EjercicioComponent } from './ejercicio/ejercicio.component';
import { RegistroEstacionComponent } from './registro-estacion/registro-estacion.component';
import { RegistroVehiculoComponent } from './registro-vehiculo/registro-vehiculo.component';
import { TransaccionComponent } from './transaccion/transaccion.component';
import { RegistroPredioComponent } from './registro-predio/registro-predio.component';
import { RegistroPropietarioComponent } from './registro-propietario/registro-propietario.component';
import { TransaccionPredioComponent } from './transaccion-predio/transaccion-predio.component';
import { RegistroEncuestasComponent } from './registro-encuestas/registro-encuestas.component';
import { LlenadoEncuestasComponent } from './llenado-encuestas/llenado-encuestas.component';
import { VerEncuestasComponent } from './ver-encuestas/ver-encuestas.component';


@NgModule({
  declarations: [
    AppComponent,
    StructExampleComponent,
    EjercicioComponent,
    RegistroEstacionComponent,
    RegistroVehiculoComponent,
    TransaccionComponent,
    RegistroPredioComponent,
    RegistroPropietarioComponent,
    TransaccionPredioComponent,
    RegistroEncuestasComponent,
    LlenadoEncuestasComponent,
    VerEncuestasComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MetaModule,
    RouteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
