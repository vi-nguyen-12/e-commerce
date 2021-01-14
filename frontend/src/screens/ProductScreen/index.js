import React , { useState, useEffect}from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import {getProductDetail} from '../../slice/productSlice'
import {productDetailSelector} from '../../selector/productSelector';

import {Button, Item, Menu, Divider, Grid, Image, Message, Dropdown} from 'semantic-ui-react'
// import {Loading} from '../../components'
import {Wrapper} from './styled'
import Rating from '../../components/Rating';

const ProductScreen = () => {
    const [qty,setQty]=useState(1);
    const {id} =useParams();
    const history=useHistory();
    const {product,error}=useSelector(productDetailSelector);
    const dispatch=useDispatch();

    const options=[...Array(product.countInStock).keys()].map(x=>{
        return { key: x+1, text:x+1, value: x+1}
    })
    
    useEffect(()=>{
        dispatch(getProductDetail(id));
    },[dispatch,id])
    
    const handleClick=()=>{
        history.push('/')
    }

    const handleChange=(_,data)=>{
        setQty(data.value);
    }
    const handleAddToCart=()=>{
        history.push(`/cart/${id}?qty=${qty}`)
    }

    if(error) return <Message error header={error}/>

    return (
        product?
            <Wrapper>
                <Grid columns={4}>
                    <Grid.Row >
                        <Button onClick={handleClick}>GO BACK</Button>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Image src={product.image} />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Item>
                                <Item.Header as='a'>{product.name}</Item.Header>
                                <Divider/>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                                <Divider/>
                                <Item.Description>Price: ${product.price}</Item.Description>
                                <Divider/>
                                <Item.Description>Description: {product.description}</Item.Description>
                            </Item>
                        </Grid.Column>
                        <Grid.Column width={4}>
                        <Menu vertical>
                            <Menu.Item>
                                <div>Price: </div>
                                <div>{product.price}</div>
                            </Menu.Item>
                            <Menu.Item>
                                <div>Status: </div>
                                <div>{product.countInStock>0? 'In Stock': 'Out Of Stock'}</div>
                            </Menu.Item>
                            {
                                product.countInStock>0&&
                                (
                                    <Menu.Item> 
                                        <div>Qty</div>
                                        <Dropdown                      
                                            options={options}
                                            onChange={handleChange}
                                            value={qty}
                                        />                          
                                    </Menu.Item>
                                )
                            }
                            <Menu.Item>
                                <Button 
                                    disabled={product.countInStock===0}
                                    onClick={handleAddToCart}
                                > 
                                    ADD TO CART
                                </Button>
                            </Menu.Item>
                        </Menu>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Wrapper>
            :null
    )
}

export default ProductScreen
