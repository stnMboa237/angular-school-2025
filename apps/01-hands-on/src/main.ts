import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Dans une appli Angular, le fichier main.ts est chargé en premier. C'est 
// le motif pour lequel il doit faire le bootstrap du module root !!!
platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
