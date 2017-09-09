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
  newTopic: string;
  topicAccepted: boolean = false;
  topicRejected: boolean = false;

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

  getTopTwentyTopics() {
    let topicsCopy = this.topics.slice();
    topicsCopy.sort(this.sortTopicsByAlphabeticalOrder);
    topicsCopy.sort(this.sortTopicsByVotes);
    topicsCopy = topicsCopy.slice(0, 20);
    return topicsCopy;
  }

  getAllTopics() {
    return this.topics.sort(this.sortTopicsByAlphabeticalOrder);
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
   * Enter new topic
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  enterNewTopic(): boolean {
    this.newTopic = this.newTopic.trim();
    if (!this.newTopic || this.isDuplicateTopic(this.newTopic)) {
      this.topicAccepted = false;
      this.topicRejected = true;
      return false;
    }

    let name = this.newTopic;
    let votes = 0;
    this.topics.push({name, votes});

    this.topicAccepted = true;
    this.topicRejected = false;

    return false;
  }

  isDuplicateTopic(name: string) {
    for (let i=0; i<this.topics.length; i++) {
      if (this.topics[i].name.toLowerCase() === name.toLowerCase()) {
        return true;
      }
    }

    return false;
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
