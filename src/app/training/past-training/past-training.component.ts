import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { MatTableDataSource } from '@angular/material';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  datasource = new MatTableDataSource<Exercise>();

  constructor(private trainingservice: TrainingService) { }

  ngOnInit() {
    this.datasource.data = this.trainingservice.getExercises();
  }

}
