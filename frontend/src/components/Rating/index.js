import React from 'react'
import {ImStarFull, ImStarHalf, ImStarEmpty} from 'react-icons/im'
import {Wrapper} from './styled'


const Rating = ({value, text}) => {
    return (
        <Wrapper>
            {[...Array(5).keys()].map(i=>{
                if(value>=i+1)return <ImStarFull/>
                else {
                    if (value>=i+0.5)return <ImStarHalf/> 
                }
                return <ImStarEmpty/>})}
            <span> {text&& text}</span>
        </Wrapper>
    )
}

export default Rating
