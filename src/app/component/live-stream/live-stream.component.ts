import { Component,
  OnInit,
  ElementRef,
  VERSION,
  ViewChild,
  // ViewChildren,
  // QueryList,
  // NgModule,
  // AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-live-stream',
  templateUrl: './live-stream.component.html',
  styleUrls: ['./live-stream.component.scss']
})
export class LiveStreamComponent implements OnInit {


  // @ViewChild('video', {static: false}) video: ElementRef;
  // ngVersion: string;
  // streaming = false;
  // error: any;
  // private stream: MediaStream = null;
  // private constraints = {
  //   audio: false,
  //   video: true,
  // };

  constructor() {
    // this.ngVersion = `Angular! v${VERSION.full}`;
  }

  ngOnInit() {
    
  }

  // initVideo(e) {
  //   this.getMediaStream()
  //     .then((stream) => {
  //       this.stream = stream;
  //       this.streaming = true;
  //     })
  //     .catch((err) => {
  //       this.streaming = false;
  //       this.error = err.message + ' (' + err.name + ':' + err.constraintName + ')';
  //     });
  // }

  // private getMediaStream(): Promise<MediaStream> {

  //   const videoConstraints = { video: true };
  //   const video = this.video.nativeElement;
  //   return new Promise<MediaStream>((resolve, reject) => {
  //     // (get the stream)
  //     return navigator.mediaDevices.
  //       getUserMedia(videoConstraints)
  //       .then(stream => {
  //         (window as any).stream = stream; // make variable available to browser console
  //         video.srcObject = stream;
  //         // video.src = window.URL.createObjectURL(stream);
  //         video.onloadedmetadata =  (e: any) => { };
  //         video.play();
  //         return resolve(stream);
  //       })
  //       .catch(err => reject(err));
  //   });
  // }

}
