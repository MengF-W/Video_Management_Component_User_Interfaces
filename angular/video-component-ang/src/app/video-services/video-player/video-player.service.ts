import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { Observable,lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {

  private readonly playService: string = environment.service_url + '/play';
  private readonly recordService: string = environment.service_url + '/record';

  constructor(private httpClient: HttpClient) { }

  public async play(videoUrlText: string): Promise<string> {
   
    return await lastValueFrom(this.httpClient.post(this.playService, { video_url: videoUrlText }, { responseType: 'text' })); 

  }

  public record(videoUrlText: string):Observable<any> { 
    
    return this.httpClient.post(this.recordService, { video_url: videoUrlText }, { observe: 'response', responseType: 'blob' });

  }
}
