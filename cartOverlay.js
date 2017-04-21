function monitorScrollPercentage(){

  cartOverlayOpen = false;

  $(window).on("scroll", function(){
    var winHeight = $(window).height();
        docHeight = $(document).height();
        scrollTop = $(window).scrollTop();
        trackLength = docHeight - winHeight;
        amountScrolled = Math.floor(scrollTop/trackLength * 100);

    if (cartOverlayOpen == false && amountScrolled >= 90) {
      $('.fs-backdrop').css('visibility','visible').hide().fadeIn('slow');
      cartOverlayOpen = true;
      console.log(cartOverlayOpen);
    };
  });
};

function createOverlayElements() {
  const fullscreenBackdrop = $("<section class='fs-backdrop'>");
  fullscreenBackdrop.css({
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

  const cartContainer = $('<div>');
  cartContainer.css({
    'width': '60%',
    'height': '60%',
    'background-color': '#ffffff',
  });

  $("body").prepend(fullscreenBackdrop);
  $('.fs-backdrop').append(cartContainer);
}


// PLUGIN SNIPPET

(function($) {
  $(document).ready(function(){

    createOverlayElements();
    // Check if user has scrolled to at least 90% of the page and reveals the overlay.
    monitorScrollPercentage();

  });
})(jQuery);
