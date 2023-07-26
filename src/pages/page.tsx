import KonvaTest from '@/components/konva/KonvaTest'
import { Canvas } from '@/components/paper/Canvas'
import useResizeObserver from 'use-resize-observer'
// import CanvasWithBinding from "@/components/CanvasWithPaperBinding"
import React, { useRef } from 'react'

type Props = unknown

const IndexPage: React.FC<Props> = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    // const [mounted, setMounted] = React.useState(false)
    const [height, setHeight] = React.useState(0)
    const [width, setWidth] = React.useState(0)

    // Listerner on resize of the container
    useResizeObserver({
        ref: containerRef,
        onResize: ({ width, height }) => {
            if (!width || !height) return
            setHeight(height)
            setWidth(width)
        },
    })

    console.log(containerRef.current?.clientHeight)
    return (
        <div
            className="w-full h-full bg-gray-100 rounded-lg"
            ref={containerRef}
        >
            {height && width && containerRef.current && (
                <KonvaTest boxHeight={height} boxWidth={width} />
            )}
        </div>
    )
}

export default IndexPage
