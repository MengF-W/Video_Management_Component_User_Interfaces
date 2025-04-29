import { Component,OnInit,inject  } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { VideoPlayerService } from '../video-services/video-player/video-player.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-video-player',
  imports: [InputTextModule,FormsModule, MatIconModule, MatDividerModule, MatButtonModule,FloatLabelModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})
export class VideoPlayerComponent implements OnInit{

  constructor(private videoPlayerService:VideoPlayerService){ }

  imageFeed : string | undefined ;
  videoUrlText = "" ;
  playButtonDisabled : boolean | undefined ;
  recordButtonDisabled: boolean | undefined;

  ngOnInit(): void {
    this.imageFeed = "welcome.png";
    this.playButtonDisabled = false;
    this.recordButtonDisabled = true;
  }

  play() { 
    let verifiedPlayableUrl: boolean | undefined;

    this.videoPlayerService.play(this.videoUrlText).then(
      responseText => {
        verifiedPlayableUrl = JSON.parse(responseText)["playable_url"]

        if (verifiedPlayableUrl == true) {
          this.imageFeed = this.videoUrlText;
          this.playButtonDisabled = true;
          this.recordButtonDisabled = false;
        }
        else { 
          this.imageFeed = "not_playable.png";
        }
    },
      error => {
          this.imageFeed = "not_playable.png";
      })
  }
  
  record() {
    
    this.videoPlayerService.record(this.videoUrlText).subscribe((response) => {
      const contentDisposition = response.headers.get('Content-Disposition');
      const filenameRegex = /filename[^;=\n]*=(([‘"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(contentDisposition);
      const filename = matches ? matches[1].replace(/['"]/g, '') : 'yourRecordedVideo.mp4';
      
      const blob =
        new Blob([
          response.body],
          { type: 'video/mp4' });
      
      saveAs(blob, filename);

    },
      error => {
        console.error('Error recording the video', error);
      })
  }

}