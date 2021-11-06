function initCarousel() {
  let carousel = document.querySelector('.carousel');
  let carouselInner = carousel.querySelector('.carousel__inner');
  let slideWidth = carouselInner.offsetWidth; //получаем длину слайда
  let toLeft = carousel.querySelector('.carousel__arrow_left');
  let toRight = carousel.querySelector('.carousel__arrow_right');
  let translate = 0;//изначально у нас смещение = 0
  let translateMax = - slideWidth * (carouselInner.children.length - 1);//максимальное смещение   
  carousel.querySelector('.carousel__arrow_left').style.display = 'none';

  carousel.addEventListener('click', (event) => {

    let toNext = event.target.classList.contains('carousel__arrow_right') || event.target.closest('.carousel__arrow_right'); //если мы кликаем по кнопке или иконке внутри
    let toPrev = event.target.classList.contains('carousel__arrow_left') || event.target.closest('.carousel__arrow_left'); //если мы кликаем по кнопке или иконке внутри
   
    if(toNext){
      translate -= slideWidth;
      carouselInner.style.transform = `translateX(${translate}px)`;
    } else if(toPrev){
      translate += slideWidth;
      carouselInner.style.transform = `translateX(${translate}px)`;
    }

    if (translate == translateMax) {
      toRight.style.display = 'none';
      toLeft.style.display = '';
    } else if (translate == 0){
      toLeft.style.display = 'none';
      toRight.style.display = '';
    } else {
      toRight.style.display = '';
      toLeft.style.display = '';
    }

  })
}
