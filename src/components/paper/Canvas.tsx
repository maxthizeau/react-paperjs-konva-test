import React, { FC, useEffect } from 'react'
import paper from 'paper'

type Props = {
    width?: number
    height?: number
}

// Node component
// Should be a child of Canvas
function Node() {
    React.useEffect(() => {
        window.addEventListener('load', () => {
            // Create a rectangle as an example
            const rect = new paper.Rectangle(
                new paper.Point(50, 50),
                new paper.Point(100, 100)
            )
            const path = new paper.Path.Rectangle(rect)

            path.fillColor = new paper.Color('red')
        })
    })

    // Don't really need to render anything so an empty fragment works
    return <></>
}

function BuildTrapezoid(view: paper.View) {
    var myPath = new paper.Path()
    myPath.strokeColor = new paper.Color('black')
    myPath.add(new paper.Point(0, 0))
    myPath.add(new paper.Point(100, 50))
    return myPath
}

export const Canvas: FC<Props> = (props) => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)

    // The Paper.js test is work in progress

    useEffect(() => {
        window.addEventListener('load', () => {
            if (!canvasRef.current) return
            // Setup paper.js
            paper.setup(canvasRef.current)
            // Create a rectangle as an example
            const rect = new paper.Rectangle(
                new paper.Point(50, 50),
                new paper.Point(100, 100)
            )
            const path = new paper.Path.Rectangle(rect)
            path.fillColor = new paper.Color('red')
        })
        BuildTrapezoid(paper.view)
    }, [])

    return <canvas ref={canvasRef} {...props} id="canvas" />
}
