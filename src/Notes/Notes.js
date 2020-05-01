import React from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../AppContext'

class Notes extends React.Component{
	static contextType = AppContext
	render(props){
		return (
			<div className="notes">
				<Link to={`/Notes/${this.props.id}`} ><button className="note">{this.props.name}</button></Link>
			</div>
		)}
}

export default Notes