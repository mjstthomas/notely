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

class App extends React.Component {
  state = {
    folders: store.folders,
    notes: store.notes
  }
  render(){
    return (
      <div className="App">
        <header>
          <Header />
        </header>
        <section>
        <nav>
          <Route path="/" exact render={() => <Folders folders={this.state.folders} />} />
          <Route path='/folders/:folderId' render= {(props) => <Folders folders={this.state.folders} selected={props.match.params.folderId} />} />
          <Route path='/notes/:noteId' render={() => <GoBack />} />
        </nav>
        <main>
          <Route path='/' exact render={() => <Main notes={this.state.notes}/> } />
          <Route path='/folders/:folderId' render={(props) => { 
              return (
                <Main notes={this.state.notes.filter(note => note.folderId === props.match.params.folderId)}/>
              )}}
          />
          <Route path='/notes/:noteId' render={(props) => {
              const exactNote = this.state.notes.find(note => note.id === props.match.params.noteId)
            return (
            <ExactNote {...exactNote}/>)
          }}/>
        </main>
        </section>
      </div>
    );
  }
}

export default App;
