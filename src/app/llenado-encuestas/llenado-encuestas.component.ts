import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';
declare let require: any;
const course_contract = require('../../../build/contracts/Encuestas.json');

@Component({
  selector: 'app-llenado-encuestas',
  templateUrl: './llenado-encuestas.component.html',
  styleUrls: ['./llenado-encuestas.component.css']
})
export class LlenadoEncuestasComponent implements OnInit {
  nombre=String;
  arraynombres: String[];
  name: String;
  seleccionado: String;
  index: number;
  account: string;
  preguntas: string;
  accounts: string[];
  array: string[];
  array_preguntas: boolean[];
  courseContract: any;
  myForm: FormGroup;
  selectedValue: string;
  respuestas: string;
  ind:number;
  options = [
    {
      value: true,
      name : "Si"
    },
    {
      value: false,
      name : "No"
    }
  ];
  registro(index_:number, id: boolean){
    this.array_preguntas[index_]=id;
   alert (this.array_preguntas[index_]);
  }

  ngOnInit() {
    const a = (JSON.parse(localStorage.getItem('titulo'))).toString();
    this.arraynombres=a.split(",");
    this.array_preguntas=[];
  
    this.watchAccount(); 	
    this.web3Service.artifactsToContract(course_contract)
      .then((course_contractAbstraction) => {
        this.courseContract = course_contractAbstraction;
        this.courseContract.deployed().then(deployed => {
          console.log("estaaa "+deployed);
        });

      });
      
  }
  constructor(private fb: FormBuilder,private web3Service: Web3Service, private matSnackBar: MatSnackBar) { }
  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.account = accounts[0];
    });
  }
  setStatus(status) {
    this.matSnackBar.open(status, null, {duration: 3000});
  }

  async getForm(index: number){
    this.ind=index;
    const deployedCourseContract = await this.courseContract.deployed();
    const info = await deployedCourseContract.getPreguntas.call(this.arraynombres[index]);
    this.myForm=this.fb.group({
      preguntas: this.fb.array([this.fb.group({})]) 
    });
    this.array=info.split(",");
    const control= <FormArray> this.myForm.controls['preguntas'];
    this.index=0;
    for(let item of this.array){
      if (this.index==0){
        control.removeAt(this.index);
        control.push(this.fb.group({pregunta: [item]})); 
        this.index++;
      }else{
      control.push(this.fb.group({pregunta: [item]})); 
      this.index++;
    }  
    }
  }

  async onSubmit(){
    if (!this.courseContract) {
      this.setStatus('Metacoin is not loaded, unable to send transaction');
      return;
    }
    try {
      this.respuestas="";
      for(let item of this.array_preguntas){
        this.respuestas+=item+"-"+this.arraynombres[this.ind] +",";
      }
     this.respuestas=(this.respuestas).slice(0,-1); 
     const deployedCourseContract = await this.courseContract.deployed();
     const courseContractTransaction = await deployedCourseContract.setRespuesta.sendTransaction(this.arraynombres[this.ind],this.respuestas,{from: this.account});
     const info = await deployedCourseContract.getNumRespuestas.call(this.arraynombres[this.ind]);
     
     alert(info);
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

}
