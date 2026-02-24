import { Button, ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
      <div style={{ padding: '50px' }}>
        <h1>Hotel Admin System</h1>
        <Button type="primary">Test Ant Design Button</Button>
      </div>
    </ConfigProvider>
  );
}

export default App;