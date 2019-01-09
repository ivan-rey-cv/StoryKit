import React, { useCallback } from 'react'
import styled, { css } from 'styled-components/macro'

import CopySVG from 'react-feather/dist/icons/copy'
import DownloadSVG from 'react-feather/dist/icons/download'
import UpSVG from 'react-feather/dist/icons/chevrons-up'
import DownSVG from 'react-feather/dist/icons/chevrons-down'

function BoardFooter(props) {
	const { isCurrentStory, shapeName, storeDispatch, boardIndex } = props
	const zIndexDisabled = isCurrentStory && shapeName != null ? false : true

	const handleMoveShapeZIndex = useCallback(
		increment => event => {
			event.stopPropagation()
			storeDispatch({
				type: 'MOVE_SHAPE_Z_INDEX',
				increment: increment
			})
		},
		[]
	)

	const handleCopyBoard = useCallback(event => {
		event.stopPropagation()
		storeDispatch({
			type: 'COPY_BOARD'
		})
	}, [])

	const handleDownloadBoard = useCallback(
		event => {
			event.stopPropagation()
			storeDispatch({
				type: 'SET_ACTIVE_SHAPE_NAME',
				name: null,
				storyIndex: boardIndex
			})

			storeDispatch({
				type: 'DOWNLOAD_BOARD',
				boardIndex: boardIndex
			})
		},
		[boardIndex]
	)

	return (
		<Footer>
			<ActionButton onClick={handleCopyBoard}>
				<CopySVG />
			</ActionButton>
			<ActionButton onClick={handleDownloadBoard}>
				<DownloadSVG />
			</ActionButton>
			<ActionButton
				disabled={zIndexDisabled}
				onClick={handleMoveShapeZIndex(-1)}
			>
				<DownSVG />
			</ActionButton>
			<ActionButton
				disabled={zIndexDisabled}
				onClick={handleMoveShapeZIndex(+1)}
			>
				<UpSVG />
			</ActionButton>
		</Footer>
	)
}

const Footer = styled.footer`
	margin-top: 1.5rem;
	width: 100%;
	height: 2rem;
	border-radius: 2px;
	border: 1px solid lightgray;

	display: flex;
	align-items: center;
	justify-content: center;
`
const ActionButton = styled.button.attrs({
	tabIndex: 0
})`
	margin-left: 0.75rem;
	height: 100%;
	width: 2.5rem;
	border: none;
	background-color: transparent;

	display: flex;
	align-items: center;
	justify-content: center;

	${props =>
		props.disabled
			? css``
			: css`
					cursor: pointer;
					:hover {
						background-color: var(--color-light-hover);
					}
					:active {
						transform: scale(0.95);
					}
			  `}
`

export default React.memo(BoardFooter)
