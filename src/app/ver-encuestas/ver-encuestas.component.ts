import { Component, OnInit } from '@angular/core';
import { Chart   } from "chart.js";
@Component({
  selector: 'app-ver-encuestas',
  templateUrl: './ver-encuestas.component.html',
  styleUrls: ['./ver-encuestas.component.css']
})
export class VerEncuestasComponent implements OnInit {

  chart=[];
  numero=14;
  constructor() { }
  ngOnInit() {
    this.chart = new Chart('canvas',{
			type: 'pie',
			data: {
				datasets: [{
					data: [
						1,
						2,
						2,
						3,
						this.numero,
					],
					backgroundColor: [
					'red',
					'orange',
						'yellow',
            'green',
						'blue',
					],
					label: 'Dataset 1'
				}],
				labels: [
					'Red',
					'Orange',
					'Yellow',
					'Green',
					'Blue'
				]
			},
			options: {
				responsive: true
			}
		});
  }

}
