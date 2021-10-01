import React from 'react';
import {FaEdit} from 'react-icons/fa'

const Card = ({children, id, keyNum, setSelectedCardId, setParentId}) => {

	const dragStart = (e) => {
		const target = e.target;
		e.dataTransfer.setData('card_id', target.id)
		setSelectedCardId(target.id)
		setParentId(target.parentNode.id)

		setTimeout(() => {
			target.style.display = "none"
		}, 0)
	}

	const onDragOver = (e) => {
		e.stopPropagation()
	}

	return(
		<>
			<div className="card" id={keyNum} 
			draggable="true"
			onDragStart={dragStart}
			onDragOver={onDragOver}>
				<FaEdit className="pencil" />
				{children}
			</div>
		</>
		)
}

export default Card