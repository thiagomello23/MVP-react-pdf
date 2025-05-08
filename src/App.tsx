import {} from 'react'
import ListDroppableItems from './components/ListDroppableItems'
import DroppablePlace from './components/DroppablePlace'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='w-full min-h-screen flex flex-row'>
        <div className='w-3/4 bg-amber-100'>
          <DroppablePlace />
        </div>
        <div className='w-1/4 bg-cyan-100'>
          <ListDroppableItems />
        </div>
      </div>
    </DndProvider>
  )
}
