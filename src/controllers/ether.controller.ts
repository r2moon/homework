import {inject} from '@loopback/core';
import {get, getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {SignInResponse, VerifyRequest, VerifyResponse} from '../models';
import {EtherService} from '../services';

/**
 * OpenAPI response for ping()
 */

/**
 * A simple controller to bounce back http requests
 */
export class EtherController {
  constructor(
    @inject('services.EtherService') private etherService: EtherService,
  ) {}

  // Map to `GET /sign_in`
  @get('/sign_in')
  signIn(): SignInResponse {
    const response = new SignInResponse();
    response.message = this.etherService.getSignInMessage();
    return response;
  }

  @post('/verify')
  verify(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VerifyRequest),
        },
      },
    })
    request: VerifyRequest,
  ): VerifyResponse {
    const response = new VerifyResponse();
    response.verified = this.etherService.verify(request);
    return response;
  }
}
