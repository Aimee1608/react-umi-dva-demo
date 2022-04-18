import { Button, Card, Col, Image, Row, Typography } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import { Link, history } from 'umi';
import { addItem } from './../utils/cart';

const { Title, Paragraph } = Typography;

const ProductItem = ({
  product,
  showViewProduct = true,
  showCartBtn = true,
  dispatch,
}) => {
  // console.log('ProductItem--->', product)
  const addToCart = () => {
    addItem(product, () => {
      dispatch(history.push('/cart'));
    });
  };

  const showButtons = () => {
    let buttonArray = [];
    if (showViewProduct)
      buttonArray.push(
        <Button type="link">
          <Link to={`/product/${product._id}`}>查看详情</Link>
        </Button>,
      );
    if (showCartBtn) {
      buttonArray.push(
        <Button type="link" onClick={addToCart}>
          加入购物车
        </Button>,
      );
    }
    return buttonArray;
  };

  return (
    <Card
      cover={
        <Image
          src={'data:image/png;base64,' + product.photo}
          alt={product.name}
        />
      }
      actions={showButtons()}
    >
      <Title level={5}>{product.name}</Title>
      <Paragraph ellipsis={{ rows: 2 }}>{product.description}</Paragraph>
      <Row>
        <Col span="12">销量: {product.sold}</Col>
        <Col span="12" style={{ textAlign: 'right' }}>
          价格: {product.price}
        </Col>
      </Row>
      <Row>
        <Col span="12">
          上架时间: {moment(product.createdAt).format('YYYY-MM-DD')}
        </Col>
        <Col span="12" style={{ textAlign: 'right' }}>
          所属分类: {product.category.name}
        </Col>
      </Row>
    </Card>
  );
};

export default connect()(ProductItem);
