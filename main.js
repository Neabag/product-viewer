var productViewer = document.getElementById("product-viewer");
let length = 100;
let innerHtml='';
for(i=10; i<length;i++){
  innerHtml +=`<img src="https://www.91-img.com/images/view360/34241_553/ph-l-${i}.jpg">`;
}
productViewer.innerHTML = innerHtml;
var images = productViewer.getElementsByTagName("img");
var numImages = images.length;
var startAngle = 0;
var currentAngle = startAngle;
var dragStartX = 0;
var isDragging = false;
// display the first image
images[0].style.display = "block";

// add event listeners
productViewer.addEventListener("mousedown", startDragging);
productViewer.addEventListener("touchstart", startDragging);
productViewer.addEventListener("mousemove", drag);
productViewer.addEventListener("touchmove", drag);
productViewer.addEventListener("mouseup", stopDragging);
productViewer.addEventListener("touchend", stopDragging);
productViewer.addEventListener("mouseleave", stopDragging);

// start dragging the image
function startDragging(event) {
  console.log("dragStart");
  if (event.type === "mousedown") {
    dragStartX = event.clientX;
  } else if (event.type === "touchstart") {
    dragStartX = event.touches[0].clientX;
  }
  isDragging = true;
}

// drag the image
function drag(event) {
  
  if (isDragging) {
    console.log('dragging');
    var currentX = 0;
    if (event.type === "mousemove") {
      currentX = event.clientX;
    } else if (event.type === "touchmove") {
      currentX = event.touches[0].clientX;
    }
    var deltaX = currentX - dragStartX;
    currentAngle = startAngle - (deltaX / productViewer.offsetWidth * 360);
    updateImage();
  }
}

// stop dragging the image
function stopDragging(event) {
  isDragging = false;
  console.log('dragEnd')
  startAngle = currentAngle;
}

// update the displayed image
function updateImage() {
  var imageIndex = Math.round(currentAngle / (360 / numImages)) % numImages;
  if (imageIndex < 0) {
    imageIndex += numImages;
  }
  for (var i = 0; i < numImages; i++) {
    images[i].style.display = "none";
  }
  images[imageIndex].style.display = "block";
}
