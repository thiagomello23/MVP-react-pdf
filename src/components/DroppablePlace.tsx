import { useRef, useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import DroppableRectangle from './DroppableRectangle'
import { useReactToPrint } from 'react-to-print'

export default function DroppablePlace() {
  const [clientOffset, setClientOffset] = useState({
    x: 0,
    y: 0
  })

  const [isDrop, setIsDrop] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({ contentRef });

  const [{isOver}, drop] = useDrop(() => ({
    accept: "RECTANGLE",
    drop: (item, monitor) => {
      const element = monitor.getClientOffset()
      
      console.log(element)
      setClientOffset({
        x: element?.x,
        y: element?.y
      });

      setIsDrop(true)
    },
    collect: monitor => ({
        isOver: !!monitor.isOver(),
    })
  }))

  useEffect(() => {
    if(ref.current) {
      drop(ref.current)
    }
  }, [ref, drop])

  return (
    <div ref={ref} className='w-full h-full relative'>
      <div
        ref={contentRef}
        style={{
          position: "absolute", 
          top: clientOffset.y, 
          left: clientOffset.x, 
          width: "30%", 
          height: "30%",
          transform: `translate(-50%, -40px)`
        }}
      >
        {isDrop && (
          <DroppableRectangle />
        )}
      </div>
      <button onClick={reactToPrintFn} className='bg-amber-500 p-10'>GERAR PDF</button>
    </div>
  )
}
