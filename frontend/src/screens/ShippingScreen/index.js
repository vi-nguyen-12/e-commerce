import React, {useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Header, Form, Button} from 'semantic-ui-react'
import {saveShippingAddress} from '../../slice/cartSlice'
import {Wrapper} from './styled'
import {cartSelector} from '../../selector/cartSelector';
import CheckoutSteps from '../../components/CheckoutSteps'

const ShippingScreen = () => {
    const dispatch=useDispatch();
    const {shippingAddress}=useSelector(cartSelector);

    const [state,setState] = useState({
        address:shippingAddress.address,
        city:shippingAddress.city,
        postalCode:shippingAddress.postalCode,
        country:shippingAddress.country,
    })
 
    const handleChange=e=>{
        setState({...state,[e.target.name]:e.target.value})
    }
    const history=useHistory();

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(saveShippingAddress({
            address:state.address,
            city:state.city,
            postalCode:state.postalCode,
            country:state.country
        }))
        history.push('/payment')
    }

    return (
        <Wrapper>
                <CheckoutSteps step1 step2/>
                <Header as='h3'> SHIPPING</Header>
                <Form>
                    <Form.Input
                        label='Address'
                        type="text"
                        name='address'
                        value={state.address}
                        placeholder='Enter address'
                        onChange={handleChange}
                    />
                    <Form.Input
                        label='City'
                        type="text"
                        name='city'
                        value={state.city}
                        placeholder='Enter city'
                        onChange={handleChange}
                    />
                    <Form.Input
                        label='Postal Code'
                        type='text'
                        name='postalCode'
                        value={state.postalCode}
                        placeholder='Enter postalCode'
                        onChange={handleChange}
                    />
                    <Form.Input
                        label='Country'
                        type='text'
                        name='country'
                        value={state.country}
                        placeholder='Enter country'
                        onChange={handleChange}
                    />
                    <Button type='submit' onClick={handleSubmit}>CONTINUE</Button>
                </Form>
        </Wrapper>
    )
}

export default ShippingScreen
