import {Client, expect} from '@loopback/testlab';
import {HomeworkApplication} from '../..';
import {SIGN_IN_MESSAGE} from '../../constants';
import {setupApplication} from './test-helper';

describe('EtherController', () => {
  let app: HomeworkApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  describe('GET /sign_in', () => {
    it('invokes GET /sign_in', async () => {
      const res = await client.get('/sign_in').expect(200);
      expect(res.body).to.containEql({message: SIGN_IN_MESSAGE});
    });
  });

  describe('POST /verify', () => {
    it('invokes POST /verify', async () => {
      const res = await client.post('/verify').expect(200);
      expect(res.body).to.containEql({message: SIGN_IN_MESSAGE});
    });
  });
});
