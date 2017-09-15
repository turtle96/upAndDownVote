import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { TestBed, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

import { Observable } from 'rxjs/Observable';

import {HomeService} from './home.service';

export function main() {
  describe('Home Service', () => {

    beforeEach(() => {

      TestBed.configureTestingModule({
        providers: [
          HomeService,
          MockBackend,
          BaseRequestOptions,
          {
            provide: Http,
            useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
            deps: [MockBackend, BaseRequestOptions]
          }
        ]
      });
    });

    it('should return an Observable when get() called', async(() => {
      expect(TestBed.get(HomeService).get()).toEqual(jasmine.any(Observable));
    }));

    it('should resolve to list of topics when get() called', async(() => {
      let homeService = TestBed.get(HomeService);
      let mockBackend = TestBed.get(MockBackend);

      mockBackend.connections.subscribe((c: any) => {
        c.mockRespond(new Response(new ResponseOptions({ body:
          `{"Children": "50", "Capitalism": "50", "Animals": "20", "Animation": "100", "Anthropology": "100"}`
        })));
      });

      homeService.get().subscribe((data: any) => {
        expect(data).toEqual({
          "Children": "50",
          "Capitalism": "50",
          "Animals": "20",
          "Animation": "100",
          "Anthropology": "100"
        });
      });
    }));

    it('should parse topics properly', async(() => {

      let mockBackend = TestBed.get(MockBackend);

      mockBackend.connections.subscribe((c: any) => {
        c.mockRespond(new Response(new ResponseOptions({ body:
          `{"Children": "50", "Capitalism": "50", "Animals": "20"}`
        })));
      });

      let homeService = TestBed.get(HomeService);

      let expected: object[] = [];
      let user = "duck_duck";
      expected.push({name: "Children", votes: 50, user});
      expected.push({name: "Capitalism", votes: 50, user});
      expected.push({name: "Animals", votes: 20, user});

      expect(homeService.getInitialTopics()).toEqual(expected);
    }));

  });
}
