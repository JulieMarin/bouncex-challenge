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
      'width': '40%',
      'height': '60%',
      'background-color': '#ffffff',
      'border-radius': '0.4%',
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

function monitorScrollPercentage(){

  cartOverlayOpen = false;

  $(window).on("scroll", function(){
    var winHeight = $(window).height();
        docHeight = $(document).height();
        scrollTop = $(window).scrollTop();
        trackLength = docHeight - winHeight;
        amountScrolled = Math.floor(scrollTop/trackLength * 100);

    if (cartOverlayOpen == false && amountScrolled >= 90) {
      $('.bx-backdrop').css('visibility','visible').hide().fadeIn('slow');
      cartOverlayOpen = true;
      console.log(cartOverlayOpen);
    };
  });
};

function addDefaultStyles() {
  const defaultStyles = new DefaultStyles;
  $('body').prepend(defaultStyles.backdrop);
  $('.bx-backdrop').prepend(defaultStyles.modalContainer);
}

// DATA COLLECTION

function rakeProductData() {
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
    return productData;
  }).get();
}

function rakeCartData() {
  const data = {
    itemCount: 0,
    products: [],
    priceTotal: 0,
  };
  data.itemCount = $('.mini-cart-product').length;
  data.priceTotal = $('.order-value').html();
  data.products = rakeProductData();
  console.log(data);
}

// PLUGIN SNIPPET

(function($) {
  $(document).ready(function(){

    rakeCartData();
    // Generate styled containers for the overlay.
    addDefaultStyles();
    // Check if user has scrolled to at least 90% of the page and reveals the overlay.
    monitorScrollPercentage();

  });
})(jQuery);
