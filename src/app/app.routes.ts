import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GeneratorComponent } from './generator/generator.component';

export const routes: Routes = [
    {
        component:HomeComponent,path:'home'
    },
    {
        component:GeneratorComponent,path:'generator'
    }
];
