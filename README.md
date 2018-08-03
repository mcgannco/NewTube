# NewTube
[Live Link](http://newtubeapp.herokuapp.com/)

![Optional Text](./app/assets/images/videoindex.png)
NewTube, inspired by Youtube, is a single page video streaming web application. Functionality of NewTube includes uploading and watching videos, customizing your channel, searching for content, and interacting with the NewTubes content through comments, likes, subscriptions and more.

## Table of Contents
**Features**

* [User Authentication](#user-authentication)
* [Fluid Grid System](#fluid-grid-system)
* [Night Mode](#night-mode)
* [Navigation](#navigation)
* [Search](#search)
* [Video Index / Show / Upload](#video-index--show--upload)
* [Custom Video Player / Video Preview](#custom-video-player--video-preview)
* [Video Queue / Autoplay](#video-queue--autoplay)
* [Recursive Comments](#recursive-comments)
* [Likes(Polymorphic Association)](#likespolymorphic-association)
* [Subscriptions](#subscriptions)
* [Watch Later](#watch-later)
* [Filters](#filters)
* [Channels](#channels)
* [Tags](#tags)
* [N + 1 Query Prevention](#n--1-query-prevention)
* [Future Features](#n--1-query-prevention)

## Project Information
NewTube was developed utilizing Ruby on Rails, React.js with Redux, SASS, and AWS S3.

## User Authentication
Users can create and login to their personal channels.  Users provide a username (which must be unique) and a password of at least 6 characters.  Any errors with username or password will be communicated to users through error messages.

On the back-end, an encrypted, hashed password is stored in the database (passwords are never saved to the database). On log-in, the provided password is rehashed and compared to the encrypted password in order to verify the log-in.

NewTubes User Auth UI is implemented in a two step process.  Users first enter usernames.  An AJAX call is subsequently made, querying the users database for a user with the provided input.  Once the user is retrieved, users are greeted and asked for their password.  Finally, another AJAX call is made to the users table, where the hashed password is fetched given user input.

![filter-map](/app/assets/images/auth2.gif)

```javascript
processInput() {
  let path;
  let {verifyUsername, formType, receiveSessionErrors, processForm, clearSessionErrors}  = this.props;
  formType === "login" ? path = "/signin" : path = "/signup"
  if (!this.state.userVerified) {
    verifyUsername({username: this.state.username, path: path }).then(
      username => {
        clearSessionErrors()
        this.setState({userVerified: true});
      },
      errors => {
        receiveSessionErrors(errors.responseJSON);
      }
    )
  } else {
    if(this.state.reRoute === "/my_history") {
      processForm({username: this.state.username, password: this.state.password}).then(this.historyRedirect)
    } else if(this.props.history.action === 'REPLACE' || this.props.uploadRedirect) {
      processForm({username: this.state.username, password: this.state.password}).then(this.uploadRedirect)
    } else {
      processForm({username: this.state.username, password: this.state.password})
    }
  }
}
```

## Fluid Grid System
NewTube was designed to be fluid and viewable on all screen sizes, to allow for a clean interface and positive user experience.  This was accomplished using SASS, media queries as well as a fluid grid system.

```css
.col {
  float: left;
  box-sizing: border-box;
}

[class*='col-'] {
  padding-right: 20px;
  margin-top: 1.5rem;
}

[class*='col-']:last-of-type {
  padding-right: 20px;
}

.col-2-3 {
  width: 66.6666%;
  padding-left: 20px;
}

.col-1-3 {
  width: 33.3333%;
}

.col-1-2 {
  width: 50%;
  padding-left: 20px;
  padding-right: 20px;
}

.col-1-2-1 {
  width: 50%;
  margin-top: 0px;
}

@media all and (max-width: 1000px) {
  [class*='col-'] {
    width: 100%;
  }

  [class*='col-']:last-of-type {
    padding-left: 20px;
  }
}
```
Other CSS features includes tooltips, which allows users to hover over icons and get text info on functionality available to them.

![Optional Text](./app/assets/images/tooltip.png)

## Night Mode
![Optional Text](./app/assets/images/nightmode2.png)

Every user has the option to change their viewing settings to night mode.  All channels start out with the traditional light colored UI, while a simple click will toggle to night mode, a dark themed UI perfect for viewing at night.  View settings are saved on the backend in the users database (resulting in changes persisting on refresh).  An onClick event listener is added to the settings li tag.  User view settings are passed down into the redux global state.  When the onClick event is fired, an edit user action is dispatched with the opposite view setting that the user currently possesses.  An AJAX request is then fired and changes the users view settings at the model level.

```javascript
toggleNightMode(e) {
  if(this.props.currentUser) {
    const formData = new FormData();
    formData.append("user[night_mode]", !this.state.nightMode);
    this.props.toggleNightMode(this.props.currentUser.id, formData).then(
      this.setState({nightMode: !this.state.nightMode})
    );
  } else {
    this.props.history.push('/signin')
  }

}
```

## Navigation
## Search
## Video Index / Show / Upload
## Custom Video Player / Video Preview
## Video Queue / Autoplay
## Recursive Comments
## Likes(Polymorphic Association)
## Subscriptions
## Watch Later
## Filters
## Channels
## Tags
## N + 1 Query Prevention
