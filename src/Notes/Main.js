import React from 'react'
import {Link} from 'react-router-dom'
import Notes from './Notes'
import AppContext from '../AppContext'
import NoteError from './NoteError'
import PropTypes from 'prop-types'

class Main extends React.Component{
	static contextType = AppContext
	render(props){
		const notes = this.props.match.params.folderId ? this.context.notes.filter(note => note.folderId == this.props.match.params.folderId) : this.context.notes
		const newNotes = notes.map(note =>  <Notes modified={note.modified} key={note.id} id={note.id } name={note.noteName} />)
		return(
			<NoteError>
				<div>
					<ul className="noteContainer">
						{newNotes}
					</ul>
					<Link to={`/folders/${this.props.match.params.folderId}/addNotes`}><button className="addBtn">+</button></Link>
				</div>
			</NoteError>
			)}
}
Main.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			folderId: PropTypes.string
		}),
		path: PropTypes.string,
		url: PropTypes.string,
		isExact: PropTypes.bool
	})
}
export default Main