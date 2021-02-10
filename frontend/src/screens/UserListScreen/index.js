import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import {
  userListSelector,
  userLoginSelector,
} from "../../selector/userSelector";
import { listUsers } from "../../slice/userSlice";
import { Wrapper } from "./styled";
import { Message, Header, Form, Button, Table } from "semantic-ui-react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ImCheckmark, ImCross } from "react-icons/im";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const { users, error } = useSelector(userListSelector);
  const { userInfo } = useSelector(userLoginSelector);

  const history = useHistory();
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch]);

  if (error) return <Message negative content={error} />;
  return (
    <Wrapper>
      <Grid centered>
        <Grid.Column width={14}>
          <Header as="h3"> USERS</Header>
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>NAME</Table.HeaderCell>
                <Table.HeaderCell>EMAIL</Table.HeaderCell>
                <Table.HeaderCell>ADMIN</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {users.map((user, ind) => (
                <Table.Row key={ind}>
                  <Table.Cell>{user._id}</Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <ImCheckmark color="green" />
                    ) : (
                      <ImCross color="red" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Button size="small">
                      {" "}
                      <FiEdit />
                    </Button>
                    <Button size="small">
                      {" "}
                      <RiDeleteBin6Line color="red" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    </Wrapper>
  );
};

export default UserListScreen;
