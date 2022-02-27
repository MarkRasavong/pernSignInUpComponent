# PERN Stack Portal

A user/admin portal where an admin can edit a users' email, authorisation status, name, and surname. Users can only view their email and user id but not have access to the admin dash.

**Link to project:** https://pern-portal.netlify.app/

![pern portal gif](/client/pern_portal.gif)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, React, Postgres, Express w/ Node.js, Self-made API

Form handling and validation was implemented by react-hook-form and styling and switching of the registration form was created using MUI (Material UI) and authorization logic and handling tech was used with json-web-token, jwt-decode, sessionStorage and communication of API was used with axios. All passwords were salted and encoded incase of potienal hacks.

https://thawing-sea-19132.herokuapp.com/api/users/
![pern portal gif](/client/pern_portal_portal.gif)

## Optimizations

Could have used password comparison in the backend to validate the repeated password. If this portal utilised redux we can render people's data instatly instead of no render due to the data being stored in sessionStorage (user page) and refreshing the page after the API post request. Admin dash should search more than just the email (e.g. name, surname, userId, etc). Login could throw an error for invalid credentials.

## Lessons Learned:

I was having trouble creating the table but learned the chain of events needed to have the pagination, columns, and sorting to work in synchronisation. React-Router-DOM has a special way of authorisated users to enter certain pages. Before we could write ternary operator with in the element property but now we must have a seperate authorisation file and logic within the App.jsx and 'RequireAuth.js'.

## Examples:

Take a look at these couple examples that I have in my own portfolio:

**Nano Móvil:** https://github.com/mark-rasavong/nano_movil

**Ringo Bar:** https://github.com/mark-rasavong/ringo_bar

**TravelNotes:** https://github.com/mark-rasavong/TravelNotes
