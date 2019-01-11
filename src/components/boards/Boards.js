import React from 'react'
import styled from 'styled-components/macro'

import StoryBoard from './StoryBoard'
import AddBoard from './AddBoard'

import useCanvasSizeFromWindowHeight from '../../hooks/useCanvasSizeFromWindowHeight'

function MainSection(props) {
	const { state, dispatch } = props
	const { stories } = state
	const { storyIndex, shapeName } = state.active
	const { canvasHeight, canvasWidth } = useCanvasSizeFromWindowHeight()

	return (
		<MainLayout>
			{stories.map((story, index) => (
				<StoryBoard
					key={story.storyID}
					canvasHeight={canvasHeight}
					canvasWidth={canvasWidth}
					boardIndex={index}
					shapeName={shapeName}
					storeDispatch={dispatch}
					story={story}
					isCurrentStory={storyIndex === index}
					storiesLength={stories.length}
				/>
			))}

			<AddBoard
				canvasHeight={canvasHeight}
				canvasWidth={canvasWidth}
				storeDispatch={dispatch}
				newIndex={stories.length}
			/>
		</MainLayout>
	)
}

const MainLayout = styled.main`
	flex: 1;
	padding: 1rem 1.5rem;
	overflow: auto;

	display: flex;
	align-items: center;
`

export default React.memo(MainSection)
