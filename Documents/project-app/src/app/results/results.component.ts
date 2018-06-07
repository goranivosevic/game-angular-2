import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  providers:[DataService]
})
export class ResultsComponent implements OnInit {
answerCorect: string;
resultSubscription: Subscription;
   constructor(private dataService:DataService) { }

  ngOnInit() {
   this.answerCorect = localStorage.getItem('results');
   document.getElementById('myBar').style.width = this.answerCorect + '%';
   }

}
