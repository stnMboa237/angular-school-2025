import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { People } from "../shared/models/people.model";
import { catchError, EMPTY, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class PeopleService {

    private readonly httpClient = inject(HttpClient)

    getRandomInteger(maxValue: number): number {
        return Math.floor(Math.random() * maxValue);
    }

    getPeoples(): Observable<People[]> {
        return this.httpClient.get<People[]>(`${environment.peopleBaseApi}/peoples`).pipe(
            catchError((err) => {
                console.error(err);
                return EMPTY;
            })
        );
    }

    getPeopleById(routeId: string): Observable<People> {
        return this.httpClient.get<People>(`${environment.peopleBaseApi}/peoples/${routeId}`).pipe(
            catchError(err => {
                console.error(err);
                return EMPTY;
            })
        );
    }

    deletePeople(id: string): Observable<People[]> {
        return this.httpClient.delete<People[]>(`${environment.peopleBaseApi}/peoples/${id}`).pipe(
            catchError(err => {
                console.error(err);
                return EMPTY;
            })
        );
    }

    getRandomPeople(): Observable<People> {
        return this.httpClient.get<People>(`${environment.peopleBaseApi}/peoples/random`).pipe(
            catchError((err) => {
                console.error(err);
                return EMPTY;
            })
        );
    }

}
