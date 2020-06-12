import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../services/layout.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-story-about-waking',
  templateUrl: './story-about-waking.component.html',
  styleUrls: ['./story-about-waking.component.scss']
})
export class StoryAboutWakingComponent implements OnInit {
  show: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private layout: LayoutService
  ) { }

  ngOnInit() {
    this.show = this.route.queryParamMap
      .pipe(
        map(x => x.get('show')),
        map(x => (x === '0') ? false : true),
        startWith(true)
      );

    this.layout.change({
      coverConfig: null,
      panelConfig: {
        frequency: { min: 50, max: 70 },
        colors: ['#F2357B', '#0460D9', '#F2DA00', '#00CA5D', '#C20078'],
        rows: { min: 2, max: 9 },
        cols: { min: 2, max: 7 }
      },
      squareConfig: {
        frequency: { min: 15, max: 35 },
        colors: ['#FFFB8F', '#EBCD9F', 'grey', '#FF4E00', '#EB3200', 'white', '#E1FF00'],
        rows: { min: 1, max: 6 },
        rowMultiplier: 16,
        cols: { min: 1, max: 7 },
        colMultiplier: 14,
        opacity: { min: 35, max: 80 },
      }
    });
  }
}
