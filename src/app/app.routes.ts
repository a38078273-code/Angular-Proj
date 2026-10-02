import { Routes } from '@angular/router';
import { Member } from './member/member';
import { MemberForm } from './member-form/member-form';

export const routes: Routes = [
  { path: 'members', component: Member },
  { path: 'create', component: MemberForm },
  { path: 'edit/:id', component: MemberForm },
  { path: '', redirectTo: 'members', pathMatch: 'full' }
];
