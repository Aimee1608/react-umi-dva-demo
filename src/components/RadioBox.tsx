import { List, Radio, Typography } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { connect } from 'dva';
import prices from './../utils/price';
const { Title } = Typography;

interface Props {
  handleFilter: (arg: number[]) => void;
}

const RadioBox: FC<Props> = ({ handleFilter }) => {
  const onChange = (event: RadioChangeEvent) => {
    handleFilter(event.target.value);
  };

  return (
    <>
      <Title level={4}>按照价格筛选</Title>
      <Radio.Group>
        <List
          dataSource={prices}
          renderItem={(item) => (
            <List.Item>
              <Radio onChange={onChange} value={item.array}>
                {item.name}
              </Radio>
            </List.Item>
          )}
        />
      </Radio.Group>
    </>
  );
};

export default connect()(RadioBox);
