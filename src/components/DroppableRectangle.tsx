import { useEffect, useRef, useState } from 'react'
import { useDrag } from 'react-dnd'

export default function DroppableRectangle() {
  const ref = useRef<HTMLDivElement>(null)

  const [{isDragging}, drag] = useDrag(() => ({
    type: "RECTANGLE",
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  useEffect(() => {
    if(ref.current) {
      drag(ref.current)
    }
  }, [ref, drag])

    return (
        <>
            <div ref={ref} className='w-full bg-blue-700 h-20 p-2 shadow-2xl'>
                TESTE
            </div>
        </>
    )
}
