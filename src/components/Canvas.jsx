import React, { useRef, useEffect } from 'react'
import useCanvas from './hooks/useCanvas'

const Canvas = props => {

  const { draw, move, ...rest } = props
  const canvasRef = useCanvas(draw, move)

  
//   useEffect(() => {
//     const canvas = canvasRef.current
//     const context = canvas.getContext('2d')
//     let frameCount = 0
//     let animationFrameId
//     const render = () => {
//         frameCount++
//         draw(context, frameCount)
//         animationFrameId = window.requestAnimationFrame(render)
//       }
//     render()

//     //Our first draw
//     return () => {
//         window.cancelAnimationFrame(animationFrameId)
//       }
//   }, [draw])
  
  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas


 function drawCircle(color, x, y, r) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2*Math.PI, false)
    ctx.fill()
  }


  function draw () {
    drawCircle('#0f0', )
  }


  function game() {
    if (!move()) {
      alert('Game over!')
      init()
    }
    draw()
  }