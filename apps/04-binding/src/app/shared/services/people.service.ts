import { Injectable } from "@angular/core";
import { People } from "../models/people.model";
import { Observable, of } from "rxjs";
import { PEOPLE } from "../../mocks/people.mock";

@Injectable({
    providedIn: 'root'
})

export class PeopleService {

    getpeoples(): Observable<People[]> | undefined {
        return of(PEOPLE)
    }

    getPeopleById(id: string): Observable<People> | undefined {
        return of(PEOPLE.find(p => p.id === id));
    }
}