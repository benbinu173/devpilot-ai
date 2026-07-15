import { CurrentUser } from './current-user.interface';

export interface CurrentUserResponse {

  success: boolean;

  user: CurrentUser;

}