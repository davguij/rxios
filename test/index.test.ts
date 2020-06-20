import { rxios, Rxios } from '../src';
import nock from 'nock';

const MOCK_URL = 'http://test.com';
const mockServer = nock(MOCK_URL);

describe('Function syntax', () => {
  it('makes a successful request', done => {
    const endpointUrl = `/posts/1`;
    mockServer
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(endpointUrl)
      .reply(200, { success: true });
    rxios.get(`${MOCK_URL}${endpointUrl}`).subscribe((response: any) => {
      expect(response).toBeDefined();
      done();
    });
  });
});

describe('Class syntax', () => {
  describe('Class instantiation', () => {
    it('is working properly', () => {
      const instance = new Rxios({});
      expect(instance).toBeInstanceOf(Rxios);
    });
  });

  describe('GET method', () => {
    let instance: Rxios;

    beforeEach(() => {
      instance = new Rxios({
        baseURL: MOCK_URL,
      });
    });

    it('makes a successful request', done => {
      const endpointUrl = '/posts/1';
      const expected = { id: 1, title: 'Rxios is so cool!', author: 'davguij' };
      mockServer
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(endpointUrl)
        .reply(200, expected);
      instance.get(endpointUrl).subscribe(result => {
        expect(result).toStrictEqual(expected);
        done();
      });
    });

    it('returns an error on unsuccessful request', done => {
      const errCode = 500;
      const endpointUrl = '/error';
      mockServer
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(endpointUrl)
        .reply(errCode);
      instance.get(endpointUrl).subscribe(
        _ => {},
        err => {
          expect(err.response.status).toBe(errCode);
          done();
        }
      );
    });

    it('accepts queryParams', done => {
      const endpointUrl = '/posts';
      const queryParams = { cool: true, message: 'Rxios is so cool!' };
      mockServer
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })

        .get(endpointUrl)
        .query(queryParams)
        .reply(200, queryParams);
      instance.get(endpointUrl, queryParams).subscribe(response => {
        expect(response).toStrictEqual(queryParams);
        done();
      });
    });

    it('accepts a type for the response', done => {
      const endpointUrl = '/posts/1';
      interface i {
        cool: boolean;
      }
      const expected: i = { cool: true };

      mockServer
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get(endpointUrl)
        .reply(200, expected);

      instance.get<i>(endpointUrl).subscribe(response => {
        expect(response).toEqual(expected);
        done();
      });
    });
  });

  describe('POST method', () => {
    let instance: Rxios;

    beforeEach(() => {
      instance = new Rxios({
        baseURL: MOCK_URL,
      });
    });

    it('makes a successful request', done => {
      const endpointUrl = '/posts';
      const payload = { message: 'Rxios is cool', isCool: true };
      mockServer
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })

        .post(endpointUrl, payload)
        .reply(201, (_, requestBody) => requestBody);
      instance.post(endpointUrl, payload).subscribe(response => {
        expect(response).toStrictEqual(payload);
        done();
      });
    });

    it('returns an error on a failed request', done => {
      const endpointUrl = '/posts';
      const payload = { message: 'Rxios is cool', isCool: true };
      mockServer
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post(endpointUrl, payload)
        .reply(404);
      instance.post(endpointUrl, payload).subscribe(
        _ => {},
        err => {
          expect(err.response.status).toBe(404);
          done();
        }
      );
    });
  });

  describe('rest of methods', () => {
    const endpointUrl = '/posts/1';
    const payload = { message: 'Rxios is cool', isCool: true };

    let instance: Rxios;

    beforeEach(() => {
      instance = new Rxios({
        baseURL: MOCK_URL,
      });
    });

    it('PUT works', done => {
      mockServer
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .intercept(endpointUrl, 'OPTIONS')
        .reply(
          200,
          {},
          {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application:json',
          }
        )
        .put(endpointUrl, payload)
        .reply(200, payload);
      instance.put(endpointUrl, payload).subscribe(response => {
        expect(response).toStrictEqual(payload);
        done();
      });
    });

    it('PATCH works', done => {
      mockServer
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .intercept(endpointUrl, 'OPTIONS')
        .reply(
          200,
          {},
          {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application:json',
          }
        )
        .patch(endpointUrl, payload)
        .reply(200, payload);
      instance.patch(endpointUrl, payload).subscribe(response => {
        expect(response).toStrictEqual(payload);
        done();
      });
    });

    it('DELETE works', done => {
      mockServer
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .intercept(endpointUrl, 'OPTIONS')
        .reply(
          200,
          {},
          {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application:json',
          }
        )
        .delete(endpointUrl)
        .reply(200);
      instance.delete(endpointUrl).subscribe(response => {
        expect(response).toBeDefined();
        done();
      });
    });
  });
});
