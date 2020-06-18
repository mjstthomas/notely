import React from 'react'
import AppContext from '../AppContext'
import { Link } from 'react-router-dom'
import PropTypes, { exact } from 'prop-types'
import API_URL from '../config'


class ExactNote extends React.Component{
	state = {
		note_name: "",
		content: ""
	}
	static contextType = AppContext

	fillState = () =>{
		const exactNote = this.context.notes.find(note => note.id == this.props.match.params.noteId)
		this.setState({
			note_name: exactNote.noteName,
			content: exactNote.content
		})
	}

	handleClick = event =>{
		const {name, value} = event.target
		this.setState({[name]: value})
	}

	handleSubmit=event=>{
		event.preventDefault()
		const {note_name, content} = this.state
		const updatedNote ={note_name, content}
		const noteId = this.props.match.params.noteId

		fetch(`https://glacial-hamlet-86888.herokuapp.com/api/notes/${noteId}`, {
			method: 'POST',
			body: JSON.stringify(updatedNote),
			headers: {'content-type': 'application/json'},
		})
		this.context.handleEdit(noteId, updatedNote)
		setTimeout(this.props.history.push('/'), 3000)
	}

	handleDelete = event => {
		event.preventDefault()
		const noteId = this.props.match.params.noteId
		fetch(`https://glacial-hamlet-86888.herokuapp.com/api/notes/${noteId}`, {
      		method: 'DELETE',
      		headers: {'content-type': 'application/json'},
    		})
			.catch(error => console.log(error))
			this.context.deleteNote(noteId)
			this.props.history.push('/')
		}

	componentDidMount(){
		this.fillState()
	}
	render(props){
		
		return(
			<div className="exactNote">
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="note_name">Note Title</label><br/>
					<input type="text" name="note_name" value={this.state.note_name} onChange={this.handleClick}/><br/>
					<label htmlFor="content">Content:</label><br/>
					<textarea className="content-container" name="content" value={this.state.content} onChange={this.handleClick}/><br/>
					<button type='submit' className="editBtn">Edit</button>
					<button className="deleteNoteBtn" onClick={this.handleDelete}>x</button>
				</form>
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