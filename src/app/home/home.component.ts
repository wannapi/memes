import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  GalleryItem,
  GalleryModule,
  IframeItem,
  ImageItem,
  VideoItem,
  YoutubeItem,
} from 'ng-gallery';
import { ButtonModule } from 'primeng/button';
import { ImportsModule } from '../prime';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, ImportsModule, GalleryModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  images: any;
  images2: GalleryItem[] = [];
  constructor(private router: Router) {}

  ngOnInit() {
    const savedImages = JSON.parse(localStorage.getItem('images') || '[]');
    this.images = savedImages;
    if(this.images.length){
      console.log(this.images[0].itemImageSrc);
      this.images.forEach((element: any) => {
        this.images2.push(new ImageItem({
          src:element.itemImageSrc,
          thumb: element.itemImageSrc
        }))
      });
    }
  }

  goToGenerator() {
    this.router.navigate(['/generator']);
  }
}
