# Up And Down Vote

Simple system to submit, upvote and downvote topics. App is live [here](https://up-and-down-vote.herokuapp.com/).

## Functionalities
- Maintains a list of top 20 topics and their upvotes/downvotes (sorted by upvotes, descending).
- Maintains a list of all topics (sorted by alphabetical order).
- User can submit topics. A “topic” is simply a string that does not exceed 255 characters.
- User can upvote or downvote a topic. User may upvote or downvote the same topic multiple times.
- User can change username multiple times (no user authentication).

## Guide
- Enter username. No login required.
> Username is required to be able to submit and vote on topics.
- Enter a new topic to submit (topic should be viewable under <b>All Topics</b>).
> Topic name will be rejected if it is a duplicate of one already in <b>All Topics</b>.
- Scroll down to <b>All Topics</b> to vote by clicking on <b>Up</b> or <b>Down</b> button.
- Check <b>Top 20 Topics</b> to see if any new topics made the list.

## Setup 
- Ensure you have node and npm installed.
- Go to project directory and run the following in command line:
```
npm install
npm start
```
- Browser should open to app.

## Testing
- To test, run:
```
npm test
```
- To view code coverage (auto-generated at the end of `npm test`):
```
npm run serve.coverage
```

## Acknowledgements
- [mgechev/angular-seed](https://github.com/mgechev/angular-seed) for Angular seed project.
- [Materialize](http://materializecss.com/) for Material Design styling.
- Default topics sourced from [Ted topics](https://www.ted.com/topics).
- data.json for default topics generated with help of [objgen](http://objgen.com/json).
- Hosted on [Heroku](https://www.heroku.com/).

## Written Code (Majority)
- src/client/app/home/home.component.html
- src/client/app/home/home.component.spec.ts
- src/client/app/home/home.component.ts
- src/client/app/home/home.service.spec.ts
- src/client/app/home/home.service.ts
- data.json
