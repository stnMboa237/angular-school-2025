import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './feature/home/home.component';
import { MaterialDesignModule } from './material-design.module';
import { NgOptimizedImage } from '@angular/common';
import { FullNamePipe } from './shared/pipes/fullname.pipe';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, HomeComponent, FullNamePipe],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialDesignModule, NgOptimizedImage],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule { }
