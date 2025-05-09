import React from 'react'
import DroppableRectangle from './DroppableRectangle';
import DraggableInput from './DraggableInput';

const componentMap: any = {
  "DroppableRectangle": <DroppableRectangle />,
  "DraggableInput": <DraggableInput />
};

export default function DynamicComponentRender(
    {componentName, isActive, x, y}: {componentName: any, isActive: boolean, x: number, y: number}
) {

    const Component = componentMap[componentName]

    if(isActive) {
        return <div 
            style={{
                position: "absolute",
                top: y, 
                left: x,
                transform: `translate(-50%, -40px)`,
                width: "30%", 
                height: "30%",
            }}
        >
            {Component}
        </div>
    } else {
        return;
    }
}
