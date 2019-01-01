import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import Select from 'react-select'

import ColorSwatch from './ColorSwatch'

const fontsOption = [
	{ value: 'Arial', label: 'Arial' },
	{ value: 'Calibri', label: 'Calibri' },
	{ value: 'Times New Roman', label: 'Times New Roman' }
]

function FontAndColor(props) {
	const { currentText, storeDispatch } = props

	const preventPropagation = useCallback(function(event) {
		event.stopPropagation()
		event.preventDefault()
	}, [])

	const handleSelectFont = useCallback(function(option) {
		const properties = {
			fontFamily: option.value
		}
		storeDispatch({ type: 'MODIFY_TEXT', properties })
	}, [])

	console.log({ currentText })

	return (
		<Container>
			<SelectDiv onClick={preventPropagation}>
				<StyledSelect
					name="fontFamily"
					onChange={handleSelectFont}
					value={{
						value: currentText.fontFamily,
						label: currentText.fontFamily
					}}
					options={fontsOption}
				/>
			</SelectDiv>

			<ColorsDiv>
				<ColorSwatch
					name="text"
					fillName={'fill'}
					opacityName={'opacity'}
					storeDispatch={storeDispatch}
				>
					<Alpha color={currentText.fill}>A</Alpha>
				</ColorSwatch>

				<ColorSwatch
					name="box"
					fillName={'boxFill'}
					opacityName={'boxOpacity'}
					storeDispatch={storeDispatch}
				>
					<ColorBox color={currentText.boxFill} />
				</ColorSwatch>
			</ColorsDiv>
		</Container>
	)
}

const Container = styled.div`
	padding-top: 0.5rem;
	position: relative;
	display: flex;
	align-items: center;
`
const ColorsDiv = styled.div`
	margin-left: 0.5rem;
	display: flex;
`
const Alpha = styled.p`
	height: 21px;
	font-weight: 900;
	font-size: 1.25rem;

	color: ${props => props.color};
`
const ColorBox = styled.div`
	height: 21px;
	width: 21px;
	border: 1px solid lightgray;
	border-radius: 3px;

	background-color: ${props => props.color};
`
const SelectDiv = styled.div`
	width: 100%;
`
const StyledSelect = styled(Select)`
	width: 100%;
	height: 2rem;
	font-size: 1rem;
	font-family: ${props => `${props.font}`};
`
const Option = styled.option`
	font-family: ${props => `${props.font}`};
`

export default React.memo(FontAndColor)
