class DefaultStyles {
  constructor() {
    this.backdrop = this.createBackdrop();
    this.modalContainer = this.createModalContainer();
  }

  createBackdrop() {
    let backdropSection = $("<section>");
    backdropSection.addClass('bx-backdrop');
    backdropSection.css({
      'background-color': 'rgba(0,0,0,0.85)',
      'position': 'fixed',
      'z-index': '800',
      'width': '100vw',
      'height': '100vh',
      'display': 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'visibility': 'hidden'
    });
    return backdropSection;
  };

  createModalContainer() {
    let modalContainerDiv = $('<div>');
    modalContainerDiv.css({
      'width': '60%',
      'height': '60%',
      'background-color': '#ffffff',
    });
    return modalContainerDiv;
  };

  attachElement($selector, element, method) {
    switch (method) {
      case 'append':
        $($selector).append(element);
      case 'prepend':
        $($selector).prepend(element);
      default:
        break;
    };
  }

}
