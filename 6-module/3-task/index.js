import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
    constructor(slides) {
        this.slides = slides;

        this.elem = createElement(`<div class="carousel">
          <div class="carousel__arrow carousel__arrow_right">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
          </div>
          <div class="carousel__arrow carousel__arrow_left">
            <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
          </div>
          <div class="carousel__inner">
          </div>
          </div>`);

        for (let slide of slides){
            this.addSlide(slide);
        }

        this.countSlides = slides.length;
        this.currentSlide = 0;
        this.carouselInner = this.elem.querySelector('.carousel__inner');
        this.toLeft = this.elem.querySelector('.carousel__arrow_left');
        this.toRight = this.elem.querySelector('.carousel__arrow_right');
        
        this.toLeft.style.display = 'none';

        this.toLeft.addEventListener('click', this.prev);
        this.toRight.addEventListener('click', this.next);
        

    }
    addSlide(slide){
        slide = createElement(`<div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>`);
        this.elem.querySelector('.carousel__inner').append(slide);
        slide.querySelector('.carousel__button')
          .addEventListener('click', this.onClick);
    }
    prev = (event) => {
        if( this.currentSlide > 0 ) { 
            this.currentSlide--;
            this.updateSlides();
        } 
    }
    next = (event) => {
        if(this.currentSlide < this.countSlides-1) {
            this.currentSlide++;
            this.updateSlides();
        } 
    }
    updateSlides(){
      let offset = -this.carouselInner.offsetWidth * this.currentSlide;
      this.carouselInner.style.transform = `translateX(${offset}px)`;

        if (this.currentSlide == 0){
            this.toLeft.style.display = 'none';
        } else if (this.currentSlide == this.countSlides-1){
            this.toRight.style.display = 'none';
        } else {
            this.toLeft.style.display = '';
            this.toRight.style.display = '';
        }
    }
    onClick = (event) => {
      let productId = event.target.closest('.carousel__slide').dataset.id;

      let customEvent = new CustomEvent("product-add",{
          detail: productId,
          bubbles: true
      })
      this.elem.dispatchEvent(customEvent);
    }
}
