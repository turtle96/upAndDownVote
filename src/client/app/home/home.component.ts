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

  topicsObj: object;
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
    // this.getTopics();
    this.topics = this.homeService.getTopics();

  }

  upVote(topic: any) {
    console.log(topic);
    topic.votes = topic.votes + 1;
  }

  downVote(topic: any) {
    console.log(topic);
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
