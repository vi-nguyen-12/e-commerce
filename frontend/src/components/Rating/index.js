import React from 'react'
import {ImStarFull, ImStarHalf, ImStarEmpty} from 'react-icons/im'
import {Wrapper} from './styled'
const Rating = ({value, text}) => {
    return (
        <Wrapper>
            {value>=1? <ImStarFull/>:value>=0.5? <ImStarHalf/>: <ImStarEmpty/>}
            {value>=2? <ImStarFull/>:value>=1.5? <ImStarHalf/>: <ImStarEmpty/>}
            {value>=3? <ImStarFull/>:value>=2.5? <ImStarHalf/>: <ImStarEmpty/>}
            {value>=4? <ImStarFull/>:value>=3.5? <ImStarHalf/>: <ImStarEmpty/>}
            {value>=5? <ImStarFull/>:value>=4.5? <ImStarHalf/>: <ImStarEmpty/>}
            <span> {text&& text}</span>
        </Wrapper>
    )
}

export default Rating
