import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../services/layout.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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

    this.layout.change(this.layout.buildDefaultLayoutConfig());
  }
}
