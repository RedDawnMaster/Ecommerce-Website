import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/controller/user/user.service';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public validateUsername!: boolean;
  public validateEmail!: boolean;
  public validateFirstName!: boolean;
  public validateLastName!: boolean;
  public validatePassword!: boolean;
  public validateBirthDate!: boolean;
  public validateExistence!: boolean;
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    this.user = new User();
    this.validateUsername = true;
    this.validateEmail = true;
    this.validateFirstName = true;
    this.validateLastName = true;
    this.validatePassword = true;
    this.validateBirthDate = true;
    this.validateExistence = true;
  }

  register() {
    if (this.validateForm()) {
      this.userService.register().subscribe({
        next: (user) => {
          if (user === null) this.validateExistence = false;
          else this.router.navigate(['../login']);
        },
        error: (error) => console.log(error),
      });
    }
  }

  validateForm(): boolean {
    let counter = 0;
    if (this.user.username === undefined || this.user.username === '') {
      this.validateUsername = false;
      counter++;
    } else this.validateUsername = true;
    if (this.user.email === undefined || this.user.email === '') {
      this.validateEmail = false;
      counter++;
    } else this.validateEmail = true;
    if (this.user.firstName === undefined || this.user.firstName === '') {
      this.validateFirstName = false;
      counter++;
    } else this.validateFirstName = true;
    if (this.user.lastName === undefined || this.user.lastName === '') {
      this.validateLastName = false;
      counter++;
    } else this.validateLastName = true;
    if (this.user.password === undefined || this.user.password === '') {
      this.validatePassword = false;
      counter++;
    } else this.validatePassword = true;
    if (this.user.birthDate === undefined) {
      this.validateBirthDate = false;
      counter++;
    } else this.validateBirthDate = true;
    if (counter === 0) return true;
    else return false;
  }

  public get selectedUser(): User {
    return this.userService.selectedUser;
  }
  public set selectedUser(value: User) {
    this.userService.selectedUser = value;
  }
  public get user(): User {
    return this.userService.user;
  }
  public set user(value: User) {
    this.userService.user = value;
  }
}
