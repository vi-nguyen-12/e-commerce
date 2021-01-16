import React from 'react';
import {Step} from 'semantic-ui-react';
import {useHistory} from 'react-router-dom';

const CheckoutSteps = ({step1,step2,step3,step4}) => {
    const history = useHistory();

    const handleClick=(_, {name})=>{
        history.push(`/${name}`)
    }
    return (
        <div>
            <Step.Group widths={4} size='tiny'>
                <Step 
                    active={step1} 
                    disabled={!step1} 
                    link 
                    name='login'
                    onClick={handleClick}
                > 
                    Login
                </Step>
                <Step 
                    active={step2} 
                    disabled={!step2} 
                    link 
                    name='shipping'
                    onClick={handleClick}
                > 
                    Shipping
                </Step>
                <Step 
                    active={step3} 
                    disabled={!step3} 
                    link 
                    name='payment'
                    onClick={handleClick}
                > 
                    Payment
                </Step>
                <Step 
                    active={step4} 
                    disabled={!step4} 
                    link 
                    name='placeorder'
                    onClick={handleClick}
                > 
                    Place Order
                </Step>
            </Step.Group>
        </div>
    )
}

export default CheckoutSteps
