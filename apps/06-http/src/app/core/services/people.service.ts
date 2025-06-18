import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { People, PeopleForm } from "../../shared/models/people.model";
import { catchError, EMPTY, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class PeopleService {
    private readonly httpClient = inject(HttpClient)

    getRandomInteger(maxValue: number): number {
        return Math.floor(Math.random() * maxValue);
    }

    getPeoples(): Observable<People[]> {
        return this.httpClient.get<People[]>(`${environment.peopleBaseApi}/peoples`);
        // .pipe(
        //     catchError(err => {
        //         console.error(err);
        //         return EMPTY;
        //     })
        // );
    }

    getPeopleById(routeId: string): Observable<People> {
        return this.httpClient.get<People>(`${environment.peopleBaseApi}/peoples/${routeId}`);
    }

    deletePeople(id: string): Observable<People[]> {
        return this.httpClient.delete<People[]>(`${environment.peopleBaseApi}/peoples/${id}`);
    }

    getRandomPeople(): Observable<People> {
        return this.httpClient.get<People>(`${environment.peopleBaseApi}/peoples/random`);
    }

    AddNewPerson(people: PeopleForm): Observable<void> {
        return this.httpClient.post<void>(`${environment.peopleBaseApi}/peoples`, people);
    }

    updatePeople(people: PeopleForm): Observable<People> {
        return this.httpClient.put<People>(`${environment.peopleBaseApi}/peoples/${people.id}`, people);
    }

}
