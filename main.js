"use strict";

function Product(name, price) {
  this.name = name;
  this.price = price;
}
let products = [
  new Product("대뱃살", 3000),
  new Product("목살", 5000),
  new Product("배꼽살", 4000),
  new Product("중뱃살", 1000),
];
let selectedProducts = [];
let totalPrice = 0;

const selectNode = document.getElementById("mySelect");
const resultNode = document.querySelector("#result");

function renderResult() {
  if (selectedProducts.length === 0) {
    resultNode.classList.add("hidden");
  } else {
    // result list
    listNode.innerHTML = "";
    const listNode = resultNode.querySelector("#selected-list");

    selectedProducts.forEach((product) => {
      const liNode = document.createElement("li");
      liNode.textContent = `${product.name} - ${product.price}원`;
      listNode.appendChild(liNode);
    });

    // result total
    const totalNode = resultNode.querySelector("#total-price");
    totalPrice = selectedProducts.reduce((acc, product) => {
      return acc + product.price;
    }, 0);
    totalNode.textContent = totalPrice;

    resultNode.classList.remove("hidden");
  }
}

function selectProduct(e) {
  const selectedValues = e.target.selectedOptions;

  selectedProducts = products.filter((product) => {
    return [...selectedValues].find((option) => option.value === product.name);
  });
  renderResult();
}

function openPopup() {
  if (selectedProducts.length === 0) {
    alert("결제할 상품을 선택해주세요.");
    return;
  }

  window.open(`payment.html?totalPrice=${totalPrice}`, "popup", "popup");
  window.addEventListener("message", function (event) {
    if (event.origin !== window.location.origin) {
      return;
    }
    if (event.data.type === "childWindowClosed") {
      paymentConfirm(event.data.data);
    }
  });
}

function paymentConfirm(cardNumber) {
  alert(`카드번호 ${cardNumber}로 ${totalPrice}원 결제가 완료되었습니다.`);
  resetData();
}

function resetData() {
  selectedProducts = [];
  for (var i = 0; i < selectNode.options.length; i++) {
    selectNode.options[i].selected = false;
  }
  renderResult();
}
