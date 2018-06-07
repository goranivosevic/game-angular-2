import {
   Component,
   OnInit
} from '@angular/core';
import {
   trigger,
   style,
   transition,
   animate,
   keyframes,
   query,
   stagger
} from '@angular/animations';
import {
   DataService
} from '../data.service';
import {
   RouterLinkWithHref,
   RouterLink
} from '@angular/router';
import {
   SearchFilterPipe
} from '../filter.pipe';

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.scss'],
   animations: [

      trigger('goals', [
         transition('* => *', [

            query(':enter', style({
               opacity: 0
            }), {
               optional: true
            }),

            query(':enter', stagger('300ms', [
               animate('.6s ease-in', keyframes([
                  style({
                     opacity: 0,
                     transform: 'translateY(-75%)',
                     offset: 0
                  }),
                  style({
                     opacity: .5,
                     transform: 'translateY(35px)',
                     offset: 0.3
                  }),
                  style({
                     opacity: 1,
                     transform: 'translateY(0)',
                     offset: 1.0
                  }),
               ]))
            ]), {
               optional: true
            }),
            query(':leave', stagger('300ms', [
               animate('.6s ease-out', keyframes([
                  style({
                     opacity: 1,
                     transform: 'translateY(0)',
                     offset: 0
                  }),
                  style({
                     opacity: .5,
                     transform: 'translateY(35px)',
                     offset: 0.3
                  }),
                  style({
                     opacity: 0,
                     transform: 'translateY(-75%)',
                     offset: 1.0
                  }),
               ]))
            ]), {
               optional: true
            })
         ])
      ])

   ],
   providers: [DataService, SearchFilterPipe]
})
export class HomeComponent implements OnInit {
   itemCount: number = 4;
   btnText: string = 'Add an city';
   btnText2: string = 'See my results';
   toggleDropDown = false;
   goalText: any = '';
   goals:any = [];
   area: string = "";
   cities: string[] = [];
   filteredCities: string[] = [];
   time: number = 0;
   answers: string[] = [];
   answersCorect: number;
   minutes: number = 1;
   seconds: number = 40;


   constructor(private dataService: DataService) {}

   ngOnInit() {
      this.itemCount = this.goals.length;
      this.dataService.fetchData().subscribe(
         (data: any) => {
            this.area = data.oblast;
            this.cities = data.ponudjene;
            this.time = data.vreme;
            this.answers = data.tacno;
            this.startTime();
         }
      );
   }

   addItem() {
      var i = this.goals.indexOf(this.goalText);
      if (i > -1) {
         alert('You entered sity,already.');
      } else if (this.goalText) {
         this.toggleDropDown = false;
         this.goals.push(this.goalText);
         this.cities = this.cities.filter(city=>city !== this.goalText);
         this.goalText = '';
         this.itemCount = this.goals.length;
      }else if(i >= 0){
         this.cities.splice(i,1);
         
      } else {
         alert('Plaese enter city.')
      }

   }

   removeItem(goal, i) {
      this.goals.splice(i, 1);
      this.cities.push(goal);
      this.cities.sort();
      this.itemCount = this.goals.length;
   }

   toggle(text) {
      this.filteredCities = this.cities.filter(city => city.toLocaleLowerCase().trim().indexOf(text.toLocaleLowerCase().trim()) !== -1);
      console.log(this.filteredCities);
      this.toggleDropDown = true;
   }

   hide() {
      this.toggleDropDown = false;
   }

   selectValue(e) {
      this.goalText = e;
      this.toggleDropDown = false;

   }
   startTime() {
      var gameTime = setInterval(() => {

         if (this.time == 0) {
            clearTimeout(gameTime);
            alert('The game is over. Please, see your results.')
         } else {
            this.getMinutesAndSecondsFromSeconds();
         }
      }, 1000)
   }

   getMinutesAndSecondsFromSeconds() {
      this.time--;
      this.minutes = Math.floor(this.time / 60);
      this.seconds = this.time - this.minutes * 60;
   }

   checkResults() {
      if (this.goals.length === 0) {
         alert('Please,enter city.');
         this.answersCorect = 0;

      } else {
         var results = 0;
         this.goals.forEach(city => {
            if (this.answers.includes(city)) {
               results++;
            }
         })
         this.answersCorect = (results / this.goals.length) * 100;
         this.dataService.setResult(this.answersCorect);
         localStorage.setItem("results", this.answersCorect.toString());
      }

   }

   startGame() {
      this.startTime();
   }
}