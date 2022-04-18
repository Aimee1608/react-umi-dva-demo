import { Button, Col, Empty, Row, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import Layout from './../components/Layout';
import ProductItem from './../components/ProductItem';
import { connect } from 'dva';
import RadioBox from '@/components/RadioBox';
import CheckBox from '@/components/CheckBox';

const Shop = ({ dispatch, product }) => {
  //   console.log('shop----->', product)
  const [skip, setSkip] = useState<number>(0);

  const [myFilters, setMyFilter] = useState<{
    category: string[];
    price: number[];
  }>({ category: [], price: [] });

  useEffect(() => {
    setSkip(0);
  }, [myFilters]);

  useEffect(() => {
    dispatch({
      type: 'product/filterProduct',
      payload: {
        filter: myFilters,
        skip,
      },
    });
  }, [myFilters, skip]);

  const filterDOM = () => (
    <Space size="middle" direction="vertical">
      <CheckBox
        handleFilter={(filters: string[]) => {
          setMyFilter({ ...myFilters, category: filters });
        }}
      />
      <RadioBox
        handleFilter={(filters: number[]) => {
          setMyFilter({ ...myFilters, price: filters });
        }}
      />
    </Space>
  );

  const productDOM = () => (
    <Row gutter={[16, 16]}>
      {product.filter.result.data.map((item) => (
        <Col key={item._id} span="6">
          <ProductItem product={item} />
        </Col>
      ))}
    </Row>
  );

  const loadMoreButton = () => {
    return (
      <Row>
        {product.filter.result.size >= 4 && (
          <Button onClick={loadMore}>加载更多</Button>
        )}
      </Row>
    );
  };

  const loadMore = () => {
    setSkip(skip + 4);
  };

  const noData = () => {
    return <Row>{product.filter.result.size === 0 && <Empty />}</Row>;
  };

  return (
    <Layout title="aimee商城" subTitle="挑选你喜欢的商品吧">
      <Row>
        <Col span="4">{filterDOM()}</Col>
        <Col span="20">
          {productDOM()} {loadMoreButton()} {noData()}
        </Col>
      </Row>
    </Layout>
  );
};

export default connect(({ product }) => ({ product }))(Shop);
