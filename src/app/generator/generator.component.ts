import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorEvent } from 'ngx-color';
import { ColorChromeModule } from 'ngx-color/chrome';
import { ImportsModule } from '../prime';
import { PhotoService } from '../service/photo.service';
import { CloudinaryModule } from '@cloudinary/ng';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [ColorChromeModule, FormsModule, ImportsModule, CloudinaryModule],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.scss',
  providers: [MessageService],
})
export class GeneratorComponent {
  @ViewChild('memeCanvas', { static: false }) myCanvas: any;

  topText: String = '';
  bottomText: String = '';
  fileEvent: any;
  textColor: String = '#000000';
  backgroundColor: String = '#F9F9FB';
  currentImage: any;
  constructor(
    private photoService: PhotoService,
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.photoService.getImages().subscribe((images) => console.log(images));
  }

  preview(e: any) {
    this.fileEvent = e;
    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d');

    let render = new FileReader();
    render.readAsDataURL(e.target.files[0]);
    console.log(render);
    render.onload = function (event) {
      console.log(event);
      const img = new Image();

      img.src = event.target?.result as string;
      console.log(img);

      img.onload = function () {
        ctx.drawImage(img, 50, 150, 600, 500);
      };
    };
  }

  drawText() {
    let canvas = this.myCanvas.nativeElement;
    let ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.preview(this.fileEvent);

    ctx.fillStyle = this.textColor;
    ctx.font = '50px Comic Sans MS';
    ctx.textAlign = 'center';
    ctx.fillText(this.topText, canvas.width / 2, 100);
    ctx.fillText(this.bottomText, canvas.width / 2, 750);
  }

  canvasTextColor($event: ColorEvent) {
    this.textColor = $event.color.hex;
    this.drawText();
  }

  canvasBgColor($event: ColorEvent) {
    this.backgroundColor = $event.color.hex;
    this.drawText();
  }

  downloadImg() {
    let canvas = this.myCanvas.nativeElement;
    let image = canvas.toDataURL('image/png');

    if (image) {
      let link = document.createElement('a');
      link.download = 'memeImg.png';
      link.href = image;
      link.click();
      this.showSuccess('Meme téléchargé avec succès !');
    } else {
      this.showError('Veuillez selectionner une image');
    }
  }

  saveImgToLocalStorage() {
    const canvas = this.myCanvas.nativeElement;
    const image = canvas.toDataURL('image/png');
    if (image) {
      this.photoService.createItem(image);
      this.showSuccess('Meme enregistré avec succès !');
    } else {
      this.showError('Veuillez selectionner une image');
    }
  }

  share(media : string) {
    let canvas = this.myCanvas.nativeElement;
    let image = canvas.toDataURL('image/png');

    if (image) {
      const formData = new FormData();
      formData.append('file', image); // Send the base64 string as 'file'
      formData.append('upload_preset', 'gpimcicl');

      const cloudinaryUrl =
        'https://api.cloudinary.com/v1_1/dyxhuswdu/image/upload'; // Replace with your Cloudinary cloud name

      this.http.post<any>(cloudinaryUrl, formData).subscribe(
        (response) => {
          if (response.secure_url) {
            const uploadedImageUrl = response.secure_url; // Get the URL of the uploaded image
            console.log('Uploaded Image URL: ', uploadedImageUrl);
            this.shareToMedia(media,uploadedImageUrl);
          }
        },
        (error) => {
          console.error('Upload error:', error);
        }
      );
    } else {
      this.showError('Veuillez selectionner une image');
    }

    //this.uploadBase64ToCloudinary(image);
  }
  shareToMedia(media:string,imageUrl: string) {
    if(media == 'facebook'){
      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        imageUrl
      )}`;
  
      // Open the share dialog in a new window
      window.open(facebookShareUrl, '_blank', 'width=600,height=400');
    } else if (media == ('twitter')){
      const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        imageUrl
      )}&text=${encodeURIComponent('Check out this image!')}`;
      window.open(twitterShareUrl, '_blank', 'width=600,height=400');
    } else {
      const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        imageUrl
      )}`;
      window.open(linkedInShareUrl, '_blank', 'width=600,height=400');
    }
  
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}
