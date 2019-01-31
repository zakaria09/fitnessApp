import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercise } from '../exercise.model';
import { MatTableDataSource } from '@angular/material';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private exChanged: Subscription;

  constructor(private trainingservice: TrainingService) { }

  ngOnInit() {
    this.exChanged = this.trainingservice.finishedExercisesOrChanged.subscribe(
      (exercises: Exercise[]) => {
      this.dataSource.data = exercises;
    });
    this.trainingservice.fetchCompletedOrFishedExercises();
  }

  ngOnDestroy() {
    this.exChanged.unsubscribe();
  }
}
