import { PersonDetailsResolver } from "./guards/person-details.resolver";
import { UpdatePeopleComponent } from "./update-people.component";
import { UpdatePeopleGuard } from "./guards/update-people.guard";

export default [
    { path: '', component: UpdatePeopleComponent, canActivate: [UpdatePeopleGuard], resolve: { personDetails: PersonDetailsResolver } }
]