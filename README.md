# Alphabet Primer

Link: http://powerful-depths-44928.herokuapp.com/

## Description

A spaced-repetition alphabet-learning program with voice recognition available on some browsers.

## Screenshots

### Homepage/Login

![full page](/client/assets/login.png)

### Spaced Repetition Page

![main page](/client/assets/alphabet.png)

## Tech Stack

- DB: cloud-hosted MongoDB with MLab

- Server: Node, Express, Mongoose

- Client: React, Redux, Thunk

- Security: Passport, OAuth, Bearer

# Database Structure - Sample Items

## Collections
#### `users`
	{
		accessToken: 'gfehu7438rr83yr374ry4387r38',
		googleId: 176374526734,
		name: 'Test User',
		score: 12,
		questions: [{word_id: 6327452, freq: 3}, {word_id: 673462, freq: 1}]
	}

#### `words`
	{
		_id: 6327452,
		capital: 'A',
		lowercase: 'a',
		sounds: [ 'a', 'ah', 'hey' ]
	}

---

## Endpoints:

- [x] app.get('/game')
  - returns an initial question for a logged-in user
  - protected endpoint

- [x] app.put('/game')
  - updates user's list of questions based on true/false input from client
  - returns a new question for the user
  - protected endpoint

- [x] app.get('/auth/google')
  - initializes Google login process

- [x] app.get('auth/login/callback')
  - continues Google login process
