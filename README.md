# Rxios

## A RxJS wrapper for axios

[![npm](https://img.shields.io/npm/v/rxios.svg)]() [![Travis](https://img.shields.io/travis/davguij/rxios.svg?style=flat-square)]()

Rxios makes the awesome [axios](https://github.com/axios/axios) library reactive, so that it's responses are returned as [RxJS](https://github.com/ReactiveX/rxjs) observables.

### RxJS 6

Note that this version is build against [RxJS 6](https://github.com/ReactiveX/rxjs#rxjs-6) and your project may require migration from RxJS 5.x to RxJS 6.x.

### Observables? Why?

Regular promises are cool, especially for HTTP requests in async/await functions.

However, Observables provide operators like map, forEach, reduce... There are also powerful operators like retry() or replay(), that are often quite handy.

Observables also excel when we need to perform some kind of manipulation on the received data, or when we need to chain several requests.

Lastly, Reactive stuff is what all the cool kids are doing.

### Installation

`npm install axios rxjs rxios`

### Usage

```javascript
const { Rxios } = require('rxios');
// or import { Rxios } from 'rxios';
// import { rxios } from 'rxios' is also supported for historical reasons

const http = new Rxios({
  // all regular axios request configuration options are valid here
  // check https://github.com/axios/axios#request-config
  baseUrl: 'https://jsonplaceholder.typicode.com',
});

// plain GET request
http.get('/posts').subscribe(
  response => {
    console.log(response); // no need to 'response.data'
  },
  err => {
    console.error(err);
  }
);

// GET request with query params
http
  .get('/posts', { userId: 1 }) // you can pass an object as second param to the get() method
  .subscribe(
    response => {
      console.log(response); // no need to 'response.data'
    },
    err => {
      console.error(err);
    }
  );

// POST request
http
  .post('/posts', {
    // this object will be the payload of the request
    userId: 1,
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  })
  .subscribe(
    response => {
      console.log(response); // again, no need to 'response.data'
    },
    err => {
      console.error(err);
    }
  );
```

### TypeScript usage

Rxios is written in TypeScript, and its typings are provided in this same package.

Also, just like with axios or with Angular's Http module, response types are accepted by the method, like:

```typescript
import { Rxios } from 'rxios';
const http = new Rxios();
interface MyResponse = {userId: number; id: number; title: string};
http.get<MyResponse[]>('/posts/1')
  .subscribe(resp: MyResponse[] => {...});
```

### Advanced usage

All Rxios methods always return an Observable, to which we can apply advanced RxJS operations.

For example, we could make two simultaneous requests and merge their responses as they come, without needing to wait for both to be completed.

```javascript
import { Observable } from 'rxjs/Rx';
import { Rxios } from 'rxios';
const http = new Rxios();

const firstReq = http.get('/posts/1');
const secondReq = http.get('/posts/2');
firstReq.merge(secondReq).subscribe(...);
```
