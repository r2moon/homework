import {Model, model, property} from '@loopback/repository';

@model()
export class VerifyResponse extends Model {
  @property({
    type: 'boolean',
    required: true,
  })
  verified: boolean;
}
