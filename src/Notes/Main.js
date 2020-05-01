import React from 'react'
import {Link} from 'react-router-dom'
import Notes from './Notes'
import AppContext from '../AppContext'
import NoteError from './NoteError'

class Main extends React.Component{
	static contextType = AppContext
	render(props){
		const notes = this.props.match.params.folderId ? this.context.notes.filter(note => note.folderId === this.props.match.params.folderId) : this.context.notes
		const newNotes = notes.map(note =>  <Notes modified={note.modified} key={note.id} id={note.id } name={note.name} />)
		return(
			<NoteError>
				<div>
					<ul>
						{newNotes}
					</ul>
					<Link to={`/folders/${this.props.match.params.folderId}/addNotes`}><button>Add Note</button></Link>
				</div>
			</NoteError>
			)}
}
export default Main