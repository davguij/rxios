import { rxios } from '../src';

describe('GET methods', () => {
  let rxiosInstance: rxios;
  
  beforeEach(() => {
    rxiosInstance = new rxios({
      baseURL: 'http://localhost:3000'
    });
  });

  it('makes a successful GET req', () => {
    const expected = { id: 1, title: 'json-server', author: 'typicode' };
    rxiosInstance.get('/posts/1').subscribe(resp => {
      expect(resp).toMatchObject(expected);
    }, err => {
      expect(err).toBeFalsy();
    });
  });

  it('throws an error on a failed GET req', () => {
    rxiosInstance.get('/posts/99999').subscribe(resp => {
      expect(resp).toBeFalsy();
    }, err => {
      expect(err).toBeDefined();
      expect(err.message).toBe('Request failed with status code 404');      
    });
  })
});

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


describe('POST methods', () => {
  let rxiosInstance: rxios;
  
  beforeEach(() => {
    rxiosInstance = new rxios({
      baseURL: 'http://localhost:3000'
    });
  });

  it('makes a successful POST req', () => {
    const randomId = getRandomInt(0, 99998);
    const body = { id: randomId, title: 'json-server', author: 'typicode' };
    rxiosInstance.post('/posts', body).subscribe(postResponse => {
      expect(postResponse).toMatchObject(body);
    }, err => {
      expect(err).toBeFalsy();      
    });
  });
});