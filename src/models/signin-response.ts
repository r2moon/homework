import {Model, model, property} from '@loopback/repository';

@model()
export class SignInResponse extends Model {
  @property({
    type: 'string',
    required: true,
  })
  message: string;
}
