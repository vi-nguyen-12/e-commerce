import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Header, Grid, Message} from 'semantic-ui-react'
import { Wrapper} from "./styled";
import {Product, Loading} from '../../components'
import {productListSelector} from '../../selector/productSelector';
import {getProductList} from '../../slice/productSlice'

const HomeScreen = () => {
    const {products,loading,error}=useSelector(productListSelector);
    console.log(products);
    const dispatch=useDispatch();
    useEffect(()=>{
       dispatch(getProductList());
    },[dispatch])


    if (loading) return <Loading/>
    if(error) return <Message error header={error}/>
    return (
            <Wrapper>
                <Header> LATEST PRODUCTS </Header>
                <Grid columns={4}>
                    <Grid.Row>
                        {products.map((product,idx)=>(
                            <Grid.Column key={idx}>
                                <Product product={product}/>
                            </Grid.Column>
                        ))}
                    </Grid.Row>
                </Grid>
            </Wrapper>
    )
}

export default HomeScreen
