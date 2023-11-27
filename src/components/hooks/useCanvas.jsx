import { useRef, useEffect } from 'react'

const useCanvas = (draw, move) => {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    canvas.width = 600
    canvas.height = 600
    let frameCount = 0
    let animationFrameId
    
    const render = () => {
      frameCount++
      draw(context, frameCount)
      move(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw, move])
  
  return canvasRef
}

export default useCanvas