class MiniCartUI {
  constructor() {
    this.overlay = this.createOverlay();
    this.dialogWindow = this.createDialogWindow();
  }

  createOverlay() {
    let overlay = $("<section>", { class: 'bx-backdrop' })
      .css({
        'background-color': 'rgba(0,0,0,0.85)',
        'position': 'fixed',
        'z-index': '800',
        'width': '100vw',
        'height': '100vh',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        // 'visibility': 'hidden'
      });
    return overlay;
  };

  createDialogWindow() {
    let dialogWindow = $('<div>', { class: 'bx-modal-container' })
      .css({
        'display': 'flex',
        'flex-direction': 'column',
        'width': '735px',
        'height': '455px',
        'padding': '15px',
        'background-color': '#ffffff',
        'border-radius': '0.4%',
      });
    return dialogWindow;
  };
}
