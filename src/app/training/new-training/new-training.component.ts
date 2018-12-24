import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() startTraining = new EventEmitter<void>();

  foods = [
    {value: 'benchPress', viewValue: 'Bench Press'},
    {value: 'deadlift', viewValue: 'Deadlift'},
    {value: 'squats', viewValue: 'squats'},
    {value: 'militaryPress', viewValue: 'Military Press'}
  ];

  constructor() { }

  ngOnInit() {
  }

  onStartTraining() {
    this.startTraining.emit();
  }

}
