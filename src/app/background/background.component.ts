import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Panel, Square, Cover } from '../models/models';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit, OnDestroy {
  ngUnsubscribe: Subject<void> = new Subject<void>();
  panels: Observable<Panel[]>;
  squares: Observable<Square[]>;
  cover: Observable<Cover>;

  constructor(
    private layout: LayoutService
  ) { }

  ngOnInit() {
    this.panels = this.layout.panels;
    this.squares = this.layout.squares;
    this.cover = this.layout.cover;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  toggleMovement() {
    this.layout.toggleEnabled();
  }

}
