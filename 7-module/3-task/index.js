import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
        </div>
      </div>`
    );
    this.renderSteps(steps);

    //ниже устанавливаю значение по умолчанию в зависимости от заданного изначально value
    //не знаю, нужно ли, но вдруг оно будет не 0, а, например, 2
    this.highlightStep(value);
    this.setSliderValue(value);
    this.setSliderPosition(value / (steps - 1) * 100);

    this.elem.addEventListener('click', this.setStep);
    
  }


  renderSteps(steps){
    for(let i = 0; i < steps; i++ ){
      this.elem.querySelector('.slider__steps').innerHTML += '<span></span>';
    }
  }


  setStep = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;
    this.setSliderValue(value);
    this.highlightStep(value);
    this.setSliderPosition(valuePercents);

    let sliderChange = new CustomEvent('slider-change', { 
      detail: value, 
      bubbles: true 
    })
    this.elem.dispatchEvent(sliderChange);
    
  }


  setSliderValue(value){
      this.elem.querySelector('.slider__value').innerHTML = value;
  }


  highlightStep(value){
      let allSteps = this.elem.querySelectorAll('.slider__steps span');
      allSteps.forEach(
        function(item) {
          item.classList.remove('slider__step-active');
        }
      );
      allSteps[value].classList.add('slider__step-active');
  }


  setSliderPosition(valuePercents){
    this.elem.querySelector('.slider__progress').style.width = `${valuePercents}%`;
    this.elem.querySelector('.slider__thumb').style.left = `${valuePercents}%`;
  }


}
