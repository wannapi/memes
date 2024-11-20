import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GeneratorComponent } from "./generator/generator.component";
import { MenuItem } from 'primeng/api';
import { ImportsModule } from './prime';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, GeneratorComponent,ImportsModule],
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  items: MenuItem[] | undefined;
  constructor(private router: Router) {}

  ngOnInit() {
      this.items = [
          {
              label: 'Accueil',
              icon: 'pi pi-home',command: () => {
                this.router.navigate(['/home']);
            }
          },
          {
              label: 'Générateur de mémes',
              icon: 'pi pi-pencil',command: () => {
                this.router.navigate(['/generator']);
            }
          },
      ]
  }
  generateMeme(){
    this.router.navigate(['/installation']);
    }
} 
