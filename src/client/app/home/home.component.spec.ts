import { FormsModule } from '@angular/forms';
import {
  async,
  TestBed
 } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { HomeComponent } from './home.component';
import { HomeService } from './home.service';

export function main() {
  describe('Home component', () => {

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [HomeComponent],
        providers: [
          { provide: HomeService, useValue: new MockHomeService() }
        ]
      });

    });

    it('should be able to read topics from data.json, enter username',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(HomeComponent);
            let homeInstance = fixture.debugElement.componentInstance;
            let homeDOMEl = fixture.debugElement.nativeElement;
            let mockHomeService =
              fixture.debugElement.injector.get<any>(HomeService) as MockHomeService;
            let homeServiceSpy = spyOn(mockHomeService, 'get').and.callThrough();

            mockHomeService.topics = [
              {name: "Animals", votes: 20, user: "duck_duck"},
              {name: "Capitalism", votes: 50, user: "duck_duck"},
              {name: "Guitar", votes: 40, user: "duck_duck"}
            ];

            fixture.detectChanges();

            expect(homeInstance.homeService).toEqual(jasmine.any(MockHomeService));
            expect(homeDOMEl.querySelectorAll('li').length).toEqual(6);
            // expect(homeServiceSpy.calls.count()).toBe(1);

            homeInstance.newName = 'MapleSyrup';
            homeInstance.enterUsername();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('h5')[1].textContent).toEqual('Logged in as: MapleSyrup');

            fixture.detectChanges();

            // expect(homeDOMEl.querySelectorAll('li').length).toEqual(4);
            // expect(homeDOMEl.querySelectorAll('li')[3].textContent).toEqual('Minko');
          });

      }));
  });
}

class MockHomeService {

  returnValue: object;
  topics: any[];

  get(): Observable<object> {
    return Observable.create((observer: any) => {
      observer.next(this.returnValue);
      observer.complete();
    });
  }

  getInitialTopics(): any[] {
    return this.topics;
  }
}
