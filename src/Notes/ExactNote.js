import React from 'react'
import AppContext from '../AppContext'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class ExactNote extends React.Component{
	static contextType = AppContext

	handleDelete = event => {
		event.preventDefault()
		const noteId = this.props.match.params.noteId
		fetch(`http://localhost:3000/notes/${noteId}`, {
      		method: 'DELETE',
      		headers: {'content-type': 'application/json'},
    		})
			.then(response => response.json())
			.then(() => this.context.deleteNote())
			.catch(error => console.log(error))
		}

	render(props){
		const exactNote = this.context.notes.find(note => note.id === this.props.match.params.noteId)
		return(
			<div className="exactNote">
				<h2>{exactNote.name}</h2>
				<p>{exactNote.content}</p>
				<Link to='/' ><button onClick={() => this.context.deleteNote(this.props.match.params.noteId)}>Delete</button></Link>
			</div>
		)
	}
}
ExactNote.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			noteId: PropTypes.string
		}),
		path: PropTypes.string,
		url: PropTypes.string,
		isExact: PropTypes.bool
	})
}

export default ExactNote