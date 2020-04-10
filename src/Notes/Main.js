import React from 'react'
import {Link} from 'react-router-dom'
import Notes from './Notes'

export default function Main(props){
	const notes = props.notes.map(note => <li><Notes id={note.id} name={note.name} content={note.content} /></li>)
	return(
		<div>
			<ul>
				{notes}
			</ul>
			<button>Add Note</button>
		</div>)
}