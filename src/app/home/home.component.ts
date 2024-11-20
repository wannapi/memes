import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ImportsModule } from '../prime';
import { PhotoService } from '../service/photo.service';






@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule,ImportsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'

  
})
export class HomeComponent {
  


  imageSrc: string | null = null;
  texts: { value: string, x: number, y: number }[] = [];
  selectedText: { value: string, x: number, y: number } | null = null;

  

  images: any[] | undefined;
    
    responsiveOptions: any[] | undefined;

    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images) => (this.images = images));
        this.loadGalleriaImages()
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5
            },
            {
                breakpoint: '768px',
                numVisible: 3
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];
    }

    loadGalleriaImages() {
      const savedImage = localStorage.getItem('savedImage');
      if (savedImage) {
        this.images?.push(savedImage)
      }
    }
}

