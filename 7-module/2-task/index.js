import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = createElement(`<div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>
    </div>`);

    this.modal.querySelector('.modal__close').addEventListener('click',this.close);

  }
  open = () => {
    document.body.classList.add('is-modal-open');
    document.body.append(this.modal);
    this.addEscBtnListener();
  }

  close = () => {
    document.body.classList.remove('is-modal-open');
    this.modal.remove();
    this.removeEscBtnListener();
  }

  handleEscBtn = (event) => {
    if (event.code == 'Escape') {
      this.close();
      console.log('Close by esc');
    } 
  }

  setTitle(title){
    this.modal.querySelector('.modal__title').innerHTML = title;
  }

  setBody(node){
    this.modal.querySelector('.modal__body').innerHTML = '';
    this.modal.querySelector('.modal__body').append(node);
  }

  addEscBtnListener = () => {
    document.addEventListener('keydown', this.handleEscBtn);
  }

  removeEscBtnListener = () => {
    document.removeEventListener('keydown', this.handleEscBtn);
  }

  
}
