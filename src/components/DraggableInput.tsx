import { useEffect, useRef } from 'react'
import { useDrag } from 'react-dnd'

export default function DraggableInput() {

    const ref = useRef<HTMLDivElement>(null)

    const [{isDragging}, drag] = useDrag(() => ({
    type: "ANY",
    item: {
        name: "DraggableInput",
        key: new Date().getTime() + Math.random() * 100
    },
    collect: monitor => ({
        isDragging: !!monitor.isDragging(),
    }),
    }))

    useEffect(() => {
        if(ref.current) {
            drag(ref.current)
        }
    }, [ref, drag])

  return <div ref={ref} className='z-20'>
    <input type="text" className='bg-amber-500 p-4 outline-0 w-full h-full' placeholder='Digite seu texto aqui'/>
  </div>
}
