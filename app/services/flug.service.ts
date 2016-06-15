import {Http, URLSearchParams, Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { BASE_URL} from '../app-tokens';
import { Flug} from '../entities/flug';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { ReplaySubject } from 'rxjs/ReplaySubject'
@Injectable()
export class FlugService {
    
    constructor(
        private http: Http,
        private oauthService: OAuthService,
        @Inject(BASE_URL) private baseUrl: string) {
    }
    
    public fluege: Flug[] = [];
    public fluege$ = new ReplaySubject<Flug[]>(1);
    
    public find(von: string, nach: string) {
        
        return new Promise((resolve, reject ) => { 
        
            var url = this.baseUrl + "/flug";
            url = "/data/fluege.json";
            var search = new URLSearchParams();
            search.set('abflugort', von);
            search.set('zielort', nach);
            
            var headers = new Headers();
            headers.set('Accept', 'text/json');
            headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken() )
            
            this.http
                    .get(url, { search, headers })
                    .map(resp =>  resp.json())
                    .subscribe(
                        (fluege) => {
                            this.fluege = fluege;
                            this.fluege$.next(fluege);
                            resolve(fluege);
                        },
                        (err) => {
                            console.debug(err);
                            reject(err);
                        }
                    );
        });                    
        
    }
    
    
}