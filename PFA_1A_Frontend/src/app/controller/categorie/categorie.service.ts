import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from 'src/app/model/categorie/categorie';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  private API = '';
  constructor(private http: HttpClient) {
    this.API = environment.apiUrl + '/categorie/';
  }

  private _selectedCategorie!: Categorie;
  private _categories!: Array<Categorie>;

  public findAll(): Observable<Array<Categorie>> {
    return this.http.get<Array<Categorie>>(this.API);
  }

  public deleteByLabel(label: string): Observable<number> {
    return this.http.delete<number>(this.API + label);
  }

  public save(): Observable<Categorie> {
    return this.http.post<Categorie>(this.API, this.selectedCategorie);
  }

  public update(): Observable<number> {
    return this.http.put<number>(this.API, this.selectedCategorie);
  }

  public get selectedCategorie(): Categorie {
    return this._selectedCategorie;
  }
  public set selectedCategorie(value: Categorie) {
    this._selectedCategorie = value;
  }
  public get categories(): Array<Categorie> {
    return this._categories;
  }
  public set categories(value: Array<Categorie>) {
    this._categories = value;
  }
}
