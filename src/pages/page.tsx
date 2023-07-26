import KonvaTest from '@/components/konva/KonvaTest'
import { Canvas } from '@/components/paper/Canvas'
import useResizeObserver from 'use-resize-observer'
// import CanvasWithBinding from "@/components/CanvasWithPaperBinding"
import React, { useRef } from 'react'

type Props = unknown

const IndexPage: React.FC<Props> = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [showIndicators, setShowIndicators] = React.useState(false)
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
            className="w-full h-full bg-gray-100 rounded-lg relative"
            ref={containerRef}
        >
            <button
                onClick={() => setShowIndicators((prev) => !prev)}
                className="bg-blue-200 hover:bg-blue-100 text-slate-600 font-bold py-2 px-4 rounded absolute -top-12 right-4"
            >
                {showIndicators ? 'Masquer' : 'Afficher'} les indicateurs
            </button>
            {height && width && containerRef.current && (
                <KonvaTest
                    boxHeight={height}
                    boxWidth={width}
                    showIndicators={showIndicators}
                />
            )}
        </div>
    )
}

export default IndexPage
