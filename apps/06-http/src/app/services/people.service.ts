import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { People } from "../shared/models/people.model";
import { catchError, EMPTY, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class PeopleService {

    private readonly httpClient = inject(HttpClient)
    private readonly peopleBaseUrl: string = environment.peopleEndpoint;

    getRandomInteger(maxValue: number): number {
        return Math.floor(Math.random() * maxValue);
    }

    getPeoples(): Observable<People[]> {
        return this.httpClient.get<People[]>(`${this.peopleBaseUrl}/${environment.peoples}`).pipe(
            catchError((err) => {
                console.error(err);
                return EMPTY;
            })
        );
    }

    getRandomPeople(): Observable<People> {
        return this.httpClient.get<People>(`${this.peopleBaseUrl}/${environment.random}`).pipe(
            catchError((err) => {
                console.error(err);
                return EMPTY;
            })
        );
    }

}
