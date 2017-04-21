function requestCart() {
  $.ajax({
    url: "/cart",
    success: (response) => {
      rakeCartInfo(response);
    },
    error: (response) => {
      alert(response);
    }
  });
};

function rakeCartInfo(response) {
  const cartInfo = {
    itemCount: 0,
    productImages: [],
    priceTotal: 0,
  };
  // var total = $(data).find('.order-value').html();

  $( ".mini-cart-product" ).each((index, data) => {
    cartInfo.productImages.push($('img').attr('src'));
  });

  console.log(cartInfo);
}

function cartOverlayHook() {

}
