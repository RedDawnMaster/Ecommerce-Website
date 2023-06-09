import { Component, OnInit } from '@angular/core';
import { StatisticService } from 'src/app/controller/statistic/statistic.service';
import { UserService } from 'src/app/controller/user/user.service';
import { Statistic } from 'src/app/model/statistic/statistic';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  constructor(
    private statisticService: StatisticService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    this.statisticService
      .findById()
      .subscribe({ next: (statistic) => (this.statistic = statistic) });
  }

  public get statistic(): Statistic {
    return this.statisticService.statistic;
  }
  public set statistic(value: Statistic) {
    this.statisticService.statistic = value;
  }

  public get user(): User {
    return this.userService.user;
  }
  public set user(value: User) {
    this.userService.user = value;
  }
}
