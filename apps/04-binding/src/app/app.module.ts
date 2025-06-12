import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './feature/home/home.component';
import { MaterialDesignModule } from './material-design.module';
import { NgOptimizedImage } from '@angular/common';
import { PeopleDetailComponent } from './feature/peoples/details/details.component';
import { FullNamePipe } from './shared/pipes/fullname.pipe';

@NgModule({
  declarations: [AppComponent, HomeComponent, PeopleDetailComponent, FullNamePipe],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialDesignModule, NgOptimizedImage],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
