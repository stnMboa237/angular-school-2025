import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { People } from "../../shared/models/people.model";

/*  Lorsque nous enregistrons les intercepteurs, il faut faire attention car l'ordre d'exécution sera l'ordre dans lequel j'aurai enregistré
    chaque intercepteur dans le provider.
        exemple: bootstrapApplication(AppComponent, {providers: [provideHttpClient(withInterceptors([loggingInterceptor, cachingInterceptor]),)]});
        ici, LoggingInterceptor va s'exécuter avant CachingInterceptor!!!

        Exemple d'intercepteur qui fait le console.Log d'une réponse Http
        export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
            return next(req).pipe(tap(event => {
                if (event.type === HttpEventType.Response) {
                console.log(req.url, 'returned a response with status', event.status);
                }
            }));
        }


    Attention. il existe 2 façons d'enregistrer un intercepteur. Créer une fonction comme dans cet exemple ou créer un classe.
    1 - si on crée une fonction comme dans cet exemple (c'est l'approche conseillée), alors, dans le fichier app.config.ts, 
        il faudra absolument déclarer l'intercepteur dans l'Array des provider via la fonction 'withInterceptor([NomDeMaFonctionInterceptor])' 
        Exemple: 
            bootstrapApplication(AppComponent, {providers: [provideHttpClient(withInterceptors[AuthorizationInterceptor]), ]
});
    2 - Si on crée une classe, alors, dans ce cas, 
        @Injectable()
        export class LoggingInterceptor implements HttpInterceptor {
            intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
                console.log('Request URL: ' + req.url);
                return handler.handle(req);
            }
        }

        comment enregistrer la classe LoggingInterceptor?
        bootstrapApplication(AppComponent, {providers: [
            provideHttpClient(
                // DI-based interceptors must be explicitly enabled.
                withInterceptorsFromDi(),
            ),
            {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
        ]});

*/
export function AuthorizationInterceptor(req: HttpRequest<People | Array<People>>, next: HttpHandlerFn): Observable<HttpEvent<People | Array<People>>> {
    const clonedRequest = req.clone({
        headers: new HttpHeaders().set('Authorization', 'Sword')
    });
    return next(clonedRequest) as Observable<HttpEvent<People | Array<People>>>;
}