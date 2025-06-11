import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from './material-design.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialDesignModule],
  providers: [],
  bootstrap: [AppComponent] /* doit être présent seulement dans le root module. Car on ne peut bootstrapé ou lancer qu'à partir d'un seul composant dans l'arbre des composants!!! */
})
export class AppModule {

}
