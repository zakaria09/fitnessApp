import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() startTraining = new EventEmitter<void>();
  exercises: Exercise[] = [];

  constructor(private trainingservice: TrainingService) { }

  ngOnInit() {
    this.exercises = this.trainingservice.getAvailableExercises();
  }

  onStartTraining() {
    this.startTraining.emit();
  }

}
