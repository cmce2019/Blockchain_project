import { Component, OnInit } from '@angular/core';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';
declare let require: any;
const course_contract = require('../../../build/contracts/Estaciones.json');

@Component({
  selector: 'app-registro-estacion',
  templateUrl: './registro-estacion.component.html',
  styleUrls: ['./registro-estacion.component.css']
})
export class RegistroEstacionComponent implements OnInit {

  account: string;
  accounts: string[];
  courseContract: any;
  precioxgalon: number;
  nombre: string;
  nombregas: string;
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

    
  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.account = accounts[0];
    });
  }

  setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 3000});
  }
  async registrarEstacion(){
    if (!this.courseContract) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      const deployedCourseContract = await this.courseContract.deployed();
      const courseContractTransaction = await deployedCourseContract.registrarEstacion.sendTransaction(this.nombre,this.account,{from: this.account});
      const course_contractT= await deployedCourseContract.registrarTipoDeGasolina.sendTransaction(this.nombregas,this.precioxgalon*10000000000000,this.account,{from: this.account})
	  	   
      if (!courseContractTransaction) {
        this.setStatus('Transaction Fallida!');
      } else {
        this.setStatus('Transaction Completada!');
      }
    } catch (e) {
      console.log(e);
      this.setStatus('Error Realizando el registro del vehiculo; Ver Log.');
    }


  }
}
