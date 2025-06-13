import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { People } from "../shared/models/people.model";
import { catchError, EMPTY, map, Observable, of } from "rxjs";

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
            map(peoples => {
                if (peoples !== undefined && peoples !== null) {
                    localStorage.setItem(environment.peoplesCaches, JSON.stringify(peoples));
                }
                return peoples;
            }),
            catchError((err) => {
                console.error(err);
                return EMPTY;
            })
        );
    }

    getPeoplesV2(): Observable<People[]> {
        return this.httpClient.get<People[]>(`${this.peopleBaseUrl}/${environment.peoples}`).pipe(
            catchError((err) => {
                console.error(err);
                return EMPTY;
            })
        );
    }

    getRandomPeople(): Observable<People> {
        let peoples = JSON.parse(localStorage.getItem(environment.peoplesCaches)) as People[];
        if (peoples !== null && peoples !== undefined) {
            return of(peoples[this.getRandomInteger(peoples.length)]);
        } else {
            return this.getPeoples().pipe(
                map(peoples => {
                    if (peoples !== null && peoples !== undefined) {
                        const randomIndex = this.getRandomInteger(peoples.length);
                        return peoples[randomIndex];
                    }
                    return undefined;
                })
            );
        }
    }

    getRandomPeopleV2(): Observable<People> {
        return this.httpClient.get<People>(`${this.peopleBaseUrl}/${environment.random}`).pipe(
            catchError((err) => {
                console.error(err);
                return EMPTY;
            })
        );
    }

}
