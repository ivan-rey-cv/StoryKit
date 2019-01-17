import React, { PureComponent } from 'react'
import { Group } from 'react-konva'
import produce from 'immer'

import TextBox from './TextBox'

class TextGroup extends PureComponent {
	state = {
		textBoxesWidth: []
	}

	handleSetTextBoxWidth = (textBoxIndex, width) => {
		this.setState(
			produce(draft => {
				draft.textBoxesWidth[textBoxIndex] = width
			})
		)
	}

	render() {
		const { textGroup, onDragKonvaShape } = this.props

		const { text, id, ...textProperties } = textGroup

		const multiline = '\n'
		const multilineTexts = text.split(multiline)

		return (
			<Group
				ref={node => (this.groupNode = node)}
				x={textGroup.coord.x}
				y={textGroup.coord.y}
				scaleX={textGroup.coord.scaleX}
				scaleY={textGroup.coord.scaleY}
				rotation={textGroup.coord.rotation}
				draggable
				name={`${id}-group`}
				dragBoundFunc={onDragKonvaShape}
				onTransform={this.props.onTransform}
			>
				{multilineTexts.map((lineText, lineTextIndex) => (
					<TextBox
						key={`multiline-text-${lineTextIndex}`}
						textBoxesWidth={this.state.textBoxesWidth}
						lineText={lineText}
						lineTextIndex={lineTextIndex}
						textProperties={textProperties}
						name={id}
						handleSetTextBoxWidth={this.handleSetTextBoxWidth}
					/>
				))}
			</Group>
		)
	}
}

export default TextGroup
