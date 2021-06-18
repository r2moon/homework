import {expect} from '@loopback/testlab';
import {ethers} from 'ethers';
import {SIGN_IN_MESSAGE} from '../../constants';
import {VerifyRequest} from '../../models';
import {EtherService} from '../../services';

describe('EtherService', () => {
  let etherService: EtherService;

  before('setupApplication', async () => {
    etherService = new EtherService();
  });

  describe('getSignInMessage', () => {
    it('getSignInMessage', async () => {
      const message = etherService.getSignInMessage();
      expect(message).to.equal(SIGN_IN_MESSAGE);
    });
  });

  describe('verify', () => {
    const wallet = ethers.Wallet.createRandom();

    it('return true for valid address and valid signature', async () => {
      const request = new VerifyRequest();
      request.address = wallet.address;
      request.signedMessage = await wallet.signMessage(SIGN_IN_MESSAGE);
      expect(etherService.verify(request)).to.equal(true);
    });

    it('return false for invalid signature', async () => {
      const otherWallet = ethers.Wallet.createRandom();
      const request = new VerifyRequest();
      request.address = wallet.address;
      request.signedMessage = await otherWallet.signMessage(SIGN_IN_MESSAGE);
      expect(etherService.verify(request)).to.equal(false);
    });

    it('return false if signature is invalid format', async () => {
      const request = new VerifyRequest();
      request.address = wallet.address;
      request.signedMessage = 'Invalid Signature';
      expect(etherService.verify(request)).to.equal(false);
    });

    it('return false if address is invalid format', async () => {
      const request = new VerifyRequest();
      request.address = 'Invalid address';
      request.signedMessage = await wallet.signMessage(SIGN_IN_MESSAGE);
      expect(etherService.verify(request)).to.equal(false);
    });
  });
});
