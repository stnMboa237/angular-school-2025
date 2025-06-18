import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { People } from "../../shared/models/people.model";

export function AuthorizationInterceptor(req: HttpRequest<People | Array<People>>, next: HttpHandlerFn): Observable<HttpEvent<People | Array<People>>> {
    const clonedRequest = req.clone({
        headers: new HttpHeaders().set('Authorization', 'Sword')
    });
    return next(clonedRequest) as Observable<HttpEvent<People | Array<People>>>;
}