import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';
import { IndexInfo } from 'typescript';
declare let require: any;
const course_contract = require('../../../build/contracts/Encuestas.json');

@Component({
  selector: 'app-llenado-encuestas',
  templateUrl: './llenado-encuestas.component.html',
  styleUrls: ['./llenado-encuestas.component.css']
})
export class LlenadoEncuestasComponent implements OnInit {
  nombre: String;
  name: String;
  seleccionado: String;
  index: number;
  account: string;
  preguntas: string;
  accounts: string[];
  array: string[];
  array_preguntas: string[];
  courseContract: any;
  myForm: FormGroup;
  selectedValue;
  options = [
    {
      value: 1,
      name : "Si"
    },
    {
      value: 2,
      name : "No"
    }
  ];
  registro(index_:number){
   this.array_preguntas[index_]=this.options.toString();
   this.setStatus("sdsa" +this.array_preguntas);
  }

  ngOnInit() {
    this.selectedValue="hola";
    this.nombre=localStorage.getItem('titulo');
    this.watchAccount(); 	
    this.web3Service.artifactsToContract(course_contract)
      .then((course_contractAbstraction) => {
        this.courseContract = course_contractAbstraction;
        this.courseContract.deployed().then(deployed => {
          console.log(deployed);
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

  async getForm(){
    const deployedCourseContract = await this.courseContract.deployed();
    const info = await deployedCourseContract.getPreguntas.call(this.nombre);
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

}
