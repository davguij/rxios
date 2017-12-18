import { rxios } from '../src';
import * as nock from 'nock';
describe('GET methods', () => {
  let rxiosInstance: rxios;
  
  beforeEach(() => {
    rxiosInstance = new rxios();
  });

  it('makes a successful GET req', async () => {
    const expected = { id: 1, title: 'rxios is so cool!', author: 'davguij' };
    nock('http://test.com').get('/posts/1').reply(200, expected);
    const promise = new Promise((resolve, reject) => {
      rxiosInstance.get('http://test.com/posts/1').subscribe(resp => {
        resolve(resp);
      }, err => {
        reject(err);
      });  
    });
    await expect(promise).resolves.toEqual(expected);
  });

  it('throws an error on a failed GET req', async () => {
    nock('http://test.com').get('/posts/1').replyWithError('Request failed with status code 500');

    const promise = new Promise((resolve, reject) => {
      rxiosInstance.get('http://test.com/posts/1').subscribe(resp => {
        resolve(resp);
      }, err => {
        reject(err);
      });  
    });
    await expect(promise).rejects.toBeInstanceOf(Error);
  });

  // it('accepts queryParams', () => {
  //   rxiosInstance.get('/posts', {title: 'rxios is so cool!', author: 'davguij'}).subscribe(resp => {
  //     expect(resp).toBeDefined();
  //   }, err => {
  //     expect(err).toBeFalsy();
  //   })
  // })

  // afterEach(() => {
  //   // import and pass your custom axios instance to this method
  //   moxios.uninstall(rxiosInstance._httpClient);
  // });

// });

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

});
