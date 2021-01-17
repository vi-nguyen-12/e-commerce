import React, {useState,useEffect}  from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import {userDetailsSelector} from '../../selector/userSelector';
import {userLoginSelector, userUpdateProfileSelector} from '../../selector/userSelector';
import {getUserDetails, updateUserProfile} from '../../slice/userSlice'
import {Wrapper} from './styled'
import {Message, Header, Form, Button, Container} from 'semantic-ui-react'

const ProfileScreen = () => {
    const [state,setState]=useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
    })
    const [message,setMessage] = useState('');
    const dispatch=useDispatch();
    const {user, error}=useSelector(userDetailsSelector);
    const {userInfo}=useSelector(userLoginSelector);
    const {success}=useSelector(userUpdateProfileSelector);

    const history=useHistory();
    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user.name){
                dispatch(getUserDetails('profile'))
            }else{
                console.log(state)
                setState({
                    ...state,
                    name:user.name,
                    email:user.email
                })
            }
        }
    },[dispatch, history, userInfo, user])

    const handleChange=e=>{
        setState({...state,[e.target.name]:e.target.value})
    }
    const handleSubmit=()=>{
        if(state.password!==state.confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(updateUserProfile({id:user._id,name:state.name,email:state.email,password:state.password}))
        }
    }
    return (
        <Wrapper>
            <Grid columns={2}>
                <Grid.Column width={1}/>
                <Grid.Column width={5} className='five-wide'>
                        <Header as='h3'> MY PROFILE</Header>
                        {message && <Message negative content={message} />}
                        {error && <Message negative content={error} />}
                        {success && <Message positive content='Profile updated'/>}
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
                    </Grid.Column>
                    <Grid.Column width={10}></Grid.Column>
                </Grid>     
        </Wrapper>
    )
}

export default ProfileScreen
