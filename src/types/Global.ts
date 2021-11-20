import {Uuid} from './Utils';

export interface JwtPayload {
  username: string;
  id: Uuid;
  emailAddress: string;
}
