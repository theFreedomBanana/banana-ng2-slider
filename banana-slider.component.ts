// With some inspiration from http://www.ravinderpayal.com/Simple-and-Light-Weight-Image-or-Content-Slider-for-Angular2/

import { Component, Input,
         Output, ViewEncapsulation,
         HostListener, ContentChildren,
         ViewChildren, ContentChild, 
         ElementRef, QueryList }         from '@angular/core';


@Component({
  selector: 'banana-slider',
  templateUrl: './banana-slider.component.html',
  styleUrls: ['./banana-slider.component.sass'],
  encapsulation: ViewEncapsulation.None
})


export class ContentSliderComponent {

  @Input('intervalTime') intervalTime: number = 2000;
  @Input('autoPlay') set _setAutoPlay(b: boolean) {
    this._autoPlay = b;
    if(b) {
      this._auto(this.intervalTime);
    }
  }
  @Input('slideTo') set _slideTo(index: number) {
    if ( (typeof(index) === "number") && (index != this._currentElm) ) {
       this._forward(index);

      if(this._autoPlay) {
        clearInterval(this._interval);
        this._auto(this.intervalTime);        
      }
    }
  }

  @ContentChild('slideShow') set _slideShow(s: ElementRef) {
    this._children = s.nativeElement.children;
    this._numberOfElm = this._children.length;
    if(this._children.length) {
      this._children[0]['classList'].add("active");
    }
  }

  @ContentChildren('navRadios') private _navRadios: QueryList<any>;

  private _children: Array<ElementRef>;
  private _numberOfElm: number = 0;
  private _currentElm: number = 0;
  private _autoPlay = false;
  private _interval: any;
  // previousElm: number = 0;
  
  constructor() {}
  

  // backward() {
  //   if(this._autoPlay)
  //     clearInterval(this._interval);
  //   this._currentElm = this._currentElm - 1;
  //   if(this._currentElm < 0)
  //     this._currentElm = this._numberOfElm - 1;

  //   this._removeClasses();
  //   this.previousElm = this._currentElm == this._numberOfElm - 1 ? 0 : this._currentElm + 1;
  //   this._children[this.previousElm]['classList'].add("animateForward");
  //   this.show(this._children[this.previousElm]);
  //   this.show(this._children[this._currentElm]);

  //   clearTimeout(this.delayHideSetTimeOutControl);

  //   this.delayHideSetTimeOutControl = this.delayHide(this._children[this.previousElm], 1100);
  //   this._children[this._currentElm]['classList']("active", "backward");
  //   if (this._autoPlay) {
  //     this._auto(this.intervalTime);
  //   };
  //   this.hide();
  // }

  private _forward(elm?: number) {
    this._removeClasses();
    this._children[this._currentElm]['classList'].add("animateBack");
    if (typeof(elm) != 'undefined') {
      this._currentElm = elm;
    }
    else if ( (this._numberOfElm - 1) > this._currentElm) {
      this._currentElm += 1;
    }
    else if ( (this._numberOfElm - 1) == this._currentElm) {
      this._currentElm = 0;
    }

    this._changeRadio(this._currentElm);
    this._children[this._currentElm]['classList'].add("active", "forward");
  }
  
  private _removeClasses() {
    Array.prototype.forEach.call( this._children, (child: ElementRef) => {
      child['classList'].remove('active', 'backward', 'forward', 'animateBack', 'animateForward');
    })
  }

  private _auto(ms: number, index?: number) {
    this._interval = setInterval(this._forward.bind(this), ms);
  }

  private _changeRadio(index: number) {
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
