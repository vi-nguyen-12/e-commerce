import React from 'react'
import {ImStarFull, ImStarHalf, ImStarEmpty} from 'react-icons/im'
import {Wrapper} from './styled'


const Rating = ({value, text}) => {
    return (
        <Wrapper>
            {[...Array(5).keys()].map((i,idx)=>{
                return(
                    (value>=i+1)? <ImStarFull/>:
                    (value>=i+0.5)?<ImStarHalf/>:
                    <ImStarEmpty/>
                )
            })}             
            <span> {text&& text}</span>
        </Wrapper>
    )
}

export default Rating
