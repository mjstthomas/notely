import React from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../AppContext'



const newDate = new Date()

class AddNotes extends React.Component{
	state = {
		"folderId": this.props.match.params.folderId,
		"id": Math.ceil(Math.random()*10000000).toString(),
		"modified": newDate,
		"name": '',
		"content": ''
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
		fetch('http://localhost:9090/notes', {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: {'content-type': 'application/json'}
		})
		.then(this.context.handleNoteSubmit())
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
					<input type="text" onChange={this.handleChange} className="noteName" name="name" required/>
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