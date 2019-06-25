Demo being served by apache available here http://52.56.180.211:3001/

## Setup

 glone repo

 you may have to modify CSP tags for it to work on localhost/ip. Edit file `public/index.html`

 run `npm i` then `npm run start`

## Assumptions

 Kept it as basic as possible. 

 Added a bit of redux, redux-form, react-router, CSP
 
 validated 1st part of postcode only

 Assumed api may not always return a limit of 100. I would have had an api call to get count of search instead of grabbing all the result to get total count for creating paginations etc.

 assumed pagination numbers will not show when there is less than 20 search results.
 
 I have noticed some cors issue when accessing the api. I have decided not set up any proxy.
 
 Arrow buttons on pagination will take you prev and next

## Troublshooting

 [![Edit plentific](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/plentific-uo68b?eslint=1&fontsize=14)
 
 
