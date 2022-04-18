import { Button, Col, Divider, Form, Input, Row, Select } from 'antd';
import { useEffect } from 'react';
import { connect } from 'dva';
import ProductItem from './ProductItem';

const Search = (props) => {
  const {
    dispatch,
    category: { category },
    product: { search },
  } = props;
  useEffect(() => {
    dispatch({
      type: 'category/handleGetCategory',
    });
  }, []);
  const onFinish = (value: { category: string; search: string }) => {
    dispatch({
      type: 'product/searchProduct',
      payload: { category: value.category, search: value.search },
    });
  };
  //   console.log(category, search)
  return (
    <>
      <Form
        onFinish={onFinish}
        layout="inline"
        initialValues={{ category: 'All' }}
      >
        <Input.Group compact>
          <Form.Item name="category">
            <Select>
              <Select.Option value="All">所有分类</Select.Option>
              {category.result.map((item) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="search">
            <Input placeholder="请输入搜索关键字" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">搜索</Button>
          </Form.Item>
        </Input.Group>
      </Form>
      <Divider />
      <Row gutter={[16, 16]}>
        {search.map((item) => (
          <Col span="6">
            <ProductItem product={item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default connect(({ category, product }) => ({
  category,
  product,
}))(Search);
