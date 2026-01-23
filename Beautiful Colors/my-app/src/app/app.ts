import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})

export class App {

  logged = false
  protected readonly title = signal('my-app');

  login = () => {
    this.logged = true
  }

  logout = () => {
    this.logged = false
  }
}
