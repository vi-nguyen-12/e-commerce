import React, {useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link, useLocation, useHistory} from 'react-router-dom';
import {Message, Header, Form, Button, Container} from 'semantic-ui-react'
import {login} from '../../slice/userSlice'
import {Wrapper} from './styled'
import {userLoginSelector} from '../../selector/userSelector';
import {Loading} from '../../components'

const LoginScreen = () => {
    const [state,setState]=useState({
        email:'',
        password:'',
    })
    const dispatch=useDispatch();
    const {userInfo, loading, error}=useSelector(userLoginSelector);
    
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
        dispatch(login({email: state.email,password:state.password}))
    }

    return (
        <Wrapper>
            <Header as='h3'> SIGN IN</Header>
            {error && <Message negative content={error} />}
            {loading && <Loading/>}
            <Form>
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
                <Button type='submit' onClick={handleSubmit}>SIGN IN</Button>
            </Form>
            <Container>
                New Customer?{' '}
                <Link to={redirect? `/register?redirect=${redirect}`:'/register'}>
                Register
                </Link>
            </Container>
        </Wrapper>
    )
}

export default LoginScreen
