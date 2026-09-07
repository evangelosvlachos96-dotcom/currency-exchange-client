# Currency Exchange Client

React front end for the Currency Exchange API. Browse currencies, see rates, convert an amount. Admins get pages to manage the data.

## API

Needs the server running:

https://github.com/evangelosvlachos96-dotcom/currency-exchange-client

Start that first or every page loads empty.

## Roles

Guests see the currency list and search. Logged in users add rates and convert. Admins get a currencies dashboard, superusers an exchanges one.

The side menu builds itself from the role, so people only see links they can use.

## How it talks to the server

All calls sit in `src/api/index.js`. One axios instance with the base url and `withCredentials` on, then one function per endpoint.

That flag matters. The token comes back in a signed http only cookie, so the browser must be told to send cookies. No React code ever reads the token.

App asks who the user is on start and keeps it in state. Guarded pages check it and send you home if it is empty.

## Layout

```
src/App.js          routes and user state
src/api/index.js    every server call
src/pages/          one file per screen
src/components/     nav, search, pagination, forms
```

## Run it

```
git clone [https://github.com/alexandrosgialantzis/Curr-exchange-cliend](https://github.com/evangelosvlachos96-dotcom/currency-exchange-client/tree/main).git
npm install
npm start
```

Port 3000. Server expected on 4550.

The base url is hardcoded in `src/api/index.js`. Change it there if your server runs elsewhere.

## MIT License
