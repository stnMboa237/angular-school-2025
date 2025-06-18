import { UpdatePeopleComponent } from "./update-people.component";
import { UpdatePeopleGuard } from "./update-people.guard";

export default [
    { path: '', component: UpdatePeopleComponent, canActivate: [UpdatePeopleGuard] }
]