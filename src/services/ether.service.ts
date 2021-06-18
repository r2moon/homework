import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {ethers} from 'ethers';
import {SIGN_IN_MESSAGE} from '../constants';
import {VerifyRequest} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class EtherService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  public getSignInMessage(): string {
    return SIGN_IN_MESSAGE;
  }

  public verify(request: VerifyRequest): boolean {
    try {
      const signer = ethers.utils.verifyMessage(
        SIGN_IN_MESSAGE,
        request.signedMessage,
      );
      return signer.toLowerCase() === request.address.toLowerCase();
    } catch (err) {
      return false;
    }
  }
}
