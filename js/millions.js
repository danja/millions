// global to keep things simple
var image = new Image()

/*
 * Called when page is loaded
 */
window.onload = function go () {
  prepareUploader()
  image.src = 'images/sheep.png'
  setup()
}

/*
 * called when form submit button is clicked
 */
function submitForm () {
  setup()
  setup().draw()
  return false
}

/*
 * sets up the Upload Image response
 */
function prepareUploader () {
  let imgInput = document.getElementById('imageInput')
  imgInput.addEventListener('change', function (e) {
    if (e.target.files) {
      console.log('target')
      let imageFile = e.target.files[0] //here we get the image file
      var reader = new FileReader()
      reader.readAsDataURL(imageFile)
      reader.onloadend = function (e) {
        image.src = e.target.result // Assigns converted image to image object
        setup()
      }
    }
  })
}

/*
 * this is effectively the main function
 *
 * it would no doubt benefit from refactoring, it's on it's way to becoming an object/module
 * but it was only necessary to expose the draw() function elsewhere (while having the variables in scope)
 *
 */
function setup () {
  // pull values from HTML form
  let size = document.getElementById('size').value
  let borderProportion = document.getElementById('borderProportion').value
  let multiplier = document.getElementById('multiplier').value
  let iterations = document.getElementById('iterations').value

  var easel = document.getElementById('easel')
  easel.innerHTML = '' // remove all child elements

  // create containers for the first image
  var imageCanvas = document.createElement('canvas')

  var div = document.createElement('div')
  var captionText = document.createTextNode('1')
  var captionElement = document.createElement('caption')
  easel
    .appendChild(div)
    .appendChild(captionElement)
    .appendChild(captionText)

  div.appendChild(imageCanvas)

  // where the drawing takes place
  var imageContext = imageCanvas.getContext('2d')

  // background colour
  imageContext.globalCompositeOperation = 'destination-under'
  imageContext.fillStyle = '#ffffff'
  imageContext.fillRect(0, 0, imageCanvas.width, imageCanvas.height)

  var border = size * borderProportion

  imageCanvas.width = size
  imageCanvas.height = size

  image.onload = function (ev) {
    draw()
  }

  function draw () {
    // background colour
    imageContext.globalCompositeOperation = 'destination-under'
    imageContext.fillStyle = '#ffffff'
    imageContext.fillRect(0, 0, size, size)

    var scaleForBorder = (size - border * 2) / size

    // draw the initial image
    imageContext.drawImage(
      image,
      border,
      border,
      imageCanvas.width - border * 2,
      imageCanvas.height - border * 2
    )

    var previousCanvas = imageCanvas
    var previousContext = imageContext

    for (var c = 0; c < iterations; c++) {
      var div = document.createElement('div')
      var caption = ((multiplier * multiplier) ** (c + 1)).toString()
      var captionText = document.createTextNode(caption)
      var captionElement = document.createElement('caption')
      easel
        .appendChild(div)
        .appendChild(captionElement)
        .appendChild(captionText)

      var canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size

      div.appendChild(canvas)

      var context = canvas.getContext('2d')
      multiply(context, previousCanvas, previousCanvas, true)
      previousCanvas = canvas
      previousContext = context
    }
  }

  function multiply (parentContext, childCanvas, scale) {
    parentContext.clearRect(
      0,
      0,
      parentContext.canvas.width,
      parentContext.canvas.height
    )

    parentContext.scale(1 / multiplier, 1 / multiplier)

    var scaleForBorder = (size - border * 2) / size
    if (scale) {
      parentContext.scale(scaleForBorder, scaleForBorder)
    }

    // draw the little ones
    for (var i = 0; i < multiplier; i++) {
      for (var j = 0; j < multiplier; j++) {
        x = i * size
        y = j * size
        if (scale) {
          x = x + multiplier * border
          y = y + multiplier * border
        }
        parentContext.drawImage(childCanvas, x, y)
      }
    }
  }

  // expose the draw() function
  return {
    draw: draw
  }
}
