import KonvaTest from '@/components/konva/KonvaTest'
import { Canvas } from '@/components/paper/Canvas'
// import CanvasWithBinding from "@/components/CanvasWithPaperBinding"
import React, { useRef } from 'react'

type Props = unknown

const IndexPage: React.FC<Props> = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        if (!containerRef.current || mounted) return
        setMounted(true)

        // mounted will trigger the first render
    }, [containerRef.current])

    console.log(containerRef.current?.clientHeight)
    return (
        <div
            className="w-full h-full bg-gray-100 rounded-lg"
            ref={containerRef}
        >
            {mounted && containerRef.current && (
                <KonvaTest
                    boxHeight={containerRef.current.clientHeight}
                    boxWidth={containerRef.current.clientWidth}
                />
            )}
        </div>
    )
}

export default IndexPage
