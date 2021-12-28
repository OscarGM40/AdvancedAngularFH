import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';


declare function customInitFunctions():any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {
  public year: number = new Date().getFullYear();

  constructor(
    private settingsService: SettingsService,
    private sidebarService:SidebarService
    ) {} 

   ngOnInit(): void {
    this.sidebarService.cargarMenu();
    customInitFunctions();
  }

}
