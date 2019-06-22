## Setup

glone repo and run `npm run build`
you may have to modify CSP tags for it to work on localhost/ip you may be using or you may access hosted version here http://52.56.180.211:3001/

## Assumptions

Kept it as basic as possible. 
Added a bit of redux, redux-form, react-router, CSP
I would have had an api call to get count of search instead of grabbing all the result to get total count for creating paginations etc.
assumed pagination numbers will not show when there is less than 20 search results.
