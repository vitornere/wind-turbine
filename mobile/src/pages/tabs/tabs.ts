import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HistoryPage } from '../history/history';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabAbout = AboutPage;
  tabHistory= HistoryPage;

  constructor() {

  }
}
