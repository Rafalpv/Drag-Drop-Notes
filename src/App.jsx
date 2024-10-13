import  NotesPage from '../pages/NotesPage'
import  NotesProvider  from './context/NoteContext'

export default function App() {
  return (
    <div id="app">
      <NotesProvider>
        <NotesPage />
      </NotesProvider>
    </div>
  )
}


