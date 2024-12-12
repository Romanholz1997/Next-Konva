import React from "react";
import { Stage, Layer, Text, Line } from "react-konva";
import "./custom.css";

const RULER_SIZE = 30;

interface RulerProps {
  stagePos: { x: number; y: number };
  stageScale: number;
  CANVAS_WIDTH: number;
  CANVAS_HEIGHT: number;
  rulerWidth: number;
  rulerHeight: number;
}

const Ruler: React.FC<RulerProps> = ({
  stagePos,
  stageScale,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  rulerHeight,
  rulerWidth
}) => {
  const renderRulerMarks = (isHorizontal: boolean) => {
    const offset = isHorizontal ? stagePos.x : stagePos.y ;
    // Pixels per unit at the current scale
    const pixelsPerUnit = isHorizontal ? stageScale * rulerWidth : stageScale * rulerHeight;
    const rulerEnd = isHorizontal ? CANVAS_WIDTH / rulerWidth : CANVAS_HEIGHT / rulerHeight;
    const marks = [];   
    for (let unit = 0; unit <= rulerEnd; unit += 1) {
      let position = 0
      if(offset > 0)
      {
        position = unit * pixelsPerUnit;
      }
      else
      {
        position = unit * pixelsPerUnit + offset;
      }
      // Determine if it's a major tick (you can add logic for minor ticks if needed)
      let isMajorTick = false;
      if (unit % 10 === 0) {
        isMajorTick = true;
      }

      marks.push(
        <React.Fragment key={unit}>
          {/* Tick marks */}
          <Line
            points={
              isHorizontal
                ? [
                    position,
                    RULER_SIZE,
                    position,
                    isMajorTick ? 0 : RULER_SIZE / 2,
                  ]
                : [
                    RULER_SIZE,
                    position,
                    isMajorTick ? 0 : RULER_SIZE / 2,
                    position,
                  ]
            }
            stroke="gray"
            strokeWidth={1}
          />
          {/* Numbers */}
          {isMajorTick && (
            <Text
              x={isHorizontal ? position + 4 : 4}
              y={isHorizontal ? 4 : position + 4}
              text={(unit).toString()}
              fontSize={10}
              fill="black"
            />
          )}
        </React.Fragment>
      );
    }

    return marks;
  };

  return (
    <>
      {/* Top Ruler */}
      {/* <div className="ruler top-ruler" onWheel={handleTopRulerWheel}> */}
      <div className="ruler top-ruler">
        <Stage
          width={CANVAS_WIDTH}
          height={RULER_SIZE}
          draggable={false}
          listening={false}
        >
          <Layer>{renderRulerMarks(true)}</Layer>
        </Stage>
      </div>

      {/* Left Ruler */}
      <div className="ruler left-ruler">
      {/* <div className="ruler left-ruler" onWheel={handleLeftRulerWheel}> */}
        <Stage
          width={RULER_SIZE}
          height={CANVAS_HEIGHT}
          draggable={false}
          listening={false}
        >
          <Layer>{renderRulerMarks(false)}</Layer>
        </Stage>
      </div>
    </>
  );
};

export default Ruler;
