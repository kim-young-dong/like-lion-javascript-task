"use strict";

const totalPrice = new URLSearchParams(window.location.search).get(
  "totalPrice"
);
document.querySelector("#total-price").textContent = totalPrice;

function payment() {
  const cardNumber = document.querySelector("#card-number").value;
  window.onunload = () => {
    window.opener.postMessage(
      { type: "childWindowClosed", data: cardNumber },
      window.location.origin
    );
  };

  window.close();
}
