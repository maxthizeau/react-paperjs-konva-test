import { KonvaEventObject } from 'konva/lib/Node'
import { FC, useRef } from 'react'
import { Stage, Layer, Text, Line, Circle, Arc, Group, Rect } from 'react-konva'

interface IProps {
    boxWidth: number
    boxHeight: number
    showIndicators?: boolean
}

const ITEM_COUNT = 7

const KonvaTest: FC<IProps> = ({ boxHeight, boxWidth, showIndicators }) => {
    const middle = {
        x: boxWidth / 2,
        y: boxHeight / 2,
    }

    const BOX_SQUARE_SIZE = Math.min(boxHeight, boxWidth)
    const PADDING = BOX_SQUARE_SIZE / 10
    const RING_WIDTH = PADDING * 2

    const OUTER_CIRCLE_RADIUS = BOX_SQUARE_SIZE / 2 - PADDING
    const INNER_CIRCLE_RADIUS = BOX_SQUARE_SIZE / 2 - PADDING - RING_WIDTH

    const colors = [
        '#9BABB8',
        '#EEE3CB',
        '#D7C0AE',
        '#967E76',
        '#804674',
        '#A86464',
        '#B3E5BE',
        '#F5FFC9',
    ]

    const handleClick = (evt: KonvaEventObject<MouseEvent>) => {
        evt.currentTarget.to({
            rotation: evt.currentTarget.rotation() - 360 / ITEM_COUNT,
            duration: 1,
        })
    }

    return (
        <Stage width={boxWidth} height={boxHeight}>
            <Layer>
                <Group
                    onClick={handleClick}
                    x={middle.x}
                    y={middle.y}
                    onMouseEnter={(e) => {
                        // style stage container:
                        const container = e.target.getStage()?.container()
                        if (container) {
                            container.style.cursor = 'pointer'
                        }
                    }}
                    onMouseLeave={(e) => {
                        const container = e.target.getStage()?.container()
                        if (container) {
                            container.style.cursor = 'default'
                        }
                    }}
                >
                    {new Array(ITEM_COUNT).fill(0).map((_, i) => {
                        let angle = 360 / ITEM_COUNT
                        const minWidth =
                            2 * INNER_CIRCLE_RADIUS * Math.PI * (angle / 360)
                        return (
                            <Group
                                key={i}
                                x={0}
                                y={0}
                                // -90 to start at the bottom
                                rotation={-90 - angle / 2 + angle * i}
                                // rotation={angle * i}
                            >
                                <Arc
                                    innerRadius={INNER_CIRCLE_RADIUS}
                                    outerRadius={OUTER_CIRCLE_RADIUS}
                                    x={0}
                                    y={0}
                                    rotation={0}
                                    angle={angle}
                                    stroke={'black'}
                                    strokeWidth={8}
                                    fill={colors[i]}
                                    opacity={0.8}
                                />
                                {/* Align the text with the arc */}

                                <Text
                                    text={`Text ${i}`}
                                    y={minWidth / 2 - 8}
                                    x={INNER_CIRCLE_RADIUS + RING_WIDTH}
                                    height={minWidth}
                                    width={RING_WIDTH}
                                    stroke={'black'}
                                    fillEnabled={true}
                                    align="center"
                                    rotation={angle / 2 + 90}
                                    fill="black"
                                    fontSize={BOX_SQUARE_SIZE / 24}
                                    verticalAlign="middle"
                                />
                            </Group>
                        )
                    })}
                </Group>
            </Layer>

            {showIndicators && (
                <Layer
                    height={boxHeight}
                    width={boxWidth}
                    x={middle.x}
                    y={middle.y}
                >
                    <Circle x={0} y={0} radius={10} fill="red" />

                    <Line
                        x={0}
                        y={0}
                        points={[0, -boxHeight / 2, 0, boxHeight / 2]}
                        stroke="black"
                    />
                    <Line
                        x={0}
                        y={0}
                        points={[boxWidth / 2, 0, -boxWidth / 2, 0]}
                        stroke="black"
                    />
                </Layer>
            )}
        </Stage>
    )
}

export default KonvaTest
