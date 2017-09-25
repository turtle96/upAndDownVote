import { FormsModule } from '@angular/forms';
import {
  async,
  TestBed
 } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { HomeComponent } from './home.component';
import { HomeService } from './home.service';

private static let DEFAULT_AUTHOR_NAME = 'duck_duck';

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

    it('should be able to read topics from homeService and display correctly',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(HomeComponent);
            let homeInstance = fixture.debugElement.componentInstance;
            let homeDOMEl = fixture.debugElement.nativeElement;
            let mockHomeService = fixture.debugElement.injector.get<any>(HomeService) as MockHomeService;

            expect(homeInstance.homeService).toEqual(jasmine.any(MockHomeService));

            mockHomeService.topics = [
              {name: "Guitar", votes: 40, user: "duck_duck"},
              {name: "Animals", votes: 50, user: "duck_duck"},
              {name: "Capitalism", votes: 100, user: "duck_duck"}
            ];

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li').length).toEqual(6);

            expect(homeDOMEl.querySelectorAll('li')[0].textContent.trim()).toEqual(getFormattedStringForTopicDisplay(1, 'Capitalism', 100, DEFAULT_AUTHOR_NAME));

            expect(homeDOMEl.querySelectorAll('li')[1].textContent.trim()).toEqual(getFormattedStringForTopicDisplay(2, 'Animals', 50, DEFAULT_AUTHOR_NAME));

            expect(homeDOMEl.querySelectorAll('li')[2].textContent.trim()).toEqual(getFormattedStringForTopicDisplay(3, 'Guitar', 40, DEFAULT_AUTHOR_NAME));

          });

      }));

    it('should be able to enter username',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(HomeComponent);
            let homeInstance = fixture.debugElement.componentInstance;
            let homeDOMEl = fixture.debugElement.nativeElement;

            expect(homeInstance.homeService).toEqual(jasmine.any(MockHomeService));

            homeInstance.newName = 'MapleSyrup';
            homeInstance.enterUsername();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('h5')[1].textContent).toEqual('Logged in as: MapleSyrup');

          });

      }));

    it('should be able to enter new topic',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(HomeComponent);
            let homeInstance = fixture.debugElement.componentInstance;
            let homeDOMEl = fixture.debugElement.nativeElement;
            let mockHomeService = fixture.debugElement.injector.get<any>(HomeService) as MockHomeService;

            expect(homeInstance.homeService).toEqual(jasmine.any(MockHomeService));

            mockHomeService.topics = [
              {name: "Animals", votes: 50, user: "duck_duck"},
              {name: "Capitalism", votes: 50, user: "duck_duck"},
              {name: "Guitar", votes: 40, user: "duck_duck"}
            ];

            fixture.detectChanges();

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
            expect(homeDOMEl.querySelectorAll('li')[4].textContent.trim()).toEqual(getFormattedStringForTopicDisplay(4, 'Pancakes and Honey', 0, 'MapleSyrup'));

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
            let mockHomeService = fixture.debugElement.injector.get<any>(HomeService) as MockHomeService;

            expect(homeInstance.homeService).toEqual(jasmine.any(MockHomeService));

            mockHomeService.topics = [
              {name: "Animals", votes: 50, user: "duck_duck"},
              {name: "Capitalism", votes: 50, user: "duck_duck"},
              {name: "Guitar", votes: 40, user: "duck_duck"}
            ];

            homeInstance.newName = 'MapleSyrup';
            homeInstance.enterUsername();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li')[0].textContent.trim()).toEqual(getFormattedStringForTopicDisplay(1, 'Animals', 50, DEFAULT_AUTHOR_NAME));

            homeInstance.upVote(mockHomeService.topics[1]); // up vote Capitalism

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li')[0].textContent.trim()).toEqual(getFormattedStringForTopicDisplay(1, 'Capitalism', 51, DEFAULT_AUTHOR_NAME));
            expect(homeDOMEl.querySelectorAll('li')[1].textContent.trim()).toEqual(getFormattedStringForTopicDisplay(2, 'Animals', 50, DEFAULT_AUTHOR_NAME));
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

            expect(homeInstance.homeService).toEqual(jasmine.any(MockHomeService));

            mockHomeService.topics = [
              {name: "Animals", votes: 50, user: "duck_duck"},
              {name: "Capitalism", votes: 50, user: "duck_duck"},
              {name: "Guitar", votes: 40, user: "duck_duck"}
            ];

            homeInstance.newName = 'MapleSyrup';
            homeInstance.enterUsername();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li')[0].textContent.trim()).toEqual(getFormattedStringForTopicDisplay(1, 'Animals', 50, DEFAULT_AUTHOR_NAME));

            homeInstance.downVote(mockHomeService.topics[0]); // down vote Animals

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li')[0].textContent.trim()).toEqual(getFormattedStringForTopicDisplay(1, 'Capitalism', 50, DEFAULT_AUTHOR_NAME));
            expect(homeDOMEl.querySelectorAll('li')[1].textContent.trim()).toEqual(getFormattedStringForTopicDisplay(2, 'Animals', 49, DEFAULT_AUTHOR_NAME));
          });

      }));

    it('should be able to sort topics by alphabetical order',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(HomeComponent);
            let homeDOMEl = fixture.debugElement.nativeElement;
            let mockHomeService =
              fixture.debugElement.injector.get<any>(HomeService) as MockHomeService;

            mockHomeService.topics = [
              {name: "Capitalism", votes: 50, user: "duck_duck"},
              {name: "Guitar", votes: 40, user: "duck_duck"},
              {name: "Animals", votes: 50, user: "duck_duck"}
            ];

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li')[3].textContent.trim()).toEqual('Topic: Animals, Votes: 50, Submitted by: duck_duck');
            expect(homeDOMEl.querySelectorAll('li')[4].textContent.trim()).toEqual('Topic: Capitalism, Votes: 50, Submitted by: duck_duck');
            expect(homeDOMEl.querySelectorAll('li')[5].textContent.trim()).toEqual('Topic: Guitar, Votes: 40, Submitted by: duck_duck');
          });

      }));
  });

}

private function getFormattedStringForTopicDisplay(listNum: number, topic: string, votes: number, author: string): string {
  return `${listNum}. Topic: ${topic}, Votes: ${votes}, Submitted by: ${author}`;
}

class MockHomeService {

  returnValue: object;
  topics: any[] = [];

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
