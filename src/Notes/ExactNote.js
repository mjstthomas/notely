import React from 'react'

export default function ExactNote(props){
	return(
		<div>
			<h2>{props.name}</h2>
			<p>{props.content}</p>
		</div>)
}