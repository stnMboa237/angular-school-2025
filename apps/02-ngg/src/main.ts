import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// bootstraping de l'app. Main.ts est le fichier chargé en premier lors de l'exécution de l'app Angular
platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
