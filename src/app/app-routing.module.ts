import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StoryAboutWakingComponent } from './story-about-waking/story-about-waking.component';
import { EmptyComponent } from './empty/empty.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'a-story-about-wild-animals-waking-in-their-caves', component: StoryAboutWakingComponent},
  { path: 'empty', component: EmptyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
