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
  topics: string[] = [];

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
    this.getTopics();
    console.log(this.topics);

  }

  /**
   * Handle the homeService observable
   */
  getTopics() {
    this.homeService.get()
      .subscribe(
        topics => {this.topicsObj = topics; this.topics = Object.keys(this.topicsObj);},
        error => this.errorMessage = <any>error
      );
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    // this.names.push(this.newName);
    // this.newName = '';

    this.user = this.newName;

    return false;
  }

}
