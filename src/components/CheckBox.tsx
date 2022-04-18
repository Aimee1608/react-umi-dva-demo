import React, { useEffect, FC } from 'react';
import { List, Typography, Checkbox as AntdCheckbox } from 'antd';
import { connect } from 'dva';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
const { Title } = Typography;

interface Props {
  handleFilter: (arg: string[]) => void;
}

const Checkbox: FC<Props> = ({ handleFilter, dispatch, category }) => {
  // console.log('Checkbox---->', category)
  useEffect(() => {
    dispatch({ type: 'category/handleGetCategory' });
  }, []);

  const onChange = (checkedValue: CheckboxValueType[]) => {
    handleFilter(checkedValue as string[]);
  };

  return (
    <>
      <Title level={4}>按照分类筛选</Title>
      <AntdCheckbox.Group
        className="checkBoxFilter"
        options={category.category.result.map((item) => ({
          label: item.name,
          value: item._id,
        }))}
        onChange={onChange}
      />
    </>
  );
};

export default connect(({ category }) => ({ category }))(Checkbox);
