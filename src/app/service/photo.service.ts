import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
export interface ImageItem {
    itemImageSrc: string;
    thumbnailImageSrc: string;
    alt: string;

  }
@Injectable({
    providedIn: 'root'
  })
export class PhotoService {
  private imagesSubject = new BehaviorSubject<ImageItem[]>([]);
  images$: Observable<ImageItem[]> = this.imagesSubject.asObservable();

  // Get current images as an array
  getImages(): Observable<ImageItem[]> {
    return this.images$;
  }

  createItem(base64: string): void {
    const newItem: ImageItem = {
      itemImageSrc: base64,
      thumbnailImageSrc: base64,
      alt: 'Description for Image',
    };

    const updatedImages = [...this.imagesSubject.value, newItem];
    this.imagesSubject.next(updatedImages);
    localStorage.setItem('images', JSON.stringify(updatedImages));
  }

  // Delete an item by index
  deleteItem(index: number): void {
    const currentImages = this.imagesSubject.value;
    if (index >= 0 && index < currentImages.length) {
      const updatedImages = currentImages.filter((_, i) => i !== index);
      this.imagesSubject.next(updatedImages);
    }
  }
};