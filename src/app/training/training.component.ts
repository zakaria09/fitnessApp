import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  onGoingTraining = false;
  trainingSubscription: Subscription;

  constructor(private trainingservice: TrainingService) { }

  ngOnInit() {
    this.trainingSubscription = this.trainingservice.exerciseChanged.subscribe(newExercise => {
      if(newExercise) {
        this.onGoingTraining = true;
      } else {
        this.onGoingTraining = false;
      }
    });
  }

}
