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
      fetch('http://localhost:8000/api/folders')
        .then(response => response.json())
        .then(data => this.setState({folders: data}))
      fetch('http://localhost:8000/api/notes')
        .then(response => response.json())
        .then(data => this.setState({notes: data}))
        .then(() => console.log(this.state.notes))
    }

  deleteNote = noteId => {
    const newNotes= this.state.notes.filter(note => noteId !== note.id)
    this.setState({notes: newNotes})
  }
  handleFolderSubmit = event =>{
    fetch('http://localhost:8000/api/folders')
        .then(response => response.json())
        .then(data => this.setState({folders: data}))
  }
  handleNoteSubmit = event => {
      fetch('http://localhost:8000/api/notes')
        .then(response => response.json())
        .then(data => this.setState({notes: data}))
  }
  
  render(){
    const appValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      handleNoteSubmit: this.handleNoteSubmit,
      handleFolderSubmit: this.handleFolderSubmit
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
