import { Col, Row, Typography } from 'antd';
import { useEffect } from 'react';
import { connect } from 'dva';
import Layout from './../components/Layout';
import Search from './../components/Search';
import ProductItem from '@/components/ProductItem';
const { Title } = Typography;
function Home(props) {
  const {
    product: { createdAt, sold },
    dispatch,
  } = props;

  useEffect(() => {
    dispatch({
      type: 'product/getProduct',
      payload: {
        sortBy: 'createdAt',
      },
    });
    dispatch({
      type: 'product/getProduct',
      payload: {
        sortBy: 'sold',
      },
    });
  }, []);

  return (
    <div>
      <Layout title="aimee电商" subTitle="欢迎来到aimee电商, 尽情享受吧">
        <Search />
        <Title level={5}>最新上架</Title>
        <Row gutter={[16, 16]}>
          {createdAt.products.map((item) => (
            <Col key={item._id} span="6">
              <ProductItem product={item} />
            </Col>
          ))}
        </Row>
        <Title level={5}>最受欢迎</Title>
        <Row gutter={[16, 16]}>
          {sold.products.map((item) => (
            <Col key={item._id} id={item._id} span="6">
              <ProductItem product={item} />
            </Col>
          ))}
        </Row>
      </Layout>
    </div>
  );
}

export default connect(({ product }) => ({ product }))(Home);
