import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Message,
  Header,
  Form,
  Button,
  Grid,
  Container,
} from "semantic-ui-react";
import { getUserDetails, updateUser, resetUpdate } from "../../slice/userSlice";
import { Wrapper } from "./styled";
import {
  userDetailsSelector,
  userUpdateSelector,
} from "../../selector/userSelector";

const UserEditScreen = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector(userDetailsSelector);
  const { success: successUpdate, error: errorUpdate } = useSelector(
    userUpdateSelector
  );
  const [state, setState] = useState({
    name: "",
    email: "",
    isAdmin: false,
  });

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (successUpdate) {
      dispatch(resetUpdate());
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id)); //đây nè
      } else {
        setState((state) => ({
          ...state,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        }));
      }
    }
  }, [dispatch, user, id, successUpdate, history]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: id, ...state }));
  };

  return (
    <Wrapper>
      <Container>
        <Button
          className="back-btn"
          onClick={() => history.push("/admin/userlist")}
        >
          GO BACK
        </Button>
      </Container>
      <Grid.Column className="main">
        <Header as="h3"> EDIT USER</Header>
        {errorUpdate && <Message negative content={errorUpdate} />}
        {error && <Message negative content={error} />}
        <Form>
          <Form.Input
            label="Name"
            type="name"
            name="name"
            value={state.name}
            placeholder="Enter name"
            onChange={handleChange}
          />
          <Form.Input
            label="Email Address"
            type="email"
            name="email"
            value={state.email}
            placeholder="Enter email"
            onChange={handleChange}
          />
          <Form.Checkbox label="Is Admin" checked={state.isAdmin} />
          <Button className="submit-btn" type="submit" onClick={handleUpdate}>
            UPDATE
          </Button>
        </Form>
      </Grid.Column>
    </Wrapper>
  );
};

export default UserEditScreen;
