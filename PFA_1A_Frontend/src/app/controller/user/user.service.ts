import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user/user';
import { environment } from 'src/environment/environment';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API = '';
  private readonly USER_COOKIE_KEY = 'user';
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.API = environment.apiUrl + '/user/';
  }

  private _user!: User;
  private _selectedUser!: User;
  private _users!: Array<User>;

  public login(email: string, password: string): Observable<User> {
    return this.http.get<User>(this.API + email + '/' + password).pipe(
      map((user: User) => {
        if (user !== null)
          this.cookieService.set(this.USER_COOKIE_KEY, JSON.stringify(user));
        this.user = user;
        return user;
      })
    );
  }

  getUser(): any {
    const user = this.cookieService.get(this.USER_COOKIE_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return undefined;
  }

  clearUser(): void {
    this.cookieService.delete(this.USER_COOKIE_KEY);
    this.user = undefined!;
  }

  public findByUsernameContains(username: string): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.API + 'username/' + username);
  }

  public findByEmailContains(email: string): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.API + 'email/' + email);
  }

  public findByRole(role: string): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.API + role);
  }

  public findAll(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.API);
  }

  public addToWishList(label: string): Observable<number> {
    return this.http.get<number>(
      this.API + 'addToWishList/' + this.user.username + '/' + label
    );
  }

  public removeFromWishList(label: string): Observable<void> {
    return this.http.get<void>(
      this.API + 'removeFromWishList/' + this.user.username + '/' + label
    );
  }

  public deleteByUsername(username: string): Observable<number> {
    return this.http.delete<number>(this.API + username);
  }

  public register(): Observable<User> {
    return this.http.post<User>(this.API, this.user);
  }

  public update(): Observable<number> {
    return this.http.put<number>(this.API, this.user);
  }

  public get selectedUser(): User {
    return this._selectedUser;
  }
  public set selectedUser(value: User) {
    this._selectedUser = value;
  }
  public get user(): User {
    return this._user;
  }
  public set user(value: User) {
    this._user = value;
  }
  public get users(): Array<User> {
    return this._users;
  }
  public set users(value: Array<User>) {
    this._users = value;
  }
}
