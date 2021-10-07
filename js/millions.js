var image = new Image()

function submitForm () {
  return false
}

window.onload = function drawDots () {
  setup()
}

function prepareUploader () {
  let imgInput = document.getElementById('imageInput')
  imgInput.addEventListener('change', function (e) {
    if (e.target.files) {
      let imageFile = e.target.files[0] //here we get the image file
      var reader = new FileReader()
      reader.readAsDataURL(imageFile)
      reader.onloadend = function (e) {
        var myImage = new Image() // Creates image object
        myImage.src = e.target.result // Assigns converted image to image object
        myImage.onload = function (ev) {
          var myCanvas = document.getElementById('myCanvas') // Creates a canvas object
          var myContext = myCanvas.getContext('2d') // Creates a contect object
          myCanvas.width = myImage.width // Assigns image's width to canvas
          myCanvas.height = myImage.height // Assigns image's height to canvas
          myContext.drawImage(myImage, 0, 0) // Draws the image on canvas
          let imgData = myCanvas.toDataURL('image/jpeg', 0.75) // Assigns image base64 string in jpeg format to a variable
        }
      }
    }
  })
}

function setup () {
  prepareUploader()
  var size = document.getElementById('size').value
  var borderProportion = document.getElementById('borderProportion').value
  var multiplier = document.getElementById('multiplier').value
  var iterations = document.getElementById('iterations').value

  var easel = document.getElementById('easel')

  var imageCanvas = document.createElement('canvas')

  var div = document.createElement('div')
  var captionText = document.createTextNode('1')
  var captionElement = document.createElement('caption')
  easel
    .appendChild(div)
    .appendChild(captionElement)
    .appendChild(captionText)

  div.appendChild(imageCanvas)

  var imageContext = imageCanvas.getContext('2d')

  /* background colour
  imageContext.globalCompositeOperation = 'destination-under'
  imageContext.fillStyle = '#ddddff'
  imageContext.fillRect(0, 0, imageCanvas.width, imageCanvas.height)
*/
  image.src = 'images/sheep.png'

  // var size = 800 // started crashing above 10,000
  //var borderProportion = 0.05
  var border = size * borderProportion
  // var multiplier = 10
  // var iterations = 3

  imageCanvas.width = size
  imageCanvas.height = size

  /*
  function init () {
    let imgInput = document.getElementById('imageInput')
    imgInput.addEventListener('change', function (e) {
      if (e.target.files) {
        let imageFile = e.target.files[0] //here we get the image file
        var reader = new FileReader()
        reader.readAsDataURL(imageFile)
        reader.onloadend = function (e) {
          var myImage = new Image() // Creates image object
          myImage.src = e.target.result // Assigns converted image to image object
         myImage.onload = function (ev) {
         
         //   let imgData = myCanvas.toDataURL('image/jpeg', 0.75) // Assigns image base64 string in jpeg format to a variable
          // }
        }


      }
    }
  }
}
*/

  image.onload = function (ev) {
    /* background colour
    imageContext.globalCompositeOperation = 'destination-under'
    imageContext.fillStyle = '#ddffff'
    imageContext.fillRect(0, 0, size, size)
*/

    var scaleForBorder = (size - border * 2) / size

    imageContext.drawImage(
      image,
      border,
      border,
      imageCanvas.width - border * 2,
      imageCanvas.height - border * 2
    )

    previousCanvas = imageCanvas
    previousContext = imageContext

    for (var c = 0; c < iterations; c++) {
      var div = document.createElement('div')
      var caption = (100 ** (c + 1)).toString()
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

  function multiply (parentContext, childCanvas, childContext, scale) {
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
}
