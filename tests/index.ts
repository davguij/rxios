import { rxios } from '../src';
import * as moxios from 'moxios';

describe('GET methods', () => {
  let rxiosInstance: rxios;
  
  beforeEach(() => {
    rxiosInstance = new rxios();
    moxios.install(rxiosInstance._httpClient);
  });

  it('makes a successful GET req', () => {
    const expected = { id: 1, title: 'rxios is so cool!', author: 'davguij' };

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({response: expected, status: 200});  
    });

    rxiosInstance.get('/posts/1').subscribe(resp => {
      expect(resp).toMatchObject(expected);
    }, err => {
      expect(err).toBeFalsy();
    });
  });

  it('throws an error on a failed GET req', () => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({status: 404});  
    });

    rxiosInstance.get('/posts/1').subscribe(resp => {
      expect(resp).toBeFalsy();
    }, err => {
      expect(err).toBeDefined();
      expect(err.message).toBe('Request failed with status code 404');      
    });
  });

  // it('accepts queryParams', () => {
  //   rxiosInstance.get('/posts', {title: 'rxios is so cool!', author: 'davguij'}).subscribe(resp => {
  //     expect(resp).toBeDefined();
  //   }, err => {
  //     expect(err).toBeFalsy();
  //   })
  // })

  afterEach(() => {
    // import and pass your custom axios instance to this method
    moxios.uninstall(rxiosInstance._httpClient);
  });

});

// const getRandomInt = (min: number, max: number) => {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// describe('POST methods', () => {
//   let rxiosInstance: rxios;
  
//   beforeEach(() => {
//     rxiosInstance = new rxios({
//       baseURL: 'http://localhost:3000'
//     });
//   });

//   it('makes a successful POST req', () => {
//     const randomId = getRandomInt(0, 99998);
//     const body = { id: randomId, title: 'json-server', author: 'davguij' };
//     rxiosInstance.post('/posts', body).subscribe(postResponse => {
//       expect(postResponse).toMatchObject(body);
//     }, err => {
//       expect(err).toBeFalsy();      
//     });
//   });

// });