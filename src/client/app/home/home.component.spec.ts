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

            // List top twenty by votes

            expect(homeDOMEl.querySelectorAll('li')[0].textContent.trim()).toEqual(getFormattedStringForTop20Topics(1, 'Capitalism', 100, DEFAULT_AUTHOR_NAME));

            expect(homeDOMEl.querySelectorAll('li')[1].textContent.trim()).toEqual(getFormattedStringForTop20Topics(2, 'Animals', 50, DEFAULT_AUTHOR_NAME));

            expect(homeDOMEl.querySelectorAll('li')[2].textContent.trim()).toEqual(getFormattedStringForTop20Topics(3, 'Guitar', 40, DEFAULT_AUTHOR_NAME));

            // List All Topics by alphabetical order

            expect(homeDOMEl.querySelectorAll('li')[3].textContent.trim()).toEqual(getFormattedStringForAllTopics('Animals', 50, DEFAULT_AUTHOR_NAME));

            expect(homeDOMEl.querySelectorAll('li')[4].textContent.trim()).toEqual(getFormattedStringForAllTopics('Capitalism', 100, DEFAULT_AUTHOR_NAME));

            expect(homeDOMEl.querySelectorAll('li')[5].textContent.trim()).toEqual(getFormattedStringForAllTopics('Guitar', 40, DEFAULT_AUTHOR_NAME));

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

            homeInstance.newName = 'MapleSyrup';
            homeInstance.enterUsername();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('h5')[1].textContent).toEqual('Logged in as: MapleSyrup');

          });

      }));

    it('should reject invalid username',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(HomeComponent);
            let homeInstance = fixture.debugElement.componentInstance;
            let homeDOMEl = fixture.debugElement.nativeElement;

            expect(homeDOMEl.querySelectorAll('h5').length).toEqual(1);
            expect(homeDOMEl.querySelectorAll('form').length).toEqual(1);

            homeInstance.newName = '';
            homeInstance.enterUsername();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('h5').length).toEqual(1);
            expect(homeDOMEl.querySelectorAll('form').length).toEqual(1);

          });

      }));

    it('should be able to show "Add New Topic" field only after valid username is entered',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(HomeComponent);
            let homeInstance = fixture.debugElement.componentInstance;
            let homeDOMEl = fixture.debugElement.nativeElement;

            expect(homeDOMEl.querySelectorAll('form').length).toEqual(1);

            homeInstance.newName = 'MapleSyrup';
            homeInstance.enterUsername();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('form').length).toEqual(2);

            expect(homeDOMEl.querySelectorAll('form')[1].querySelector('label').textContent).toEqual('Add new topic');

          });

      }));

    it('should be able to show vote buttons only after valid username is entered',
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

            expect(homeDOMEl.querySelectorAll('button').length).toEqual(1);

            homeInstance.newName = 'MapleSyrup';
            homeInstance.enterUsername();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('button').length).toEqual(8);

            expect(homeDOMEl.querySelectorAll('button')[2].textContent).toEqual('Up');
            expect(homeDOMEl.querySelectorAll('button')[3].textContent).toEqual('Down');

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
            expect(homeDOMEl.querySelectorAll('li')[4].textContent.trim()).toEqual(getFormattedStringForTop20Topics(4, 'Pancakes and Honey', 0, 'MapleSyrup'));

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

            expect(homeDOMEl.querySelectorAll('li')[0].textContent.trim()).toEqual(getFormattedStringForTop20Topics(1, 'Animals', 50, DEFAULT_AUTHOR_NAME));

            homeInstance.upVote(mockHomeService.topics[1]); // up vote Capitalism

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li')[0].textContent.trim()).toEqual(getFormattedStringForTop20Topics(1, 'Capitalism', 51, DEFAULT_AUTHOR_NAME));
            expect(homeDOMEl.querySelectorAll('li')[1].textContent.trim()).toEqual(getFormattedStringForTop20Topics(2, 'Animals', 50, DEFAULT_AUTHOR_NAME));
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

            expect(homeDOMEl.querySelectorAll('li')[0].textContent.trim()).toEqual(getFormattedStringForTop20Topics(1, 'Animals', 50, DEFAULT_AUTHOR_NAME));

            homeInstance.downVote(mockHomeService.topics[0]); // down vote Animals

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li')[0].textContent.trim()).toEqual(getFormattedStringForTop20Topics(1, 'Capitalism', 50, DEFAULT_AUTHOR_NAME));
            expect(homeDOMEl.querySelectorAll('li')[1].textContent.trim()).toEqual(getFormattedStringForTop20Topics(2, 'Animals', 49, DEFAULT_AUTHOR_NAME));
          });

      }));

    it('should be able to sort topics by alphabetical order, then votes',
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
              {name: "Guitar", votes: 50, user: "duck_duck"},
              {name: "Animals", votes: 50, user: "duck_duck"}
            ];

            fixture.detectChanges();

            // If all votes are the same, top 20 should show alphabetical order

            expect(homeDOMEl.querySelectorAll('li')[0].textContent.trim()).toEqual(getFormattedStringForTop20Topics(1, 'Animals', 50, DEFAULT_AUTHOR_NAME));
            expect(homeDOMEl.querySelectorAll('li')[1].textContent.trim()).toEqual(getFormattedStringForTop20Topics(2, 'Capitalism', 50, DEFAULT_AUTHOR_NAME));
            expect(homeDOMEl.querySelectorAll('li')[2].textContent.trim()).toEqual(getFormattedStringForTop20Topics(3, 'Guitar', 50, DEFAULT_AUTHOR_NAME));

          });

      }));

    it('should reject a submitted topic with empty string',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(HomeComponent);
            let homeInstance = fixture.debugElement.componentInstance;
            let homeDOMEl = fixture.debugElement.nativeElement;

            homeInstance.newName = 'MapleSyrup';
            homeInstance.enterUsername();

            homeInstance.newTopic = '';
            homeInstance.enterNewTopic();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li')[0].textContent).toMatch('Topic Rejected');

          });

      }));

    it('should reject a submitted topic longer than 255 char (with trailing whitespaces removed)',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(HomeComponent);
            let homeInstance = fixture.debugElement.componentInstance;
            let homeDOMEl = fixture.debugElement.nativeElement;

            homeInstance.newName = 'MapleSyrup';
            homeInstance.enterUsername();

            // exactly 255 characters
            homeInstance.newTopic = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,';
            homeInstance.enterNewTopic();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li')[0].textContent).toEqual('Topic Accepted');

            // exactly 255 characters with trailing whitespaces
            homeInstance.newTopic = '         Aorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,        ';
            homeInstance.enterNewTopic();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li')[0].textContent).toEqual('Topic Accepted');

            // exactly 256 characters
            homeInstance.newTopic = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,A';
            homeInstance.enterNewTopic();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li')[0].textContent).toMatch('Topic Rejected');

          });

      }));

    it('should reject a submitted topic which is a duplicate of existing topics (ignore case)',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(HomeComponent);
            let homeInstance = fixture.debugElement.componentInstance;
            let homeDOMEl = fixture.debugElement.nativeElement;

            homeInstance.newName = 'MapleSyrup';
            homeInstance.enterUsername();

            homeInstance.newTopic = 'a chicken';
            homeInstance.enterNewTopic();

            homeInstance.newTopic = 'A CHICKEN';
            homeInstance.enterNewTopic();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li')[0].textContent).toMatch('Topic Rejected');

            homeInstance.newTopic = 'halloween';
            homeInstance.enterNewTopic();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li')[0].textContent).toEqual('Topic Accepted');

            homeInstance.newTopic = '          halloween       ';
            homeInstance.enterNewTopic();

            fixture.detectChanges();

            expect(homeDOMEl.querySelectorAll('li')[0].textContent).toMatch('Topic Rejected');

          });

      }));
  });

}

private function getFormattedStringForAllTopics(topic: string, votes: number, author: string): string {
  return `Topic: ${topic}, Votes: ${votes}, Submitted by: ${author}`;
}

private function getFormattedStringForTop20Topics(listNum: number, topic: string, votes: number, author: string): string {
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
