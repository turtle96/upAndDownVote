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

  private newName: string = '';

  private topics: any[] = [];
  private newTopic: string;
  private topicAccepted: boolean = false;
  private topicRejected: boolean = false;

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

  /**
   * Get top 20 topics sorted by votes in descending order.
   * Topics will be pre-sorted in alphabetical order for neatness.
   * @returns {any[]} top 20 topics by number of votes
   */
  getTopTwentyTopics(): any[] {
    this.topics.sort(this.sortTopicsByAlphabeticalOrder);

    let topicsCopy = this.topics.slice();   // Use copy to prevent sorting actual topics
    topicsCopy.sort(this.sortTopicsByVotes);
    topicsCopy = topicsCopy.slice(0, 20);
    return topicsCopy;
  }

  /**
   * Get all topics, sorted in alphabetical order.
   * @returns {any[]} all topics
   */
  getAllTopics(): any[] {
    return this.topics.sort(this.sortTopicsByAlphabeticalOrder);
  }

  /**
   * Sort function to be used with sort()
   * @param topic1
   * @param topic2
   * @returns {number}
   */
  sortTopicsByVotes(topic1: any, topic2: any): number {
    return topic2.votes - topic1.votes;
  }

  /**
   * Sort function to be used with sort()
   * @param topic1
   * @param topic2
   * @returns {number}
   */
  sortTopicsByAlphabeticalOrder(topic1: any, topic2: any): number {
    if (topic1.name.toLowerCase() < topic2.name.toLowerCase()) {
      return -1;
    } else if (topic1.name.toLowerCase() > topic2.name.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * Adds 1 to given topic's votes
   * @param topic
   */
  upVote(topic: any) {
    topic.votes = topic.votes + 1;
  }

  /**
   * Subtracts 1 from given topic's votes
   * @param topic
   */
  downVote(topic: any) {
    topic.votes = topic.votes - 1;
  }

  /**
   * Enter new topic to topics list.
   * Will reject topic if new topic is empty or duplicate
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  enterNewTopic(): boolean {
    if (!this.newTopic || this.isDuplicateTopic(this.newTopic)) {
      this.topicAccepted = false;
      this.topicRejected = true;
      return false;
    }

    let name = this.newTopic.trim();
    let votes = 0;
    let user = this.user;
    this.topics.push({name, votes, user});

    this.topicAccepted = true;
    this.topicRejected = false;

    return false;
  }

  /**
   * Checks if given name is in topics list.
   * @param name - topic name
   * @return {boolean} true if name is in topics list, else false
   */
  isDuplicateTopic(name: string): boolean {
    name = name.trim();
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
