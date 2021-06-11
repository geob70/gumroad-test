let anchor = document.getElementById("anchor");
let anchorHref = anchor.getAttribute("href");
let embedded = anchor.getAttribute("data-embedded");

if (embedded === "true") {
  anchor.style.display = "none";
  build();
}

let split = anchorHref.split("/");
let valid = split[2] === "gumroad.com";
let hoverState = false;

let cost;

// onclick to open pop up
anchor.addEventListener("mousedown", () => {
  console.log("anchor tag clicked");
  hoverState = false;
  if (valid) buildPopUp();
  else alert("Not a valid link");
});

// on hover to open pop up
anchor.addEventListener("mouseover", () => {
  console.log("anchor tag hovered");
  hoverState = true;
  if (valid) build();
});

// on hover out to close pop up
anchor.addEventListener("mouseout", (e) => {
  console.log("anchor tag out", hoverState);
  if (hoverState) killBuildPopUp(e);
  hoverState = false;
});

window.onclick = (e) => {
  if (embedded === "false") killBuildPopUp(e);
};

function loadStyle(frame) {
  let frameStyle = frame.style;
  if (embedded === "true") {
    frameStyle.display = "block";
    frameStyle.height = "70vh";
    frameStyle.position = "relative";
    // frameStyle.margin = "80px 100px";
  } else {
    frameStyle.position = "absolute";
    frameStyle.top = "50%";
    frameStyle.left = "50%";
    frameStyle.height = "70%";
    frameStyle.transform = "translate(-50%, -50%)";
  }
}

function build() {
  let iFrameId = document.getElementById("iFrame1");
  if (iFrameId !== null) return;
  let iFrame = document.createElement("iframe");

  let frameStyle = iFrame.style;
  frameStyle.width = "60%";
  frameStyle.padding = "0px";
  frameStyle.border = "none";
  frameStyle.borderRadius = "6px";
  frameStyle.background = "white";

  loadStyle(iFrame);

  iFrame.setAttribute("id", "iFrame1");
  iFrame.setAttribute("title", "Framers");
  document.body.appendChild(iFrame);

  let img = document.createElement("img");
  img.setAttribute("id", "img");
  img.setAttribute(
    "src",
    "https://public-files.gumroad.com/variants/86uxyjepcbnrbj0gn4kpau2pwemw/0d50176773e4ae99b015a1672bcf6d6a891b3aa366dbc666dba7437b6d4f46dc"
  );
  img.style.width = "400px";
  //   img.style.height = "100px";

  let div = document.createElement("div");
  div.setAttribute("id", "div");
  div.style.padding = "40px";
  div.style.height = "200px";
  div.style.borderBottom = "1px solid #E9E9E9";
  div.style.display = "grid";
  div.style.placeItems = "center";

  appendToElement(div, img);
  addToFrame(iFrame, div);

  let bottomDiv = document.createElement("div");
  bottomDiv.setAttribute("id", "div2");
  bottomDiv.style.display = "flex";
  bottomDiv.style.width = "100%";
  bottomDiv.style.flexDirection = "row";

  let left = document.createElement("div");
  left.setAttribute("id", "left");
  left.style.width = "65%";

  let h2 = document.createElement("h2");
  h2.setAttribute("id", "title");
  h2.innerHTML = "Alice's Adventures in Wonderland";

  appendToElement(left, h2);

  let desc = document.createElement("p");
  desc.setAttribute("id", "desc");
  desc.style.color = "#797874";
  desc.style.fontSize = "18px";
  desc.style.width = "85%";
  desc.innerHTML =
    "An 1865 novel written by English author Charles Lutwidge Dodgson under the pseudonym Lewis Carroll. It tells of a girl named Alice who falls down a rabbit hole into a fantasy world (Wonderland) populated by peculiar, anthropomorphic creatures.";

  appendToElement(left, desc);
  appendToElement(bottomDiv, left);

  // right

  let right = document.createElement("div");
  right.setAttribute("id", "right");
  right.style.width = "max-content";

  let h3 = document.createElement("h3");
  h3.setAttribute("id", "name");
  h3.innerHTML = "Name a fair price:";

  appendToElement(right, h3);

  // price input
  let price = document.createElement("div");
  price.setAttribute("id", "price");
  price.style.display = "grid";
  price.style.height = "30px";
  price.style.border = "1px solid #EEEEEE";
  price.style.borderRadius = "4px";
  price.style.gridTemplateColumns = "30% 70%";
  price.style.gridGap = "0px";

  let currency = document.createElement("div");
  currency.setAttribute("id", "currency");
  currency.style.display = "grid";
  currency.style.placeItems = "center";
  currency.style.background = "#EEEEEE";
  currency.style.borderTopLeftRadius = "4px";
  currency.style.borderBottomLeftRadius = "4px";
  currency.innerHTML = "$";

  appendToElement(price, currency);

  let amount = document.createElement("div");
  amount.setAttribute("id", "amount");
  amount.style.display = "grid";
  amount.style.placeItems = "center";
  amount.style.background = "#FFF";
  amount.style.borderTopRightRadius = "4px";
  amount.style.borderBottomRightRadius = "4px";

  let aInput = document.createElement("input");
  aInput.setAttribute("id", "amount-input");
  aInput.setAttribute("type", "number");
  aInput.style.border = "none";
  aInput.style.width = "100%";
  aInput.style.textAlign = "center";
  aInput.style.outline = "none";
  aInput.setAttribute("placeholder", "$");

  aInput.addEventListener("change", (e) => {
    handlePrice(e);
  });

  appendToElement(amount, aInput);

  appendToElement(price, amount);
  appendToElement(right, price);

  // button
  let addToCart = document.createElement("button");
  addToCart.setAttribute("id", "add");
  addToCart.onclick = () => {
    if (cost !== undefined) buildPayout();
    else alert("Enter amount");
  };
  addToCart.innerHTML = "Add to cart";
  addToCart.style.padding = "15px 50px";
  addToCart.style.background = "#35A7AC";
  addToCart.style.border = "none";
  addToCart.style.borderRadius = "4px";
  addToCart.style.color = "white";
  addToCart.style.cursor = "pointer";
  addToCart.style.margin = "20px 0px";

  appendToElement(right, addToCart);

  appendToElement(bottomDiv, right);

  addToFrame(iFrame, bottomDiv);
}

function buildPayout() {
  let iFrame = document.getElementById("iFrame1");
  iFrame.style.display = "none";

  let payout = document.createElement("iframe");

  let payoutStyle = payout.style;
  payoutStyle.width = "40%";
  payoutStyle.height = "fit-content";
  payoutStyle.padding = "40px";
  payoutStyle.border = "none";
  payoutStyle.display = "grid";
  payoutStyle.placeItems = "center";
  payoutStyle.borderRadius = "6px";
  payoutStyle.position = "absolute";
  payoutStyle.background = "white";
  payoutStyle.top = "50%";
  payoutStyle.left = "50%";
  payoutStyle.transform = "translate(-50%, -50%)";

  payout.setAttribute("id", "payout");
  payout.setAttribute("title", "Payout");
  document.body.appendChild(payout);

  let close = document.createElement("span");
  close.setAttribute("id", "close");
  close.innerHTML = "close";

  close.style.position = "absolute";
  close.style.top = "15px";
  close.style.right = "15px";
  close.style.cursor = "pointer";

  close.onclick = () => {
    iFrame.style.display = "block";
    payout.style.display = "none";
  };

  let payment = document.createElement("div");
  payment.setAttribute("id", "payment");
  payment.style.padding = "40px";
  payment.style.width = "fit-content";


  let checkoutMessage = document.createElement("span");
  checkoutMessage.setAttribute("id", "message");
  checkoutMessage.innerHTML = "This would cost you " + cost + " $";
  // checkoutMessage.style.margin = "30px 0px";

  appendToElement(payment, checkoutMessage);

  let breaker = document.createElement("br");
  breaker.setAttribute("id", "breaker");

  appendToElement(payment, breaker)

  let give = document.createElement("button");
  give.setAttribute("id", "pay");
  give.onclick = () => {
    buildPayout();
  };
  give.innerHTML = "Give";
  give.style.padding = "15px 50px";
  give.style.background = "#35A7AC";
  give.style.border = "none";
  give.style.borderRadius = "4px";
  give.style.color = "white";
  give.style.cursor = "pointer";
  give.style.margin = "20px 0px";

  appendToElement(payment, give);

  addToFrame(payout, payment);

  addToFrame(payout, close);
}

function killBuildPopUp(e) {
  let iFrame = document.getElementById("iFrame1");
  if (hoverState) iFrame.remove();
  if (e.target.id === "anchor") return;
  if (iFrame === null) return;
  iFrame.remove();
}

function validateUrl() {
  return false;
}

function handlePrice(e) {
  cost = e.target.value;
}

function addToFrame(frame, element) {
  frame.contentWindow.document.body.appendChild(element);
}

function appendToElement(parent, child) {
  parent.appendChild(child);
}
