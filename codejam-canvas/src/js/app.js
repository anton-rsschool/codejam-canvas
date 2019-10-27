import data from './data';

const canvas = {
  width: 512,
  height: 512
};

const hexToRgba = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
  return result ? [
  parseInt(result[1], 16),
  parseInt(result[2], 16),
  parseInt(result[3], 16),
  result[4] ? parseInt(result[4], 16) : 255
  ] : null;
};

const convertToRgba = data => data.map(row => row.map(item => hexToRgba(item)));
const getColorList = matrix => matrix.reduce((list, row) => [...list, ...row], []);
const getColorComponentList = colorList => colorList.reduce((list, color) => [...list, ...color], []);
const clearCanvas = (context, width, height) => context.clearRect(0, 0, width, height);

const images = data.map(item => {
  const rgbaPixelList = typeof item[0][0] === 'string' ? convertToRgba(item) : item
  return getColorComponentList(getColorList(rgbaPixelList));
});

const drawImageFromArray = (data, width, height) => {
  const dataArray = Uint8ClampedArray.from(data);
  const imageData = new ImageData(dataArray, width, height);
  const imageBitmap = createImageBitmap(imageData, 0, 0, width, height);
  imageBitmap.then(function(img) {
    context.drawImage(img, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
  });
};

const drawImageFromPicture = (picturePath, width, height) => {
  const image = new Image();
  image.src = picturePath;
  image.onload = () => {
    const imageBitmap = createImageBitmap(image, 0, 0, width, height);
    imageBitmap.then(function(img) {
      context.drawImage(img, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
    });
  } 
};

const changeActiveButton = (list, index) => {
  Array.prototype.slice.apply(list).forEach((item, i) => {
    const element = item.children[0];
    if (element.classList.contains('button--active')) {
      element.classList.remove('button--active');
    }
    if (i === index) {
      element.classList.add('button--active');
    }
  });
};

const clickHandler = (event) => {
  const element = event.target;
  const isTargetElement = element.nodeName === 'BUTTON' && !element.classList.contains('button--active');
  if (isTargetElement) {
    changeActiveButton(imageBar.children, +element.dataset.index);
    clearCanvas(context, canvas.width, canvas.height);
    switch(+element.dataset.index) {
      case 0:
        drawImageFromArray(images[0], 4, 4);
        break;
      case 1:
        drawImageFromArray(images[1], 32, 32);
        break;
      case 2:
        drawImageFromPicture('./assets/images/image.png', 256, 256);
        break;
    }
  }
};

const canvasElement = document.getElementById('canvas');
const context = canvasElement.getContext('2d');
context.imageSmoothingEnabled = false;

const imageBar = document.getElementById('image-bar');
imageBar.addEventListener('click', clickHandler);
