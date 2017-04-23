// COMPONENT GENERATORS
class MiniCartUI {
  constructor(data) {
    this.overlay = this.createOverlay();
    this.dialogWindow = this.createDialogWindow();
    this.closeButton = this.createCloseButton();
    this.header = this.createHeader(data);
  }

  createOverlay() {
    let overlay = $("<section>", { class: 'bx-overlay' })
      .css({
        'background-color': 'rgba(0,0,0,0.85)',
        'position': 'fixed',
        'z-index': '800',
        'width': '100vw',
        'height': '100vh',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'visibility': 'hidden'
      })
      .data('isOverlayOpen', false);
    return overlay;
  };

  createDialogWindow() {
    let dialogWindow = $('<div>', { class: 'bx-dialog-window' })
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

  createCloseButton() {
    let container = $('<div>')
      .css({
        'display': 'flex',
        'justify-content': 'flex-end',
        'color': '#b3b3b3',
      });
    let closeButton = $(
      '<svg aria-hidden="true" class="svg-icon svg-icon-close" viewBox="0 0 20 22" width="20" height="20"><path d="M1.143 22L10 12.257 18.857 22 20 20.743 11.143 11 20 1.257 18.857 0 10 9.743 1.143 0 0 1.257 8.857 11 0 20.743z"></path></svg>'
    ).click(() => {
      $('.bx-overlay').fadeOut('slow').css('visibility','hidden');
      $('.bx-overlay').data('isOverlayOpen', false);
    });
    return $(container).append(closeButton);
  }

  createHeader(data) {
    let header = $('<div>', { class: 'bx-cart-header mini-cart-header' })
      .css({
        'font-family': 'ars_maquette_proregular, sans-serif',
        'font-size': '28px',
        'font-weight': '400',
        'border-bottom': '1px solid #cbcbcb'
      });
    let title = $(`<h2>There Are ${data.itemCount} Items in Your Cart!</h2>`);
    $(header).append(title);
    return header;
  }
}

// UTILITIES

// A debounce function courtesy of the Underscore.JS library. I needed this
// copypasta so a user could scroll away after closing the overlay and not
// have it immediately pop up again.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

function monitorScrollPercentage(){

  $(window).on("scroll", function(){
    var isOverlayOpen = $('.bx-overlay').data('isOverlayOpen');
        winHeight = $(window).height();
        docHeight = $(document).height();
        scrollTop = $(window).scrollTop();
        trackLength = docHeight - winHeight;
        amountScrolled = Math.floor(scrollTop/trackLength * 100);

    if (isOverlayOpen == false && amountScrolled >= 90) {
      $('.bx-overlay').css('visibility','visible').hide().fadeIn('slow');
      $('.bx-overlay').data('isOverlayOpen', true)
    };
  });
};

function renderComponents(data) {
  const miniCart = new MiniCartUI(data);

  $('body').prepend(miniCart.overlay);
  $('.bx-overlay').prepend(miniCart.dialogWindow);
  $('.bx-dialog-window').append(
    miniCart.closeButton,
    miniCart.header
  );
};

// DATA COLLECTION
function extractProductData() {
  return $('.mini-cart-product').map((index, product) => {
    const productData = {
      anchor: '',
      img: '',
      title: '',
      qty: 0,
      size: 0,
      color: '',
      price: '',
    };
    const detailSelect = (selector) => { return $(product).find(selector) };
    productData.anchor = detailSelect('a').attr('href');
    productData.img = detailSelect('img').attr('src');
    productData.title = detailSelect('.mini-cart-name a').html();
    productData.qty = detailSelect('.mini-cart-pricing .value').html();
    productData.size = detailSelect('[data-attribute=size] .value').html();
    productData.color = detailSelect('[data-attribute=color] .value').html();
    productData.price = detailSelect('.mini-cart-price').html();
    return productData;
  }).get();
}

function extractCartData() {
  const cartData = {
    itemCount: 0,
    products: [],
    priceTotal: 0,
  };
  cartData.itemCount = $('.mini-cart-product').length;
  cartData.priceTotal = $('.order-value').html();
  cartData.products = extractProductData();
  console.log(cartData);
  return cartData;
}

// PLUGIN SNIPPET

(function($) {
  $(document).ready(function(){

    // Pull cart data and store it into an variable/object.
    const extractedData = extractCartData();
    // Generate styled containers for the overlay.
    renderComponents(extractedData);
    // Check if user has scrolled to at least 90% of the page and reveals the overlay.
    monitorScrollPercentage();

  });
})(jQuery);
