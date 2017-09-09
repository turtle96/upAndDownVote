import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit {

  newName: string = '';
  errorMessage: string;

  topics: any[] = [];

  private user: string = '';

  /**
   * Creates an instance of the HomeComponent with the injected
   * HomeService.
   *
   * @param {HomeService} homeService - The injected HomeService.
   */
  constructor(public homeService: HomeService) {}

  /**
   * OnInit
   */
  ngOnInit() {
    this.topics = this.homeService.getInitialTopics();
  }

  sortTopicsByVotes(topic1: any, topic2: any) {
    return topic2.votes - topic1.votes;
  }

  sortTopicsByAlphabeticalOrder(topic1: any, topic2: any) {
    if (topic1.name < topic2.name) {
      return -1;
    } else if (topic1.name > topic2.name) {
      return 1;
    } else {
      return 0;
    }
  }

  upVote(topic: any) {
    topic.votes = topic.votes + 1;
  }

  downVote(topic: any) {
    topic.votes = topic.votes - 1;
  }

  /**
   * Handle the homeService observable
   */
  getTopics() {
    // this.homeService.get()
    //   .subscribe(
    //     topics => {this.topicsObj = topics; this.topics = Object.keys(this.topicsObj);},
    //     error => this.errorMessage = <any>error
    //   );
  }

  /**
   * Enter user name
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  enterUsername(): boolean {
    this.user = this.newName;
    return false;
  }

}
