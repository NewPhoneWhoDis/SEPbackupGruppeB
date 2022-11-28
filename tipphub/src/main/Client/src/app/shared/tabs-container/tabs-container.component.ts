import { TabComponent } from './../tab/tab.component';
import { Component, AfterContentInit, ContentChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css']
})
export class TabsContainerComponent implements AfterContentInit {

  //!Targets only projected content
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList();

  constructor() { }

  ngAfterContentInit(): void {
      const activeTabs = this.tabs?.filter(tab => tab.activeTab)

      if(activeTabs.length === 0 || !activeTabs) {
        // Sets the first tab from the queryList to active, bang operator means that its 100% sure
        // that there will be atleast one tab
        this.selectTab(this.tabs!.first);
      }
    }
    
    /**
     * Sets a tab to be active
     * @param tab 
     */
    selectTab(tab: TabComponent) {
      this.tabs?.forEach(tab => { tab.activeTab = false; });

      tab.activeTab = true;

      // by returniung false in this context, the default behavior is prevented 
      return false;
    }
}
