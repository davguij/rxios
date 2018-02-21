jest.setTimeout(20000);

import { rxios, Rxios } from '../src';
import * as nock from 'nock';

const mockServer = nock('http://test.com');

describe('Instantiation', () => {
  let rxiosInstance: rxios;

  afterEach(() => {
    rxiosInstance = null;
  });

  it('works with new rxios()', () => {
    rxiosInstance = new rxios({
      baseURL: 'http://test.com/',
    });
    expect(rxiosInstance).toBeInstanceOf(rxios);
  });

  it('also works with new Rxios()', () => {
    rxiosInstance = new Rxios({
      baseURL: 'http://test.com/',
    });
    expect(rxiosInstance).toBeInstanceOf(rxios);
  });
});

describe('GET method', () => {
  let rxiosInstance: rxios;

  beforeEach(() => {
    rxiosInstance = new rxios({
      baseURL: 'http://test.com/',
    });
  });

  afterEach(() => {
    rxiosInstance = null;
  });

  it('makes a successful GET req', async () => {
    const expected = { id: 1, title: 'rxios is so cool!', author: 'davguij' };
    mockServer.get('/posts/1').reply(200, expected);
    const promise = new Promise((resolve, reject) => {
      rxiosInstance.get('http://test.com/posts/1').subscribe(
        resp => {
          resolve(resp);
        },
        err => {
          reject(err);
        }
      );
    });
    await expect(promise).resolves.toEqual(expected);
  });

  it('throws an error on a failed GET req', async () => {
    mockServer
      .get('/posts/1')
      .replyWithError('Request failed with status code 500');

    const promise = new Promise((resolve, reject) => {
      rxiosInstance.get('http://test.com/posts/1').subscribe(
        resp => {
          resolve(resp);
        },
        err => {
          reject(err);
        }
      );
    });
    await expect(promise).rejects.toBeInstanceOf(Error);
  });

  it('accepts queryParams', async () => {
    mockServer
      .get('/posts')
      .query({ title: 'rxios', author: 'davguij' })
      .reply(200);
    const promise = new Promise((resolve, reject) => {
      rxiosInstance
        .get('http://test.com/posts', { title: 'rxios', author: 'davguij' })
        .subscribe(
          resp => {
            resolve(resp);
          },
          err => {
            reject(err);
          }
        );
    });
    await expect(promise).resolves.toBeDefined();
  });

  it('accepts a type for the response', async () => {
    interface i {
      cool: boolean;
    }

    const response: i = { cool: true };

    mockServer.get('/post/1').reply(200, response);
    const promise = new Promise((resolve, reject) => {
      rxiosInstance.get<i>('http://test.com/post/1').subscribe(
        resp => {
          resolve(resp);
        },
        err => {
          reject(err);
        }
      );
    });
    await expect(promise).resolves.toBeDefined();
  });
});

describe('POST method', () => {
  let rxiosInstance: rxios;

  beforeEach(() => {
    rxiosInstance = new rxios({
      baseURL: 'http://test.com/',
    });
  });

  afterEach(() => {
    rxiosInstance = null;
  });

  it('makes a successful POST req', async () => {
    mockServer.post('/posts').reply(201);
    const body = { title: 'json-server', author: 'davguij' };
    const promise = new Promise((resolve, reject) => {
      rxiosInstance.post('posts', body).subscribe(
        resp => {
          resolve(resp);
        },
        err => {
          reject(err);
        }
      );
    });
    await expect(promise).resolves.toBeDefined();
  });

  it('throws an error on a failed POST req', async () => {
    mockServer
      .post('/posts')
      .replyWithError('Request failed with status code 500');

    const promise = new Promise((resolve, reject) => {
      rxiosInstance.post('http://test.com/posts', {}).subscribe(
        resp => {
          resolve(resp);
        },
        err => {
          reject(err);
        }
      );
    });
    await expect(promise).rejects.toBeInstanceOf(Error);
  });
});

describe('rest of methods', () => {
  let rxiosInstance: rxios;

  beforeEach(() => {
    rxiosInstance = new rxios({
      baseURL: 'http://test.com/',
    });
  });

  afterEach(() => {
    rxiosInstance = null;
  });

  it('makes a successful PUT req', async () => {
    const body = { title: 'json-server', author: 'davguij' };
    mockServer.put('/post/1').reply(200, body);
    const promise = new Promise((resolve, reject) => {
      rxiosInstance.put('post/1', body).subscribe(
        resp => {
          resolve(resp);
        },
        err => {
          reject(err);
        }
      );
    });
    await expect(promise).resolves.toEqual(body);
  });

  it('makes a successful PATCH req', async () => {
    const body = { title: 'json-server', author: 'davguij' };
    mockServer.patch('/post/1').reply(200, body);
    const promise = new Promise((resolve, reject) => {
      rxiosInstance.patch('post/1', body).subscribe(
        resp => {
          resolve(resp);
        },
        err => {
          reject(err);
        }
      );
    });
    await expect(promise).resolves.toEqual(body);
  });

  it('makes a successful DELETE req', async () => {
    mockServer.delete('/post/1').reply(200);
    const promise = new Promise((resolve, reject) => {
      rxiosInstance.delete('post/1').subscribe(
        resp => {
          resolve(resp);
        },
        err => {
          reject(err);
        }
      );
    });
    await expect(promise).resolves.toBeDefined();
  });
});
