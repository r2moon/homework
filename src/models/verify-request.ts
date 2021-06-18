import {Model, model, property} from '@loopback/repository';

@model()
export class VerifyRequest extends Model {
  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  signedMessage: string;
}
