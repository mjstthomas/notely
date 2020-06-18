import React from 'react'
import {v4 as uuidv4} from 'uuid'
import { Link } from 'react-router-dom'
import AppContext from '../AppContext'




const newDate = new Date()

class AddNotes extends React.Component{
	state = {
		folderid: this.props.match.params.folderId,
		noteName: '',
		content: ''
	}
	static contextType = AppContext

	handleChange= event =>{
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}
	handleSubmit=event=>{
		event.preventDefault()
		const newNote = {
			folderid: Number(this.state.folderid),
			noteName: this.state.noteName,
			content: this.state.content
		}
		fetch(`https://glacial-hamlet-86888.herokuapp.com/api/notes`, {
			method: 'POST',
			body: JSON.stringify(newNote),
			headers: {'content-type': 'application/json'}
		})
		.then(newNote.id = this.context.notes.length)
		.then(this.context.handleNoteSubmit(newNote))
		this.props.history.push('/')
		
	}
	handleClick=()=>{
		console.log(this.state)
	}


	render(){
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="noteName">New Note Name:</label>
					<br/>
					<input type="text" onChange={this.handleChange} className="noteName" name="noteName" required/>
					<br/>
					<label htmlFor="noteContent" >Note content:</label>
					<br/>
					<textarea name="content" onChange={this.handleChange} cols="100" rows="10" required></textarea>
					<br/>
					<button type="submit" onClick={this.handleClick}>Submit</button>
				</form>
			</div>
		)
	}
}

export default AddNotes