import React from 'react'
import styled from 'styled-components/macro'

import StoryBoard from './StoryBoard'
import AddBoard from './AddBoard'

import useCanvasSizeFromWindowHeight from '../../hooks/useCanvasSizeFromWindowHeight'

function MainSection(props) {
	console.log('rendering main-section...')

	const { state, dispatch } = props
	const { stories } = state
	const { storyIndex, shapeName } = state.active
	const { canvasHeight, canvasWidth } = useCanvasSizeFromWindowHeight()

	return (
		<MainLayout>
			{stories.map((story, index) => (
				<StoryBoard
					key={story.canvasName}
					canvasHeight={canvasHeight}
					canvasWidth={canvasWidth}
					index={index}
					shapeName={shapeName}
					storeDispatch={dispatch}
					story={story}
					isCurrentStory={storyIndex === index}
				/>
			))}

			{stories.length < 3 && (
				<AddBoard
					canvasHeight={canvasHeight}
					canvasWidth={canvasWidth}
					storeDispatch={dispatch}
				/>
			)}
		</MainLayout>
	)
}

const MainLayout = styled.main`
	flex: 1;
	background-color: #f7f7f7;
	padding-top: 1rem;
	padding-left: 3rem;
	overflow: hidden;

	display: flex;
	align-items: center;
`

export default React.memo(MainSection)