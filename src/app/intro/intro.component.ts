import { Component, HostListener, OnInit } from '@angular/core';
import { Canvas } from '../models/canvas';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  datas: string[] = [];
  screenWidth = 0;
  screenHeight = 0;
  counter = 0;

  constructor() { }

  ngOnInit(): void {
    this.onWindowResize();

    setInterval(() => {
      this.paintCanvas();
    }, 200);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  paintCanvas() {
    const canvas: Canvas = this.getDatasLength();
    
    this.counter++;
  }

  getDatasLength() {
    const canvasHeight = (this.screenHeight - 70) / 18;
    const canvasWidth = this.screenWidth / 7;

    return {
      height: canvasHeight,
      width: canvasWidth
    }
  }
}
