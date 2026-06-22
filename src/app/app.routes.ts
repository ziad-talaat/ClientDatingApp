import { Routes } from '@angular/router';
import { Home } from '../Features/home/home';
import { MemberList } from '../Features/members/member-list/member-list';
import { MemberDetailed } from '../Features/members/member-detailed/member-detailed';
import { Lists } from '../Features/lists/lists';
import { Messages } from '../Features/messages/messages';
import { authGuard } from '../Core/guards/auth-guard';
import { NotFound } from '../Shared/errors/not-found/not-found';
import { ServerError } from '../Shared/errors/server-error/server-error';

export const routes: Routes = [
    {path:'', component:Home},
    {
        path:'',
        runGuardsAndResolvers:'always',
        canActivate:[authGuard],
        children:[
        {path:'members', component:MemberList},
        {path:'members/:id', component:MemberDetailed},
        {path:'lists', component:Lists},
        {path:'messages', component:Messages},
    ]
},

{path:'server-error', component:ServerError},
{path:'**', component:NotFound},

];