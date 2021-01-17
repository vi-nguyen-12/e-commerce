import React, {useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link, useLocation, useHistory} from 'react-router-dom';
import {Message, Header, Form, Button, Container} from 'semantic-ui-react'
import {register} from '../../slice/userSlice'
import {Wrapper} from './styled'
import {userRegisterSelector} from '../../selector/userSelector';

const RegisterScreen = () => {
    const [state,setState]=useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
    })
    const [message,setMessage] = useState('');
    const dispatch=useDispatch();
    const {userInfo, error}=useSelector(userRegisterSelector);

    const history=useHistory();
    const location=useLocation();
    const redirect=location.search? location.search.split('=')[1]: '/'
    
    useEffect(()=>{
        if(userInfo){history.push(redirect)}
    },[history, userInfo, redirect])

    const handleChange=e=>{
        setState({...state,[e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(state.password !==state.confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(register({name:state.name, email: state.email,password:state.password}))
        }
    }

    return (
        <Wrapper>
            <Header as='h3'> SIGN UP</Header>
            {message && <Message negative content={message} />}
            {error && <Message negative content={error} />}
            <Form>
                <Form.Input
                    label='Name'
                    type="name"
                    name='name'
                    id='form-input-name'
                    value={state.name}
                    placeholder='Enter name'
                    onChange={handleChange}
                />
                <Form.Input
                    label='Email Address'
                    type="email"
                    name='email'
                    id='form-input-email'
                    value={state.email}
                    placeholder='Enter email'
                    onChange={handleChange}
                />
                <Form.Input
                    label='Password'
                    type='password'
                    name='password'
                    id='form-input-password'
                    value={state.password}
                    placeholder='Enter password'
                    onChange={handleChange}
                />
                <Form.Input
                    label='Confirm Password'
                    type='password'
                    name='confirmPassword'
                    id='form-input-confirmPassword'
                    value={state.confirmPassword}
                    placeholder='Confirm Password'
                    onChange={handleChange}
                />
                <Button type='submit' onClick={handleSubmit}>REGISTER</Button>
            </Form>
            <Container>
                Have an Account?{' '}
                <Link to={redirect? `/login?redirect=${redirect}`:'/login'}>
                Login
                </Link>
            </Container>
        </Wrapper>
    )
}

export default RegisterScreen
