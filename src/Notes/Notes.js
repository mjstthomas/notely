import React from 'react'
import { Link } from 'react-router-dom'

export default function Notes(props){
	return (
		<div className="notes">
			<Link to={`/Notes/${props.id}`} ><button className="note">{props.name}</button></Link>
		</div>
	)
}