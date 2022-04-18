import { Col, Row } from 'antd';
import { useEffect } from 'react';
import Layout from './../components/Layout';
import ProductItem from './../components/ProductItem';
import { connect } from 'dva';
import { useParams } from 'umi';

const Product = ({ dispatch, product: { product } }) => {
  const { productId } = useParams<{ productId: string }>();
  console.log('product---->', product, productId);
  useEffect(() => {
    dispatch({
      type: 'product/getProductById',
      payload: {
        productId,
      },
    });
  }, []);
  return (
    <Layout title="商品名称" subTitle="商品描述">
      <Row gutter={36}>
        <Col span="18">
          <ProductItem showViewProduct={false} product={product.result} />
        </Col>
        <Col span="6">right</Col>
      </Row>
    </Layout>
  );
};

export default connect(({ product }) => ({ product }))(Product);
