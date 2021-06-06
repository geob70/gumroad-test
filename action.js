let fuck = document.getElementById("fucker");
fuck.addEventListener("mousedown", () => {
  console.log("anchor tag hovered");
  build();
});

window.onclick = (e) => {
  killBuild(e);
};

function build() {
  let iFrameId = document.getElementById("iFrame1");
  if (iFrameId !== null) return;
  let iFrame = document.createElement("iframe");

  let frameStyle = iFrame.style;
  frameStyle.width = "60%";
  frameStyle.height = "70%";
  frameStyle.padding = "0px";
  frameStyle.border = "1px solid black";
  frameStyle.borderRadius = "5px";
  frameStyle.position = "absolute";
  frameStyle.top = "50%";
  frameStyle.left = "50%";
  frameStyle.transform = "translate(-50%, -50%)";

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
}

function killBuild(e) {
  let iFrame = document.getElementById("iFrame1");
  if (e.target.id === "fucker") return;
  if (iFrame === null) return;
  iFrame.remove();
}

function addToFrame(frame, element) {
  frame.contentWindow.document.body.appendChild(element);
}

function appendToElement(parent, child) {
  parent.appendChild(child);
}
