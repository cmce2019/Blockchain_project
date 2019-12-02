import { Component, OnInit } from '@angular/core';
import { Chart   } from "chart.js";
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';
declare let require: any;
const course_contract = require('../../../build/contracts/Encuestas.json');
@Component({
  selector: 'app-ver-encuestas',
  templateUrl: './ver-encuestas.component.html',
  styleUrls: ['./ver-encuestas.component.css']
})
export class VerEncuestasComponent implements OnInit {
  courseContract: any;
  chart=[];
  arraynombres=[];
  valores=[];
  accounts: string[];
  account: string;
  numeros=[1,2,3,4];


  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar) { }
 async ngOnInit() {

      
    this.watchAccount(); 	
    this.web3Service.artifactsToContract(course_contract)
      .then((course_contractAbstraction) => {
        this.courseContract = course_contractAbstraction;
        this.courseContract.deployed().then(deployed => {
          console.log("esta aaa "+deployed);
        });

      });


    this.chart = new Chart('canvas',{
			type: 'pie',
			data: {
				datasets: [{
					data: [],
					backgroundColor: [
					],
					label: 'Dataset 1'
				}],
		
 
      labels: [
      ],
    },
			options: {
				responsive: true
			}
    });


    const a = (JSON.parse(localStorage.getItem('titulo'))).toString();
    this.arraynombres=a.split(",");

  }
    
async addData(chart) {
  try {
  const deployedCourseContract = await this.courseContract.deployed();
  for(let item of this.arraynombres){
    const info = await deployedCourseContract.getNumRespuestas.call(item);
    chart.data.labels.push(item);
    this.valores.push(info);
  }
    

    chart.data.datasets.forEach((dataset) => {
      for(let item of this.valores){
        dataset.backgroundColor.push(this.getRandomColor());
        dataset.data.push(item);
      }
    });
    chart.update();
  } catch (e) {
    console.log("error "+e);

  }
}

getRandomColor() {
  var color = Math.floor(0x1000000 * Math.random()).toString(16);
  return '#' + ('000000' + color).slice(-6);
}


watchAccount() {
  this.web3Service.accountsObservable.subscribe((accounts) => {
    this.accounts = accounts;
    this.account = accounts[0];
  });
}
  

}
