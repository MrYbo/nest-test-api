import { SetMetadata } from '@nestjs/common';
import { AuthStrategies } from '../constants/constants';

export const SELECT_AUTH_KEY = 'select-auth';

export const AuthStrategy = (auth?: AuthStrategies) =>
  SetMetadata(SELECT_AUTH_KEY, auth);
