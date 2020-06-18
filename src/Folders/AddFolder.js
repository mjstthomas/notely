import React from 'react'
import AppContext from '../AppContext'
import {v4 as uuidv4} from 'uuid'
import API_URL from '../config'

class AddFolder extends React.Component{
	state = {
		id: this.context.folders.length.toString(),
		folderName: '',
		touched: false,
		errorMessage: ''
	}
	static contextType = AppContext

	handleChange= event =>{
		this.setState({
			folderName: event.target.value,
			touched: true})
		this.validateName()
		console.log(this.state.touched)
	}
	validateName = () =>{
		if (this.state.folderName.length < 3){
			this.setState({errorMessage: "you must input a valid name"})
		} else {
			this.setState({errorMessage: null})
		}
	}
	handleSubmit=event=>{
		event.preventDefault()
		const newFolder = {
			id: uuidv4(),
			folderName: this.state.folderName
		}
		fetch(`https://glacial-hamlet-86888.herokuapp.com/api/folders`, {
			method: 'POST',
			body: JSON.stringify(newFolder),
			headers: {'content-type': 'application/json'}
		})
		this.context.handleFolderSubmit(newFolder)
		this.props.history.push('/')

	}
	render(){
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" onChange={this.handleChange} ref={this.folderInput} />
					<p>{this.state.touched && this.state.errorMessage}</p>
					<button type="submit" >add folder</button>
				</form>
			</div>
			)
	}
}
export default AddFolder