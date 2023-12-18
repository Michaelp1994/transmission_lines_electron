import React from "react";
import { Stage, Layer, Circle, Line } from "react-konva";
import { useFormikContext } from "formik";

interface Props {}
const TowerGeometryDiagram: React.FC<Props> = () => {
    const { values } = useFormikContext<TowerGeometryInput>();
    return (
        <Stage width={window.innerWidth / 3} height={500}>
            <Layer offsetX={-200} offsetY={-200}>
                <Line
                    points={[-200, 0, 200, 0]}
                    stroke="black"
                    strokeWidth={2}
                    lineCap="round"
                    lineJoin="round"
                />
                <Line
                    points={[0, 200, 0, -200]}
                    stroke="black"
                    strokeWidth={2}
                    lineCap="round"
                    lineJoin="round"
                />
                {values.conductors &&
                    values.conductors.map((location, index) => (
                        <Circle
                            key={index}
                            x={location.x}
                            y={-location.y}
                            width={10}
                            height={10}
                            fill="black"
                        />
                    ))}
            </Layer>
        </Stage>
    );
};

export default TowerGeometryDiagram;
