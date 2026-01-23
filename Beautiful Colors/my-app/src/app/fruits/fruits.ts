import { Component } from '@angular/core';

@Component({
  selector: 'app-fruits',
  standalone: false,
  templateUrl: './fruits.html',
  styleUrl: './fruits.css',
})
export class Fruits {
fruits = [
    { name: 'orange', color: '#FFA500' },
    { name: 'banana', color: '#FFE135' },
    { name: 'lemon', color: '#FFF44F' },
    { name: 'strawberry', color: '#FC5A8D' },
    { name: 'apple', color: '#FF0800' }
  ];
}
