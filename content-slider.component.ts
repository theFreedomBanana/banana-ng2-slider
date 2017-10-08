// With some inspiration from http://www.ravinderpayal.com/Simple-and-Light-Weight-Image-or-Content-Slider-for-Angular2/

import { Component, Input, Output, ViewEncapsulation,
         ViewChildren, ContentChild, ElementRef, QueryList
} from '@angular/core';


@Component({
  selector: 'content-slider',
  templateUrl: './content-slider.component.html',
  styleUrls: ['./content-slider.component.sass'],
  encapsulation: ViewEncapsulation.None
})


export class ContentSliderComponent {

  @Input('intervalTime') intervalTime: number = 2000;
  @Input('autoPlay') set _autoPlay(b: boolean) {
    this.autoPlay = b;
    if(b) {
      this.auto(this.intervalTime);
    }
  }

  @ContentChild('slideShow') set _slideShow(s: ElementRef) {
    this.children = s.nativeElement.children;
    this.numberOfElm = this.children.length;
    if(this.children.length) {
      this.children[0]['classList'].add("active");
    }
  }

  @ViewChildren('navRadio') private _navRadios: QueryList<any>

  children: Array<ElementRef>;
  numberOfElm: number = 0;
  currentElm: number = 0;
  autoPlay = false;
  interval: any;
  // previousElm: number = 0;
  
  constructor() {}
  

  // backward() {
  //   if(this.autoPlay)
  //     clearInterval(this.interval);
  //   this.currentElm = this.currentElm - 1;
  //   if(this.currentElm < 0)
  //     this.currentElm = this.numberOfElm - 1;

  //   this.removeClasses();
  //   this.previousElm = this.currentElm == this.numberOfElm - 1 ? 0 : this.currentElm + 1;
  //   this.children[this.previousElm]['classList'].add("animateForward");
  //   this.show(this.children[this.previousElm]);
  //   this.show(this.children[this.currentElm]);

  //   clearTimeout(this.delayHideSetTimeOutControl);

  //   this.delayHideSetTimeOutControl = this.delayHide(this.children[this.previousElm], 1100);
  //   this.children[this.currentElm]['classList']("active", "backward");
  //   if (this.autoPlay) {
  //     this.auto(this.intervalTime);
  //   };
  //   this.hide();
  // }

  
  forward(index: number) {
    if (index == this.currentElm) {
      return;
    }

    this._forward(index);

    if(this.autoPlay) {
      clearInterval(this.interval);
      this.auto(this.intervalTime);        
    }
  }

  private _forward(elm?: number) {
    this.removeClasses();
    this.children[this.currentElm]['classList'].add("animateBack");
    if (typeof(elm) != 'undefined') {
      this.currentElm = elm;
    }
    else if ( (this.numberOfElm - 1) > this.currentElm) {
      this.currentElm += 1;
    }
    else if ( (this.numberOfElm - 1) == this.currentElm) {
      this.currentElm = 0;
    }

    this.changeRadio(this.currentElm);
    this.children[this.currentElm]['classList'].add("active", "forward");
  }
  
  removeClasses() {
    Array.prototype.forEach.call( this.children, (child: ElementRef) => {
      child['classList'].remove('active', 'backward', 'forward', 'animateBack', 'animateForward');
    })
  }

  auto(ms: number, index?: number) {
    this.interval = setInterval(this._forward.bind(this), ms);
  }

  changeRadio(index: number) {
    this._navRadios.forEach( (radio, i) => {
      if (i == index) {
        radio.nativeElement['classList'].add('active');
      }
      else {
        radio.nativeElement['classList'].remove('active');
      }
    })
  }    

}
