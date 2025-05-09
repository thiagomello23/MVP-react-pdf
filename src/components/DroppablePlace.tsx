import { useRef, useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import { useReactToPrint } from 'react-to-print'
import DynamicComponentRender from './DynamicComponentRender'

export default function DroppablePlace() {
  const [clientData, setClientData] = useState<any>([])

  const ref = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({ contentRef });

  const [{isOver}, drop] = useDrop(() => ({
    accept: "ANY",
    drop: (item: any, monitor) => {
      const element = monitor.getClientOffset()

      setClientData((prev: any) => {
        return [
          {
            x: element?.x,
            y: element?.y,
            name: item.name,
            key: new Date().getTime() + Math.random() * 100,
            zIndex: item.zIndex ? item.zIndex : 1
          },
          ...prev
        ]
      });
    },
    collect: monitor => ({
        isOver: !!monitor.isOver(),
    })
  }))

  const onSave = () => {
    localStorage.setItem("DATA", JSON.stringify(clientData))
  }

  useEffect(() => {
    if(ref.current) {
      drop(ref.current)
    }
    if(localStorage.getItem("DATA")?.length){
      setClientData(JSON.parse(localStorage.getItem("DATA")!))
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
            x={item.x} 
            y={item.y} 
            zIndex={item.zIndex}
          />
        ))}
      </div>
      <button onClick={reactToPrintFn} className='bg-amber-500 p-10'>GERAR PDF</button>
      <button onClick={onSave} className='bg-amber-700 p-10'>SALVAR</button>
    </div>
  )
}
