# TechGlimpse Backend

## Table of Contents

- [Setup](#setup)
- [Running localy](#run-localy)
- [Api List](#api-list)

## Setup

```bash
npm install
```

## Run Localy

```bash
npm start
```

## Api List

### Authentication API

- Register a new user: `POST api/v1/auth/register`
- Login an existing user: `POST api/v1/auth/login`

### User API

- GET all Users: `GET api/v1/users`
- GET user by userId: `GET api/v1/users/:userId`
- UPDATE a user by userId: `PUT api/v1/users/:userId`
- DELETE a user by userId: `DELETE api/v1/users/:userId`

### Story API

- GET all stories: `GET api/v1/stories`
- GET story by storyId: `GET api/v1/stories/:storyId`
- GET all storie by a authorId: `GET api/v1/stories/author/:authorId`
- CREATE a new story: `POST api/v1/stories`
- UPDATE a story by storyId: `PUT api/v1/stories/:storyId`
- DELETE a story by storyId: `DELETE api/v1/stories/:storyId`
