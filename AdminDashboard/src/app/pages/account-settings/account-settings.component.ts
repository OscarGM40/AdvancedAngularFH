import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  linkTheme = document.querySelector('#theme');
  // links devuelve un nodelist, por eso se usa el metodo forEach(un node list es un arreglo de elementos html)
  public links!: NodeListOf<Element>;

  changeTheme(theme: string) {
    const url = `assets/css/colors/${theme}.css`;
    this.linkTheme!.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }
  
  checkCurrentTheme() {
    this.links.forEach(elem => {
      elem.classList.remove('working');
      const bg = elem.getAttribute('data-theme');
      const bgUrl = `assets/css/colors/${bg}.css`;
      const currentTheme = localStorage.getItem('theme');
      if (bgUrl === currentTheme) {
        elem.classList.add('working');
      }
    })
  }
  
  constructor() { }
  
  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();    
  }
  
}
