var image = new Image()

window.onload = function () {
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
  image.src = 'images/dot.png'

  var size = 1000 // started crashing above 10,000
  var border = size / 10
  var multiplier = 10

  imageCanvas.width = size
  imageCanvas.height = size

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

    for (var c = 1; c < 4; c++) {
      var div = document.createElement('div')
      var caption = (100 ** c).toString()
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
