import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/Subject'
import { AngularFirestore } from '@angular/fire/firestore';
import 'rxjs/add/operator/map'
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exericesChanged = new Subject<Exercise[]>();
    finishedExercisesOrChanged = new Subject<Exercise[]>();
    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;
    private fbSubs: Subscription[] = [];

    constructor(private db: AngularFirestore) {}

    fetchAvailableExercises() {
        this.fbSubs.push(this.db
            .collection('availableExercises')
            .snapshotChanges()
            .map(docArray => {
                return docArray.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        name: doc.payload.doc.data()['name'],
                        duration: doc.payload.doc.data()['duration'],
                        calories: doc.payload.doc.data()['calories']
                    };
                });
            }).subscribe((exercise: Exercise[]) => {
                this.availableExercises = exercise,
                this.exericesChanged.next([...this.availableExercises])
            }));
    }

    // https://www.udemy.com/angular-full-app-with-angular-material-angularfire-ngrx/learn/v4/questions/5588112
    // issues with typscript type operator 

    startExercise(selectedId: string) {
        const selectedExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.runningExercise = selectedExercise;
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    completeExercise() {
        this.addDateToDatabase({
            ...this.runningExercise, 
            date: new Date(), 
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.addDateToDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration / (progress * 100),
            calories: this.runningExercise.calories / (progress * 100),
            date: new Date(), 
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    fetchCompletedOrFishedExercises() {
        this.fbSubs.push(this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
            this.finishedExercisesOrChanged.next(exercises);
        }));
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDateToDatabase(exercise : Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }
}