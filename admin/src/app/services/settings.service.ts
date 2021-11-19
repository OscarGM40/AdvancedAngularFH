import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');
   // links devuelve un nodelist, por eso se usa el metodo forEach(un node list es un arreglo de elementos html)
   
   constructor() {
     const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
     this.linkTheme!.setAttribute('href', url);
    }
    
    changeTheme(theme: string) {
      const url = `assets/css/colors/${theme}.css`;
      this.linkTheme!.setAttribute('href', url);
      localStorage.setItem('theme', url);

      this.checkCurrentTheme()
      
    }
    
 checkCurrentTheme() {
    const links: NodeListOf<Element>=document.querySelectorAll('.selector');

    links.forEach(elem => {
      elem.classList.remove('working');
      const bg = elem.getAttribute('data-theme');
      const bgUrl = `assets/css/colors/${bg}.css`;
      const currentTheme = localStorage.getItem('theme');
      if (bgUrl === currentTheme) {
        elem.classList.add('working');
      }
    })
  }
  
  
}


