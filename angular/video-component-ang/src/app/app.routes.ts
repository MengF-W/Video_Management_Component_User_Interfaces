import { Routes } from '@angular/router';
import { VideoPlayerComponent } from './video-player/video-player.component';
export const routes: Routes = [{path:  "", pathMatch:  "full",redirectTo:  "video-player"},
    {path: "video-player", component: VideoPlayerComponent}];
