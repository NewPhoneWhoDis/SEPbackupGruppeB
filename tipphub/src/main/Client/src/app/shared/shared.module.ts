import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';
import { TabComponent } from './tab/tab.component';



@NgModule({
  declarations: [
    TabsContainerComponent,
    TabComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TabsContainerComponent,
    TabComponent
  ]
})
export class SharedModule { }
