import { Component, OnInit } from '@angular/core';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';
declare let require: any;
const course_contract = require('../../../build/contracts/Estaciones.json');

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})
export class TransaccionComponent implements OnInit {
  account: string;
  direccion: string;
  accounts: string[];
  saldoE: number;
  saldoV: number;
  saldoG: number;
  saldoB: number;
  courseContract: any;
  cantidadgalones: number;
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
  async transferirGas(){
    if (!this.courseContract) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      const deployedCourseContract = await this.courseContract.deployed();
      const courseContractTransaction = await deployedCourseContract.cargarGas.sendTransaction(this.direccion,this.account,this.cantidadgalones,{from: this.account});

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

async obtenerSaldoV(){
  if (!this.courseContract) {
    this.setStatus('Metacoin is not loaded, unable to send transaction');
    return;
  }
  try {
    const deployedCourseContract = await this.courseContract.deployed();
    const info = await deployedCourseContract.getSaldoV.call(this.account );
    this.saldoG=info;
      console.log("saldo "+info);
  } catch (e) {
    console.log(e);
    this.setStatus('Error Realizando el registro del vehiculo; Ver Log.');
  }   
}
async obtenerSaldoE(){
  if (!this.courseContract) {
    this.setStatus('Metacoin is not loaded, unable to send transaction');
    return;
  }
  try {
    const deployedCourseContract = await this.courseContract.deployed();
    const info = await deployedCourseContract.getSaldoG.call(this.account);
    this.saldoB=info;
      console.log("saldo "+info);
  } catch (e) {
    console.log(e);
    this.setStatus('Error Realizando el registro del vehiculo; Ver Log.');
  }   
}
}
