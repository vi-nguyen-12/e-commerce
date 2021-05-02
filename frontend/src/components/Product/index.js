
import React from 'react'
import {Card, Image} from 'semantic-ui-react';
import Rating from '../Rating';
import {Link} from 'react-router-dom';

const Product = ({product}) => {

    return (
        <Card>
            <Link to={`/product/${product._id}`}>
                <Image src={product.image}/>
            </Link>
            
            <Card.Content>
                <Link to={`/product/${product._id}`}>
                    <Card.Header>{product.name}</Card.Header>
                </Link>
                <Card.Meta>
                    <Rating 
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                </Card.Meta>
                <Card.Description>
                    ${product.price}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default Product
