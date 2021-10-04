var image = new Image()

window.onload = function () {
  var easel = document.getElementById('easel')

  var firstCanvas = document.createElement('canvas')

  // var firstCanvas = document.getElementById('firstCanvas')
  easel.appendChild(firstCanvas)
  var firstContext = firstCanvas.getContext('2d')

  // var secondCanvas = document.getElementById('secondCanvas')
  // var thirdCanvas = document.getElementById('thirdCanvas')

  // var secondContext = secondCanvas.getContext('2d')
  // var thirdContext = thirdCanvas.getContext('2d')

  firstContext.globalCompositeOperation = 'destination-under'
  firstContext.fillStyle = '#ddddff'
  firstContext.fillRect(0, 0, firstCanvas.width, firstCanvas.height)

  // secondContext.globalCompositeOperation = 'destination-under'
  // secondContext.fillStyle = 'blue' //'#ddddff'
  // secondContext.fillRect(0, 0, firstCanvas.width, firstCanvas.height)

  image.src = 'images/dot.png'

  var size = 500
  var border = size / 10
  var multiplier = 10

  firstCanvas.width = size
  firstCanvas.height = size
  /*
  secondCanvas.width = size
  secondCanvas.height = size
  thirdCanvas.width = size
  thirdCanvas.height = size
*/
  // drawBlock(firstContext, image, i, j, 1, 1, '#CCCCFF')

  image.onload = function (ev) {
    firstContext.globalCompositeOperation = 'destination-under'
    firstContext.fillStyle = '#ddffff'
    firstContext.fillRect(0, 0, size, size)

    /*
    secondContext.globalCompositeOperation = 'destination-under'
    secondContext.fillStyle = '#ddddff'
    secondContext.fillRect(0, 0, size, size)
*/
    var scaleForBorder = (size - border * 2) / size
    // firstContext.scale(scaleForBorder, scaleForBorder)

    firstContext.drawImage(
      image,
      border,
      border,
      firstCanvas.width - border * 2,
      firstCanvas.height - border * 2
    )

    console.log('scaleForB =' + scaleForBorder)

    // secondContext.drawImage(firstCanvas, border, border)

    // multiply(thirdContext, secondCanvas)
    //multiply(firstContext, secondCanvas, secondContext)
    previousCanvas = firstCanvas
    previousContext = firstContext

    for (var c = 1; c < 5; c++) {
      // var canvasName = 'canvas' + c.toString()
      // var canvas = document.createElement(canvasName)
      var canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      easel.appendChild(canvas)

      var caption = (10 ** c).toString()
      var captionText = document.createTextNode(caption)
      var captionElement = document.createElement('caption')
      easel.appendChild(captionElement).appendChild(captionText)
      var context = canvas.getContext('2d')
      multiply(context, previousCanvas, previousCanvas, true)
      previousCanvas = canvas
      previousContext = context
    }

    // multiply(secondContext, firstCanvas, firstContext, true)

    //multiply(thirdContext, secondCanvas, secondContext, true)

    // multiply(firstContext, thirdCanvas, thirdContext, true)

    //  multiply(secondContext, firstCanvas, firstContext, false)

    //  multiply(firstContext, secondCanvas, secondContext, true)
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
