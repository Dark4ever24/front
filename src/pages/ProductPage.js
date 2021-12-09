import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'

const ProductPage = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id))
      dispatch({ type:"PRODUCT_CREATE_REVIEW_RESET" })
    }
  }, [dispatch, match, successProductReview])

  const submitHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }


  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
      <Col md ={6} >
    <Image src = {product.image}   alt={product.name} fluid />
      </Col>

      <Col md ={3}  >
      <ListGroup variant='flush'>
             <ListGroup.Item>
               <h3>{product.name}</h3>
             </ListGroup.Item>
             <ListGroup.Item>
               <Rating
                 value={product.rating}
                 text={`${product.reviews} reviews`}
               />
             </ListGroup.Item>
             <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
             <ListGroup.Item>
               Description: {product.description}
             </ListGroup.Item>
           </ListGroup>
      </Col>
      <Col md ={3} >
      <Card>
          <ListGroup variant = "flush" >
         <Row>
             <Col>
             price
             </Col>
             <Col>
             <strong>${product.price}</strong>
             </Col>
         </Row>
          </ListGroup>

          <ListGroup variant = "flush" >
         <Row>
             <Col>
             status
             </Col>
             <Col>
{
product. qtyInstock > 0 ? 'in stock' : 'out of stock'
}
</Col> 
         </Row>


             {product.qtyInstock > 0  && (
               <ListGroup.Item>
                 <Row>
                   <Col>
                   qty
                   </Col>
                   <Col>
                   <Form.Control as="select" value = {qty} onChange={(e)=>setQty(e.target.value)} >
                     { [...Array(product.qtyInstock).keys()].map(y => (
                        <option key = {y +1}  value={y +1}>{y+1}</option>
                      ))}
                   </Form.Control>
                   </Col>
                 </Row>
               </ListGroup.Item>
             ) }

         <ListGroup.Item>
             <Button   onClick={submitHandler}     className = "btn-block "  type = 'button' 
             disabled ={product.qtyInstock < 0}  >
                 add to cart
             </Button>
         </ListGroup.Item>
          </ListGroup>

          </Card>
      </Col>
  </Row>

        </>
      )}
    </>
  )
}

export default ProductPage
