import { Component } from '@angular/core';
import { UserService } from 'src/app/controller/user/user.service';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent {
  constructor(private userService: UserService) {}

  removeFromWishList(label: string) {
    this.userService.removeFromWishList(label).subscribe({
      next: () => {
        let index = this.user.wishList.findIndex((p) => p.label === label);
        this.user.wishList.splice(index, 1);
      },
      error: (error) => console.log(error),
    });
  }

  public get user(): User {
    return this.userService.user;
  }
  public set user(value: User) {
    this.userService.user = value;
  }
}
