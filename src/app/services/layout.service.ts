import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, combineLatest, interval } from 'rxjs';
import { filter, withLatestFrom, map, startWith } from 'rxjs/operators';
import { LayoutConfig, Cover, Square, Panel, PanelConfig, SquareConfig } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private _refreshStream: Subject<LayoutConfig>;
  private _toggleEnabledStream: Subject<void> = new Subject<void>();
  private _enabledStream: BehaviorSubject<boolean>;
  private _coverStream: BehaviorSubject<Cover>;
  private _squaresStream: BehaviorSubject<Square[]>;
  private _panelStream: BehaviorSubject<Panel[]>;

  public cover: Observable<Cover>;
  public squares: Observable<Square[]>;
  public panels: Observable<Panel[]>;

  constructor() {
    this._coverStream = new BehaviorSubject(null);
    this._squaresStream = new BehaviorSubject(null);
    this._panelStream = new BehaviorSubject(null);
    this._enabledStream = new BehaviorSubject(true);
    this._toggleEnabledStream = new Subject();
    this._refreshStream = new Subject();

    this.cover = this._coverStream.asObservable().pipe(filter(x => !!x));
    this.squares = this._squaresStream.asObservable().pipe(filter(x => !!x));
    this.panels = this._panelStream.asObservable().pipe(filter(x => !!x));

    this._toggleEnabledStream
      .pipe(
        withLatestFrom(this._enabledStream),
        map(x => x[1])
      )
      .subscribe(x => {
        this._enabledStream.next(!x);
      });

    combineLatest(
      interval(this.randNumber(200, 500)).pipe(startWith(null)),
      this._refreshStream,
      this._enabledStream
    )
    .pipe(
      filter(x => !!x[2]),
      map(x => ({ config: x[1], interval: x[0] })),
      filter(x => {
        return !x.interval
          || this.randNumber(0, 100) > this.randNumber(x.config.panelConfig.frequency.min, x.config.panelConfig.frequency.max);
      }),
      map(x => {
        return this.generatePanels(x.config.panelConfig);
      })
    )
    .subscribe(x => {
      this._panelStream.next(x);
    });

    combineLatest(
      interval(this.randNumber(75, 250)).pipe(startWith(null)),
      this._refreshStream,
      this._enabledStream
    )
    .pipe(
      filter(x => !!x[2]),
      map(x => ({ config: x[1], interval: x[0] })),
      filter(x => {
        return !x.interval
          || this.randNumber(0, 100) > this.randNumber(x.config.squareConfig.frequency.min, x.config.squareConfig.frequency.max);
      }),
      map(x => {
        return this.generateRandomSquares(x.config.squareConfig);
      })
    )
    .subscribe(x => {
      this._squaresStream.next(x);
    });

    combineLatest(
      interval(this.randNumber(200, 500)).pipe(startWith(null)),
      this._refreshStream,
      this._enabledStream
    )
    .pipe(
      filter(x => !!x[2]),
      map(x => ({ config: x[1], interval: x[0] })),
      filter(x => {
        return !x.interval
          || !x.config
          || !x.config.coverConfig
          || this.randNumber(0, 100) > this.randNumber(x.config.coverConfig.frequency.min, x.config.coverConfig.frequency.max);
      }),
      map(x => {
        if (!x.config || !x.config.coverConfig) {
          return null as Cover;
        } else {
          return {
            opacity: this.randOpacity(x.config.coverConfig.opacity.min, x.config.coverConfig.opacity.max)
          };
        }
      })
    )
    .subscribe(x => {
      this._coverStream.next(x);
    });
  }

  public change(config: LayoutConfig) {
    this._refreshStream.next(config);
  }

  public buildDefaultLayoutConfig(): LayoutConfig {
    return {
      coverConfig: null,
      panelConfig: {
        frequency: { min: 50, max: 70 },
        colors: ['green', 'yellow', 'orange', 'blue'],
        rows: { min: 2, max: 9 },
        cols: { min: 2, max: 7 }
      },
      squareConfig: {
        frequency: { min: 15, max: 35 },
        colors: ['green', 'yellow', 'orange', 'blue', 'red', 'white', 'orange', 'red', 'grey', 'pink'],
        rows: { min: 1, max: 4 },
        rowMultiplier: 25,
        cols: { min: 1, max: 5 },
        colMultiplier: 20,
        opacity: { min: 35, max: 80 },
      }
    };
  }

  public toggleEnabled() {
    this._toggleEnabledStream.next();
  }

  private generatePanels(config: PanelConfig): Panel[] {
    const newPanels: Panel[] = [];

    const rows = this.randNumber(config.rows.min, config.rows.max);
    const cols = this.randNumber(config.cols.min, config.cols.max);

    let cy = 0;
    let ay = 0;
    const defaultHeight = 100.0 / rows;

    while (cy <= rows - 1) {
      const height = (cy === rows - 1) ? (100 - ay) : defaultHeight;
      let cx = 0;
      let ax = 0;
      const defaultWidth = 100.0 / cols;
      while (cx <= cols - 1) {
        const width = (cx === cols - 1) ? (100 - ax) : defaultWidth;
        const rndColor = config.colors[this.randNumber(0, config.colors.length - 1)];
        const panel: Panel = {
          bgColor: rndColor,
          left: ax + '%',
          top: ay + '%',
          width: width + '%',
          height: height + '%',
          opacity: this.randOpacity(80, 100),
        };
        newPanels.push(panel);
        ax += width;
        cx += 1;
      }
      ay += height;
      cy += 1;
    }

    if (this.randNumber(0, 1) === 1) {
      return newPanels.reverse();
    } else {
      return newPanels;
    }
  }

  private generateRandomSquares(config: SquareConfig) {
    const newSquares: Square[] = [];

    const rows = this.randNumber(config.rows.min, config.rows.max) * config.rowMultiplier;
    const cols = this.randNumber(config.cols.min, config.cols.max) * config.colMultiplier;

    let cy = 0;
    let ay = 0;
    const defaultHeight = 100.0 / rows;

    while (cy <= rows - 1) {
      const height = (cy === rows - 1) ? (100 - ay) : defaultHeight;
      let cx = 0;
      let ax = 0;
      const defaultWidth = 100.0 / cols;
      while (cx <= cols - 1) {
        const width = (cx === cols - 1) ? (100 - ax) : defaultWidth;
        const rndColor = config.colors[this.randNumber(0, config.colors.length - 1)];
        const sq: Square = {
          bgColor: rndColor,
          opacity: this.randOpacity(config.opacity.min, config.opacity.max),
          left: ax + '%',
          top: ay + '%',
          width: width + '%',
          height: height + '%'
        };
        newSquares.push(sq);
        ax += width;
        cx += 1;
      }
      ay += height;
      cy += 1;
    }

    if (this.randNumber(0, 1) === 1) {
      return newSquares.reverse();
    } else {
      return newSquares;
    }
  }

  private randNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private randOpacity(min: number, max: number): number {
    return this.randNumber(min, max) / 100.0;
  }
}
