
import { Component, OnInit } from '@angular/core';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';
declare let require: any;
const course_contract = require('../../../build/contracts/Ejercicio.json');

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.css']
})
export class EjercicioComponent implements OnInit {
  fecha : string;
  longitud: number;
  latitud: number;
  caudal: number;
  courseContract: any;
  status: string;	
  data: boolean;
  accounts: string[];
  account: string;
  
  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.data=false;
    console.log('OnInit: ' + this.web3Service);
    this.watchAccount(); 	
    this.web3Service.artifactsToContract(course_contract)
      .then((course_contractAbstraction) => {
        this.courseContract = course_contractAbstraction;
        this.courseContract.deployed().then(deployed => {
          console.log(deployed);
        });

      });
  }
  
  async consultarInstructor() {
    this.data=true;
	if (!this.courseContract) {
       this.setStatus('Metacoin is not loaded, unable to send transaction');
       return;
    }
	 
    console.log('Consultando la Informacion de un Instructor');
    try {
      const deployedCourseContract = await this.courseContract.deployed();
      const infoInstructor = await deployedCourseContract.getUbicacion_Geografica.call(this.fecha);
      
      console.log('Longitud : ' + infoInstructor[0] );
	  console.log('Latitud : ' + infoInstructor[1]);
	  console.log('Caudal : ' + infoInstructor[2]);
      this.longitud=infoInstructor[0];
      this.latitud=infoInstructor[1];
      this.caudal=infoInstructor[2];
      
    } catch (e) {
      console.log(e);
      this.setStatus('Error Obteniendo la informacion del Instructor; Revisar log.');
    }
  }
  async registrarFuncionario() {
    if (!this.courseContract) {
         this.setStatus('Metacoin is not loaded, unable to send transaction');
         return;
      }
     
      console.log('Registrando');
      try {
        const deployedCourseContract = await this.courseContract.deployed();
        const infoInstructor = await deployedCourseContract.registrarFuncionario.sendTransaction(this.account,{from: this.account});
      } catch (e) {
        console.log(e);
        this.setStatus('Error registrando funcionario');
      }
    }

 async   registrarCiudadano(){
  if (!this.courseContract) {
    this.setStatus('Metacoin is not loaded, unable to send transaction');
    return;
  }
  const deployedCourseContract = await this.courseContract.deployed();
  const courseContractTransaction1 = await deployedCourseContract.registrarCiudadano.sendTransaction(this.account,{from: this.account});
}


 
  
    async registrarInstructor(){
	 if (!this.courseContract) {
       this.setStatus('Metacoin is not loaded, unable to send transaction');
       return;
     }

     this.data=false;
	
  	 console.log('Fecha: ' + this.fecha);
	 console.log('Longitud: ' + this.longitud);
   console.log('Latitud ' + this.latitud);
   console.log('Caudal ' + this.caudal);
	 
 	 this.setStatus('Inicializando transaccion... (Por favor Espere)');
	  
	  try {
      const deployedCourseContract = await this.courseContract.deployed();
      const courseContractTransaction = await deployedCourseContract.setUbicacion_Geografica.sendTransaction(this.account,this.longitud,this.latitud,this.caudal,this.fecha,{from: this.account});
	  	   
      if (!courseContractTransaction) {
        this.setStatus('Transaction Fallida!');
      } else {
        this.setStatus('Transaction Completada!');
		this.consultarInstructor();
		
      }
    } catch (e) {
      console.log(e);
      this.setStatus('Error Realizando el registro del Instructor; Ver Log.'+this.account);
    }
	
  }
  
  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.account = accounts[0];
    });
  }
 
  
  setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 3000});
  }
}
