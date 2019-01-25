import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 20;
      if(this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000)
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
        console.log(result);
      });
  }

}
