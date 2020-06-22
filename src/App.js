import React from 'react'
import './App.css';
import { Route } from 'react-router-dom'
import Header from './Header'
import store from './store'
import Folders from './Folders/Folders'
import GoBack from './Folders/GoBack'
import Main from './Notes/Main'
import Notes from './Notes/Notes'
import ExactNote from './Notes/ExactNote'
import AddNotes from './Notes/AddNotes'
import AddFolder from './Folders/AddFolder'
import AppContext from './AppContext'

class App extends React.Component {
  state = {
    folders: [],
    notes: []
  }


  componentDidMount(){
      fetch(`https://glacial-hamlet-86888.herokuapp.com/api/folders`)
        .then(response => response.json())
        .then(data => this.setState({folders: data}))
      fetch(`https://glacial-hamlet-86888.herokuapp.com/api/notes`)
        .then(response => response.json())
        .then(data => this.setState({notes: data}))
    }

  deleteFolder = folderId =>{
    const newFolders = this.state.folders.filter(folder => folder.id != folderId)
    const newNotes = this.state.notes.filter(note => note.folderId != folderId)
    this.setState({
      folders: [...newFolders],
      notes: [...newNotes]
    }) 
  }

  deleteNote = noteId => {
    const newNotes= this.state.notes.filter(note => noteId != note.id)
    this.setState({notes: [...newNotes]})
  }

  handleFolderSubmit = folder =>{
    this.setState({folders: [...this.state.folders, folder]})
  }

  handleNoteSubmit = note => {
    this.setState({notes: [...this.state.notes, note]})
  }

  handleEdit= (noteId, updatedNote) =>{
    const newNotes = [...this.state.notes]
    newNotes.map(note =>{
      if (note.id == noteId){
        note.note_name = updatedNote.note_name
        note.content = updatedNote.content
      }
    })
    this.setState({notes: [...newNotes]})
  }
  
  render(){
    const appValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      deleteFolder: this.deleteFolder,
      handleNoteSubmit: this.handleNoteSubmit,
      handleFolderSubmit: this.handleFolderSubmit,
      handleEdit: this.handleEdit,
    }
    return (
      <AppContext.Provider value={appValue}>
        <div className="App">
          <header>
            <Header />
          </header>
          <section>
          <nav>
            <Route path="/" exact component={Folders} />
            <Route path='/folders/:folderId' component={Folders} />
            <Route path='/notes/:noteId' component={GoBack} />
            <Route path='/folders/:folderId/addNotes' component={GoBack} />
          </nav>
          <main>
            <Route path='/' exact component={Main} />
            <Route path='/folders/:folderId' component={Main}/>
            <Route path='/notes/:noteId' component={ExactNote}/>
            <Route path='/folders/:folderId/addNotes' component={AddNotes} />
            <Route path='/folders/:folderId/addfolder' component={AddFolder}/>
          </main>
          </section>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
