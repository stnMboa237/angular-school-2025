import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from "@angular/router";
import { People } from "../../../../shared/models/people.model";
import { PeopleService } from "../../../../core/services/people.service";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

// Avant d'arriver à ce niveau, le guards va d'abord vérifier que 
// l'Id contenu dans la route respecte le pattern imposé par le Guards.
// Une fois que le guards aura confirmé la validité de l'Id, on va simplement 
// recuperer le détails de la personne via le service peopleService.getPeopleById 
export class PersonDetailsResolver implements Resolve<People> {
    private readonly peopleService = inject(PeopleService);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<People | RedirectCommand> {
        const personId = route.paramMap.get('id');
        return this.peopleService.getPeopleById(personId);
    }

}