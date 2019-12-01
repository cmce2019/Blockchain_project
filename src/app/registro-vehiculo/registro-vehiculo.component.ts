import { Component, OnInit } from '@angular/core';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';
declare let require: any;
const course_contract = require('../../../build/contracts/Estaciones.json');

@Component({
  selector: 'app-registro-vehiculo',
  templateUrl: './registro-vehiculo.component.html',
  styleUrls: ['./registro-vehiculo.component.css']
})
export class RegistroVehiculoComponent implements OnInit {


  account: string;
  accounts: string[];
  courseContract: any;
  saldo: number;
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

  async registrarVehiculo(){
    if (!this.courseContract) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      const deployedCourseContract = await this.courseContract.deployed();
      const courseContractTransaction = await deployedCourseContract.registrarVehiculo.sendTransaction(this.account,{from: this.account, value: this.saldo*1000000000000000000});  	   
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
