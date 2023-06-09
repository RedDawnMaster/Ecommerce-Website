import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Statistic } from 'src/app/model/statistic/statistic';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  private API = '';
  constructor(private http: HttpClient) {
    this.API = environment.apiUrl + '/statistic/';
  }

  private _statistic!: Statistic;

  public findById(): Observable<Statistic> {
    return this.http.get<Statistic>(this.API);
  }

  public get statistic(): Statistic {
    return this._statistic;
  }
  public set statistic(value: Statistic) {
    this._statistic = value;
  }
}
