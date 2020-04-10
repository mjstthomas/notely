import React from 'react'

export default function Notes(props){
	return (
		<div className="notes">
			<button className="note">{props.name}</button>
		</div>)
}