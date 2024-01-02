import { Stage, Layer, Circle, Line } from "react-konva";
import { useFormikContext } from "formik";
import { styled } from "styled-components";

interface Props {}
const TowerGeometryDiagram: React.FC<Props> = () => {
    const { values } = useFormikContext<TowerGeometryInput>();
    const scale = 5;
    return (
        <StyledStage width={500} height={500}>
            <Layer offsetX={-250} offsetY={-250}>
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
                            x={location.x * scale}
                            y={-location.y * scale}
                            width={10}
                            height={10}
                            fill="black"
                        />
                    ))}
            </Layer>
        </StyledStage>
    );
};

const StyledStage = styled(Stage)`
    border: 1px solid black;
`;
export default TowerGeometryDiagram;
