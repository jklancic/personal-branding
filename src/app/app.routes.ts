import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { GithubComponent } from './github/github.component';

// Export the routes directly to be used with provideRouter
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'github-repos', component: GithubComponent },
];
