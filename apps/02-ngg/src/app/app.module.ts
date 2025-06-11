import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialDesignModule } from './material-design.module';
import { HomeComponent } from './feature/home.component';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialDesignModule],
  providers: [],
  bootstrap: [HomeComponent], // ne doit être fait que dans le composant Root de l'app. Dans le main.ts, on fera le bootstrap de l'app à partir du module Root (racine) (AppComponent)
})
export class AppModule { }
