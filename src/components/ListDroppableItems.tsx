import {} from 'react'
import DroppableRectangle from './DroppableRectangle'

export default function ListDroppableItems() {
  return (
    <div className='w-full h-full p-10 flex flex-col gap-3'>
        <DroppableRectangle />
        <DroppableRectangle />
        <DroppableRectangle />
    </div>
  )
}
