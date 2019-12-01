import { Component, OnInit } from '@angular/core';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';
declare let require: any;
const course_contract = require('../../../build/contracts/ProyectoPredio.json');
@Component({
  selector: 'app-registro-predio',
  templateUrl: './registro-predio.component.html',
  styleUrls: ['./registro-predio.component.css']
})
export class RegistroPredioComponent implements OnInit {
  account: string;
  accounts: string[];
  courseContract: any;
  acc: string;
  dirfisica: string;
  numpisos: string;
  area: number;
  nombrematerial: string;
  pisosG: number;
  direccionA: string;
  materialesG: number;
  nombreG: string;
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

  async registrarPredio(){
    if (!this.courseContract) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      const deployedCourseContract = await this.courseContract.deployed();
      const courseContractTransaction = await deployedCourseContract.registrarPredio.sendTransaction(this.acc,this.area,this.dirfisica,this.numpisos,{from: this.account});  	   
      const al1= await deployedCourseContract.registrarPropietarioAUnPredio.sendTransaction(this.acc,this.account,{from: this.account});
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
  async registrarMaterialPredio(){
    if (!this.courseContract) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      const deployedCourseContract = await this.courseContract.deployed();
      const courseContractTransaction = await deployedCourseContract.registrarMaterial.sendTransaction(this.acc,this.nombrematerial,{from: this.account});  	  
   
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
  async registrarPisoPredio(){
    if (!this.courseContract) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      const deployedCourseContract = await this.courseContract.deployed();
      const courseContractTransaction = await deployedCourseContract.crearPisoEnUnPredio.sendTransaction(this.acc,{from: this.account});  	   
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

  async obtenerPisos(){
    if (!this.courseContract) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      const deployedCourseContract = await this.courseContract.deployed();
      const info = await deployedCourseContract.numeroDePisosDeUnPredio.call(this.direccionA);
      this.pisosG=info;
        console.log("saldo "+info);
    } catch (e) {
      console.log(e);
      this.setStatus('Error Realizando el registro del vehiculo; Ver Log.');
    }   
  }
  async obtenerMateriales(){
    if (!this.courseContract) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      const deployedCourseContract = await this.courseContract.deployed();
      const info = await deployedCourseContract.numeroDeMateriales.call(this.direccionA);
      this.materialesG=info;
        console.log("saldo "+info);
    } catch (e) {
      console.log(e);
      this.setStatus('Error Realizando el registro del vehiculo; Ver Log.');
    }   
  }
  async obtenerDueno(){
    if (!this.courseContract) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      const deployedCourseContract = await this.courseContract.deployed();
      const info = await deployedCourseContract.nombrePropietario.call(this.direccionA);
      this.nombreG=info;
        console.log("saldo "+info);
    } catch (e) {
      console.log(e);
      this.setStatus('Error Realizando el registro del vehiculo; Ver Log.');
    }   
  }


}
