import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, useLocation } from "react-router-dom";
import queryString from "query-string";
import { addToCart, removeItem} from "../../slice/cartSlice";
import { cartSelector } from "../../selector/cartSelector";
import {Grid, Image, Item, Dropdown, Button, Header, Container, Menu} from 'semantic-ui-react';
import {Wrapper} from './styled'
import {BsTrash} from 'react-icons/bs'

const CartScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const qty = location.search
    ? Number(queryString.parse(location.search.substring(1)).qty)
    : 1;
  const history= useHistory();
  const dispatch = useDispatch();
  const { cartItems } = useSelector(cartSelector);

  useEffect(() => {
    if (id) {
      dispatch(addToCart({ id, qty }));
    }
    console.log('haha')
  }, [dispatch]);

  const handleChange=id=>(_,data)=>{
    const qty=data.value;
    dispatch(addToCart({id,qty}))
  }
  const handleRemove=(id)=>()=>{
    dispatch(removeItem(id))

  }
  const handleCheckout=()=>{
    history.push('/login?redirect=shipping')
  }
  const totalItems=cartItems.reduce((total,i)=>total+=i.qty,0);
  const subTotalPrice=cartItems.reduce((total,i)=>total+=i.price*i.qty,0)

  return (
    <Wrapper>
    <Header as='h3'>SHOPPING CART</Header>
    <Container className='wrap'>
      <Container className="items">
      {cartItems.map(item=>(
         <Grid >
             <Grid.Row columns={5}>
                <Grid.Column width={4}>
                    <Image src={item.image} />
                </Grid.Column>
                <Grid.Column width={4}>
                    <Item.Header>{item.name}</Item.Header>
                </Grid.Column> 
                <Grid.Column width={3}>
                    <Item.Meta>${item.price}</Item.Meta>
                </Grid.Column > 
                <Grid.Column width={3}>
                    <Dropdown
                        fluid
                        selection
                        onChange={handleChange(item.product)}
                        options={
                            [...Array(item.countInStock).keys()].map(x=>{
                            return { key: x+1, text:x+1, value: x+1}})}
                        value={item.qty}
                    />
                </Grid.Column> 
                <Grid.Column width={2}>
                    <Button onClick={handleRemove(item.product)}>
                      <BsTrash/>
                    </Button>
                </Grid.Column> 
             </Grid.Row>
         </Grid>
     ))}
      </Container>
      {/* <Container className="total"> */}
        <Menu  vertical compact>
              <Menu.Item>
                <Header as='h4'>SUBTOTAL ({totalItems}) ITEMS </Header>
                <Header as='h5'>${subTotalPrice}</Header>
              </Menu.Item>
              <Menu.Item>
                <Button onClick={handleCheckout} disabled={cartItems.length===0}>PROCEED TO CHECKOUT</Button>
              </Menu.Item>
        </Menu>
      {/* </Container> */}
    </Container>
    
     
    </Wrapper>);
};

export default CartScreen;
