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

    it('should be able to read topics from data.json, enter username, enter new topic',
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
              {name: "Animals", votes: 50, user: "duck_duck"},
              {name: "Capitalism", votes: 50, user: "duck_duck"},
              {name: "Guitar", votes: 40, user: "duck_duck"}
            ];

            fixture.detectChanges();

            expect(homeInstance.homeService).toEqual(jasmine.any(MockHomeService));
            expect(homeDOMEl.querySelectorAll('li').length).toEqual(6);

            homeInstance.newName = 'MapleSyrup';
            homeInstance.enterUsername();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('h5')[1].textContent).toEqual('Logged in as: MapleSyrup');

            homeInstance.newTopic = 'Pancakes and Honey';
            homeInstance.enterNewTopic();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li').length).toEqual(9);
            expect(homeDOMEl.querySelectorAll('li')[0].textContent).toEqual('Topic Accepted');

            // has comparison issues due to HTML formatting, so add a trim()
            expect(homeDOMEl.querySelectorAll('li')[4].textContent.trim()).toEqual('4. Topic: Pancakes and Honey, Votes: 0, Submitted by: MapleSyrup');

          });

      }));

    it('should be able to up vote, resort top 20',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(HomeComponent);
            let homeInstance = fixture.debugElement.componentInstance;
            let homeDOMEl = fixture.debugElement.nativeElement;
            let mockHomeService =
              fixture.debugElement.injector.get<any>(HomeService) as MockHomeService;

            mockHomeService.topics = [
              {name: "Animals", votes: 50, user: "duck_duck"},
              {name: "Capitalism", votes: 50, user: "duck_duck"},
              {name: "Guitar", votes: 40, user: "duck_duck"}
            ];

            fixture.detectChanges();

            expect(homeInstance.homeService).toEqual(jasmine.any(MockHomeService));

            homeInstance.newName = 'MapleSyrup';
            homeInstance.enterUsername();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('h5')[1].textContent).toEqual('Logged in as: MapleSyrup');

            expect(homeDOMEl.querySelectorAll('li')[0].textContent.trim()).toEqual('1. Topic: Animals, Votes: 50, Submitted by: duck_duck');

            homeInstance.upVote(mockHomeService.topics[1]); // up vote Capitalism

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li')[0].textContent.trim()).toEqual('1. Topic: Capitalism, Votes: 51, Submitted by: duck_duck');
          });

      }));

    it('should be able to down vote, resort top 20',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(HomeComponent);
            let homeInstance = fixture.debugElement.componentInstance;
            let homeDOMEl = fixture.debugElement.nativeElement;
            let mockHomeService =
              fixture.debugElement.injector.get<any>(HomeService) as MockHomeService;

            mockHomeService.topics = [
              {name: "Animals", votes: 50, user: "duck_duck"},
              {name: "Capitalism", votes: 50, user: "duck_duck"},
              {name: "Guitar", votes: 40, user: "duck_duck"}
            ];

            fixture.detectChanges();

            expect(homeInstance.homeService).toEqual(jasmine.any(MockHomeService));

            homeInstance.newName = 'MapleSyrup';
            homeInstance.enterUsername();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('h5')[1].textContent).toEqual('Logged in as: MapleSyrup');

            expect(homeDOMEl.querySelectorAll('li')[0].textContent.trim()).toEqual('1. Topic: Animals, Votes: 50, Submitted by: duck_duck');

            homeInstance.downVote(mockHomeService.topics[0]); // down vote Animals

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li')[0].textContent.trim()).toEqual('1. Topic: Capitalism, Votes: 50, Submitted by: duck_duck');
            expect(homeDOMEl.querySelectorAll('li')[1].textContent.trim()).toEqual('2. Topic: Animals, Votes: 49, Submitted by: duck_duck');
          });

      }));

    it('should be able to sort by alphabetical order',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(HomeComponent);
            let homeInstance = fixture.debugElement.componentInstance;
            let homeDOMEl = fixture.debugElement.nativeElement;
            let mockHomeService =
              fixture.debugElement.injector.get<any>(HomeService) as MockHomeService;

            mockHomeService.topics = [
              {name: "Capitalism", votes: 50, user: "duck_duck"},
              {name: "Guitar", votes: 40, user: "duck_duck"},
              {name: "Animals", votes: 50, user: "duck_duck"}
            ];

            expect(homeInstance.homeService).toEqual(jasmine.any(MockHomeService));

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li')[3].textContent.trim()).toEqual('Topic: Animals, Votes: 50, Submitted by: duck_duck');
            expect(homeDOMEl.querySelectorAll('li')[4].textContent.trim()).toEqual('Topic: Capitalism, Votes: 50, Submitted by: duck_duck');
            expect(homeDOMEl.querySelectorAll('li')[5].textContent.trim()).toEqual('Topic: Guitar, Votes: 40, Submitted by: duck_duck');
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
