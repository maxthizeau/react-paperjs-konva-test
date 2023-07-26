import { KonvaEventObject } from 'konva/lib/Node'
import { FC, useRef } from 'react'
import { Stage, Layer, Text, Line, Circle, Arc, Group } from 'react-konva'

interface IProps {
    boxWidth: number
    boxHeight: number
}

const ITEM_COUNT = 7

const KonvaTest: FC<IProps> = ({ boxHeight, boxWidth }) => {
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
            rotation: evt.currentTarget.rotation() + 360 / ITEM_COUNT,
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
                    <Circle x={0} y={0} radius={10} fill="red" />
                    {new Array(ITEM_COUNT).fill(0).map((_, i) => {
                        let angle = 360 / ITEM_COUNT

                        return (
                            <Group
                                key={i}
                                x={0}
                                y={0}
                                // -90 to start at the bottom
                                rotation={90 + angle * i}
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
                                    x={INNER_CIRCLE_RADIUS + RING_WIDTH / 2}
                                    y={RING_WIDTH / 2}
                                    // x={INNER_CIRCLE_RADIUS + RING_WIDTH / 2}
                                    // y={RING_WIDTH}
                                    // y={Math.sin(angle / 2) * RING_WIDTH}
                                    rotation={90 + angle / 2}
                                    fill="black"
                                    fontSize={30}
                                    align="center"
                                    verticalAlign="middle"
                                />
                            </Group>
                        )
                    })}

                    {/* {new Array(4).fill(0).map((_, i) => {
                        let angle = (360 / 4) * i
                        let center = {
                            // x: middle.x + Math.cos(angle) * INNER_CIRCLE_RADIUS,
                            // y: middle.y + Math.sin(angle) * INNER_CIRCLE_RADIUS,
                            x: middle.x,
                            y: middle.y,
                        }
                        let innerX = center.x - INNER_CIRCLE_RADIUS
                        let innerY = center.y - INNER_CIRCLE_RADIUS
                        let outerX = center.x - OUTER_CIRCLE_RADIUS
                        let outerY = center.y - OUTER_CIRCLE_RADIUS
                        // let y = center.y + Math.sin(angle) * 100
                        let trapezoidHeight =
                            OUTER_CIRCLE_RADIUS - INNER_CIRCLE_RADIUS

                        // let x = Math.cos(angle) * INNER_CIRCLE_RADIUS
                        // let y = Math.sin(angle) * INNER_CIRCLE_RADIUS

                        return (
                            <Line
                                x={innerX}
                                y={0}
                                points={[outerX, outerY, 150, 0, 200, 100, 0, 100]}
                                tension={0.1}
                                rotationDeg={angle}
                                closed
                                stroke="black"
                                fillLinearGradientStartPoint={{
                                    x: -50,
                                    y: -50,
                                }}
                                fillLinearGradientEndPoint={{ x: 50, y: 50 }}
                                fillLinearGradientColorStops={[
                                    0,
                                    'red',
                                    1,
                                    'yellow',
                                ]}
                            />
                        )
                    })} */}
                </Group>
            </Layer>

            <Layer>
                <Line
                    x={0}
                    y={0}
                    points={[middle.x, 0, middle.x, boxHeight]}
                    stroke="black"
                />
                <Line
                    x={0}
                    y={0}
                    points={[0, middle.y, boxWidth, middle.y]}
                    stroke="black"
                />
            </Layer>
        </Stage>
    )
}

export default KonvaTest
