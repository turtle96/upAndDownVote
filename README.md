# Up And Down Vote

Simple system to submit, upvote and downvote topics.

## Functionalities
- Maintains a list of top 20 topics and their upvotes/downvotes (sorted by upvotes, descending).
- Maintains a list of all topics (sorted by alphabetical order).
- User can submit topics. A “topic” is simply a string that does not exceed 255 characters.
- User can upvote or downvote a topic. User may upvote or downvote the same topic multiple times.
- User can change username multiple times (no user authentication).

## Guide
- Enter username. No login required.
- Enter a new topic to submit (topic should be viewable under <b>All Topics</b>).
- Scroll down to <b>All Topics</b> to vote by clicking on <b>Up</b> or <b>Down</b> button.
> Topic name will be rejected if it is a duplicate of one already in <b>All Topics</b>.

## Setup 
- Ensure you have node and npm installed.
- Go to project directory and run the following in command line:
```
npm install
npm start
```
- Browser should open to app.
- To test, run:
```
npm test
```

## Acknowledgements
- [mgechev/angular-seed](https://github.com/mgechev/angular-seed) for quick start seed Angular project.
- [Materialize](http://materializecss.com/) for quick Material Design styling.
- Default topics sourced from [Ted topics](https://www.ted.com/topics).
- data.json for default topics generated with help of [objgen](http://objgen.com/json).

## Written Code (Majority)
- src/client/app/home/home.component.html
- src/client/app/home/home.component.spec.ts
- src/client/app/home/home.component.ts
- src/client/app/home/home.service.spec.ts
- src/client/app/home/home.service.ts
- data.json
