import { Button, Image, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { URL_BASE_LOCAL } from '../constants/Config';
import noImage from '../assets/img/no-image.png';


export const getColumnSearchProps = dataIndex => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={`Buscar ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Buscar
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reiniciar
        </Button>
      </Space>
    </div>
  ),
  filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
  onFilter: (value, record) =>
    record[dataIndex]
      ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
      : '',
});

const handleSearch = (selectedKeys, confirm, dataIndex) => confirm();
const handleReset = clearFilters => clearFilters();


export function ImageDemo(url) {

  if (url) {
    return (
      <Button type="link"
        style={{ margin: 0, padding: 0 }}>
        <Image
          width={40}
          height={30}
          src={URL_BASE_LOCAL + '/' + url}

        />
      </Button>
    );
  } else {
    return (
      <Button type="link"
        style={{ margin: 0, padding: 0 }}>
        <Image
          width={40}
          height={30}
          src="error"
          fallback={noImage}
        />
      </Button>
    );
  }

}
