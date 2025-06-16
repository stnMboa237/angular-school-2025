// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  peopleBaseApi: 'http://localhost:9000/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

/**
 * app.get('/api/peoples', api.listAll);
 * app.get('/api/peoples/random', api.getRandom);
 * app.get('/api/peoples/:id', api.get);
 * app.get('/api/peoples/name/:name', api.filterByName);
 * app.get('/api/peoples/skill/:skill', api.filterBySkill);
 * app.post('/api/peoples', api.create);
 * app.put('/api/peoples/:id', api.update);
 * app.delete('/api/peoples/:id', api.delete);
 * 
 */
