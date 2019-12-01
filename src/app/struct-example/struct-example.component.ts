import { Component, OnInit } from '@angular/core';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';
declare let require: any;
const course_contract = require('../../../build/contracts/Courses.json');

@Component({
  selector: 'app-struct-example',
  templateUrl: './struct-example.component.html',
  styleUrls: ['./struct-example.component.css']
})
export class StructExampleComponent implements OnInit {
  nombre : string;
  apellido: string;
  edad : number;
  courseContract: any;
  status: string;	
  accounts: string[];
  account: string;
  
  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
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
	if (!this.courseContract) {
       this.setStatus('Metacoin is not loaded, unable to send transaction');
       return;
    }
	 
    console.log('Consultando la Informacion de un Instructor');
    try {
      const deployedCourseContract = await this.courseContract.deployed();
      const infoInstructor = await deployedCourseContract.getInstructor.call(this.account);
      console.log('Respuesta Edad Instructor : ' + infoInstructor[0]);
	  console.log('Respuesta Nombre Instructor : ' + infoInstructor[1]);
	  console.log('Respuesta Apellido Instructor : ' + infoInstructor[2]);
	  
      
    } catch (e) {
      console.log(e);
      this.setStatus('Error Obteniendo la informacion del Instructor; Revisar log.');
    }
  }

 
  
    async registrarInstructor(){
	 if (!this.courseContract) {
       this.setStatus('Metacoin is not loaded, unable to send transaction');
       return;
     }
	
  	 console.log('Nombre ' + this.nombre);
	 console.log('Apellido ' + this.apellido);
	 console.log('Edad ' + this.edad);
	 
 	 this.setStatus('Inicializando transaccion... (Por favor Espere)');
	  
	  try {
      const deployedCourseContract = await this.courseContract.deployed();
      const courseContractTransaction = await deployedCourseContract.setInstructor.sendTransaction(this.account,this.edad,this.nombre,this.apellido,{from: this.account});
	  	   
      if (!courseContractTransaction) {
        this.setStatus('Transaction Fallida!');
      } else {
        this.setStatus('Transaction Completada!');
		this.consultarInstructor();
		
      }
    } catch (e) {
      console.log(e);
      this.setStatus('Error Realizando el registro del Instructor; Ver Log.');
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
