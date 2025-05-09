import { useRef, useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import { useReactToPrint } from 'react-to-print'
import DynamicComponentRender from './DynamicComponentRender'

export default function DroppablePlace() {
  const [clientData, setClientData] = useState<any>([])

  const [isDrop, setIsDrop] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({ contentRef });

  const [{isOver}, drop] = useDrop(() => ({
    accept: "ANY",
    drop: (item: any, monitor) => {
      const element = monitor.getClientOffset()
      
      console.log(element)
      setClientData((prev: any) => {
        return [
          {
            x: element?.x,
            y: element?.y,
            name: item.name,
            key: item.key,
            zIndex: item.zIndex ? item.zIndex : 1
          },
          ...prev
        ]
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
        className=''
      >
        {clientData?.map((item: any) => (
          <DynamicComponentRender 
            key={item.key} 
            componentName={item.name} 
            isActive={isDrop} 
            x={item.x} 
            y={item.y} 
            zIndex={item.zIndex}
          />
        ))}
      </div>
      <button onClick={reactToPrintFn} className='bg-amber-500 p-10'>GERAR PDF</button>
    </div>
  )
}
