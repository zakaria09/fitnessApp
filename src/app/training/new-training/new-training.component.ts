import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[] = [];

  constructor(private trainingservice: TrainingService) { }

  ngOnInit() {
    this.exercises = this.trainingservice.getAvailableExercises();
  }

  onStartTraining(form : NgForm) {
    this.trainingservice.startExercise(form.value.exercise);
  }

}
