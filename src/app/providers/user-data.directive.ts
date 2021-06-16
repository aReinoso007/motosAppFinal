/* eslint-disable @typescript-eslint/naming-convention */
import { Directive } from '@angular/core';
import { Storage } from '@ionic/storage';

@Directive({
  selector: '[appUserData]'
})
export class UserDataDirective {
  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public storage: Storage
  ) { }

}
