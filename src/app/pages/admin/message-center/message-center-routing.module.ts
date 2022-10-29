import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageCenterComponent } from './message-center.component';
import { MessageDetailComponent } from "./message-detail/message-detail.component";
import { ComposeMessageComponent } from './compose-message/compose-message.component';
const routes: Routes = [
  { path: '', component: MessageCenterComponent },
  { path: 'compose', component:ComposeMessageComponent},
  { path: ':id', component:MessageDetailComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageCenterRoutingModule { }
