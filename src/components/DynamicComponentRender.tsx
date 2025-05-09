import React from 'react'
import DroppableRectangle from './DroppableRectangle';
import DraggableInput from './DraggableInput';

const componentMap: any = {
  "DroppableRectangle": <DroppableRectangle />,
  "DraggableInput": <DraggableInput />
};

export default function DynamicComponentRender(
    {componentName, x, y, zIndex = 1}: {componentName: any, x: number, y: number, zIndex?: number}
) {

    const Component = componentMap[componentName]

    return <div 
            style={{
                position: "absolute",
                top: y, 
                left: x,
                transform: `translate(-50%, -40px)`,
                width: "30%", 
                height: "30%",
                zIndex: zIndex
            }}
        >
            {Component}
        </div>
}
