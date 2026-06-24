import { CanDeactivateFn } from '@angular/router';
import { MemberProfile } from '../../Features/members/member-profile/member-profile';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberProfile> = (
  component,
  currentRoute,
  currentState,
  nextState,
) => {
  
  if(component.editForm?.dirty){
    return confirm('all changes wil be discarded');
  }
  return true;
};
