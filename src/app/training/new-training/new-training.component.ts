import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs' 

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<any>;

  constructor(private trainingservice: TrainingService, private db: AngularFirestore) { }

  ngOnInit() {
    this.exercises = this.db.collection('availableExercises').valueChanges();
  }

  onStartTraining(form : NgForm) {
    this.trainingservice.startExercise(form.value.exercise);
  }

}
