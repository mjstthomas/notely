import React from 'react'
import './App.css';
import { Route } from 'react-router-dom'
import Header from './Header'
import store from './store'
import Folders from './Folders/Folders'
import Notes from './Notes/Notes'

class App extends React.Component {
  state = {
    folders: store.folders,
    notes: store.notes
  }
  render(){
    const folders = this.state.folders.map(folder => <Folders id={folder.id} name={folder.name} />)
    const notes = this.state.notes.map(note => <Notes id={note.id} folderId={note.folderId} name={note.name} content={note.content} />)
    return (
      <div className="App">
        <header>
          <Header />
        </header>
        <section>
        <nav>
          {folders}
        </nav>
        <main>
          {notes}
        </main>
        </section>
      </div>
    );
  }
}

export default App;
