import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer;

  constructor(private dialog: MatDialog, private trainingservice: TrainingService) { }

  ngOnInit() {
    this.resumeOrStop()
  }

  resumeOrStop() {
    // .duration is in the training service
    const step = this.trainingservice.getRunningExercise().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if(this.progress >= 100) {
        this.trainingservice.completeExercise();
        clearInterval(this.timer);
      }
    }, step)
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      // this is how to pass data through a material dialog
      data: {
        progress: this.progress
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.trainingservice.cancelExercise(this.progress);
        } else {
          this.resumeOrStop();
        }
      });
  }

}
