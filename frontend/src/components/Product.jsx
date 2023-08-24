import Card from 'react-bootstrap/Card';
import products from '../products';

const Product = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <a href={`/products/${products._id}`}>
        <Card.Img variant="top" src={product.image} />
      </a>
      <Card.Body>
        <Card.Title as='div'>
            <strong>{product.name}</strong>
        </Card.Title>
        <Card.Text as='h3'>
            ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;