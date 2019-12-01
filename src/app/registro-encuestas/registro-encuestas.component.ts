import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';
declare let require: any;
const course_contract = require('../../../build/contracts/Encuestas.json');


@Component({
  selector: 'app-registro-encuestas',
  templateUrl: './registro-encuestas.component.html',
  styleUrls: ['./registro-encuestas.component.css']
})
export class RegistroEncuestasComponent implements OnInit {

  
  account: string;
  preguntas: string;
  accounts: string[];
  courseContract: any;
  myForm: FormGroup;
  formValue: any;
  async addInput()  {
   const control= <FormArray> this.myForm.controls['preguntas'];
   control.push(this.fb.group({pregunta: []}));
  }
  removeInput(index: number){
    const control= <FormArray> this.myForm.controls['preguntas'];
    control.removeAt(index);
  }
   
  get getInput(){
    return this.myForm.get('preguntas') as FormArray;
  }

  async onSubmit(formvalue: any){
    if (!this.courseContract) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      this.preguntas="";
      for(let item of formvalue.preguntas){
        this.preguntas+=item.pregunta+",";
      }
      this.preguntas=(this.preguntas).slice(0,-1); 
     const deployedCourseContract = await this.courseContract.deployed();
     const courseContractTransaction = await deployedCourseContract.registrarEncuesta.sendTransaction(formvalue.nombre,this.preguntas,{from: this.account});
     // const info = await deployedCourseContract.getPreguntas.call(formvalue.nombre);
     localStorage.setItem('titulo',formvalue.nombre);
      if (!courseContractTransaction) {
        this.setStatus('Transaction Fallida!');
      } else {
        this.setStatus('Transaction Completada! ');
      }
    } catch (e) {
      console.log(e);
      this.setStatus('Error Realizando el registro de la encuesta; Ver Log.');
    }
    

  }

  constructor(private fb: FormBuilder,private web3Service: Web3Service, private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.myForm=this.fb.group({
      nombre:[''],
      preguntas: this.fb.array([this.fb.group({pregunta: ['']})]) 
    });

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

}
