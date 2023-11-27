import React from 'react'
import Canvas from '@/components/Canvas'
import generatePoint from '@/components/utils/generatePoint'

const game = () => {

    generatePoint(1,2)

    generatePoint(1,2)

    generatePoint(1,2)

    generatePoint(1,2)

    generatePoint(1,2)

   



    const draw = (ctx, frameCount) => {
        drawRect(ctx, "#000", 0, 0, 300, 300)
        drawCircle(ctx, "#fff", 50, 50, 20, 20)
      }

    const move = (ctx, frameCount) => {
        moveBall(ctx, 200, 10, 100, 300, 500, 1, -1, 400)
    }
    

    return <Canvas move={move} draw={draw} />
}

export default game



function drawCircle(ctx, color, x, y, r) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2*Math.PI, false)
    ctx.fill()
}


function drawRect(ctx, color, x, y, w, h) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.fill()
    ctx.stroke()
}

function moveBall(ctx, ballX, ballSize, batW, batY, ballY, dy, dx, w) {
    if (ballX-ballSize+dx < 0 || ballX+ballSize+dx > w) dx = -dx
    if (ballY-ballSize+dy < 0) dy = -dy
    if (ballY-ballSize> batY) return false
    if (ballY+ballSize > batY && ballX+ballSize > batX-batW/2 && ballX-ballSize < batX+batW/2) dy = -dy
    ballX += dx
    ballY += dy
    return true
  }
