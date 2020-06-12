import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { EmptyComponent } from './empty/empty.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { StoryAboutWakingComponent } from './story-about-waking/story-about-waking.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    EmptyComponent,
    HeaderComponent,
    HomeComponent,
    StoryAboutWakingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
