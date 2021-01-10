import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import {useSelector} from 'react-redux';

const Loading = () => {
  const {loading}=useSelector(state=>state.loading);
  return(
    loading?
    <Segment>
      <Dimmer active inverted>
        <Loader>Loading...</Loader>
      </Dimmer>
      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>
    :null
  )
 
}


export default Loading
