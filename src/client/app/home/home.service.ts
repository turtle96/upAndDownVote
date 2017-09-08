import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/**
 * Created by angja_000 on 30/8/2017.
 */

@Injectable()
export class HomeService {

  private static topics: object[] = [];

  constructor(private http: Http) {
    this.get().subscribe(
      topics => {
        // HomeService.topics = topics;
        let topicsJson: any = topics;
        for (let key of Object.keys(topicsJson)) {
          let value: any = parseInt(topicsJson[key]);
          HomeService.topics.push({key, value});
        }
        console.log(HomeService.topics);
        },
    );
  }

  getTopics() {
    return HomeService.topics;
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {object} The Observable for the HTTP request.
   */
  get(): Observable<object> {
    return this.http.get('assets/data.json')
      .map((res: Response) => res.json())
      //.do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
  }

  /**
   * Handle HTTP error
   */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
