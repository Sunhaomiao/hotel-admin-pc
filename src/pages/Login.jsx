import React from 'react';
import { Form, Input, Button, Typography, Row, Col, Space, Divider, message, Switch } from 'antd';
import { 
  UserOutlined, LockOutlined, SafetyOutlined, CheckCircleOutlined, 
  GlobalOutlined, CloudServerOutlined, UserAddOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const loginT = {
  en: {
    welcome: "Welcome Back", sub: "Sign in to manage your hotel listings",
    user: "Username", pass: "Password", btn: "Sign In",
    new: "New to the platform?", create: "Create Merchant Account",
    title: "Yi-Su Platform", subtitle: "Professional Hotel Information Management System",
    f1: "Real-time Information Sync", f2: "Merchant & Admin Roles", f3: "Secure Auditing Workflow"
  },
  zh: {
    welcome: "欢迎回来", sub: "登录以管理您的酒店列表",
    user: "用户名", pass: "密码", btn: "登 录",
    new: "新用户？", create: "创建商户账号",
    title: "一宿平台", subtitle: "专业酒店信息管理系统",
    f1: "实时信息同步", f2: "商户与管理员角色", f3: "安全审核工作流"
  }
};

const Login = ({ lang = 'en', setLang = () => {} }) => {
  const navigate = useNavigate();
  const t = loginT[lang] || loginT.en;

  const onFinish = (values) => {
    const role = values.username.toLowerCase().includes('admin') ? 'admin' : 'merchant';
    localStorage.setItem('userRole', role);
    message.success(role === 'admin' ? "Admin Access" : "Merchant Access");
    navigate('/dashboard');
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* FIXED POSITION LANGUAGE BAR - FIXED WIDTH PREVENTS JUMPING */}
      <div style={{ 
        position: 'absolute', top: 20, right: 30, zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.9)', padding: '8px 16px',
        borderRadius: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        width: '120px', display: 'flex', justifyContent: 'center'
      }}>
        <Space>
          <GlobalOutlined style={{ color: '#1890ff' }} />
          <Switch 
            checkedChildren="中" unCheckedChildren="EN" 
            checked={lang === 'zh'} 
            onChange={(checked) => setLang(checked ? 'zh' : 'en')}
          />
        </Space>
      </div>

      <Row style={{ height: '100vh' }}>
        <Col xs={0} md={12} lg={14} style={{ 
          background: 'linear-gradient(135deg, #001529 0%, #003a8c 100%)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 40px'
        }}>
          <div style={{ color: '#fff', textAlign: 'center' }}>
            <GlobalOutlined style={{ fontSize: '80px', color: '#1890ff', marginBottom: '24px' }} />
            <Title level={1} style={{ color: '#fff', fontSize: '3.5rem' }}>{t.title}</Title>
            <Divider style={{ borderColor: 'rgba(255,255,255,0.15)' }} />
            <Space direction="vertical" size="large" style={{ textAlign: 'left' }}>
              <Text style={{ fontSize: '18px', color: '#fff' }}><CheckCircleOutlined style={{ color: '#52c41a' }} /> {t.f1}</Text>
              <Text style={{ fontSize: '18px', color: '#fff' }}><CloudServerOutlined style={{ color: '#1890ff' }} /> {t.f2}</Text>
              <Text style={{ fontSize: '18px', color: '#fff' }}><SafetyOutlined style={{ color: '#faad14' }} /> {t.f3}</Text>
            </Space>
          </div>
        </Col>
        <Col xs={24} md={12} lg={10} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
          <div style={{ width: '100%', maxWidth: '400px', padding: '20px' }}>
            <Title level={2} style={{ textAlign: 'center' }}>{t.welcome}</Title>
            <Form layout="vertical" size="large" onFinish={onFinish}>
              <Form.Item name="username" rules={[{ required: true }]}><Input prefix={<UserOutlined />} placeholder={t.user} /></Form.Item>
              <Form.Item name="password" rules={[{ required: true }]}><Input.Password prefix={<LockOutlined />} placeholder={t.pass} /></Form.Item>
              <Button type="primary" htmlType="submit" block style={{ height: '50px', borderRadius: '8px' }}>{t.btn}</Button>
              <Divider plain>{t.new}</Divider>
              <Button type="default" icon={<UserAddOutlined />} block onClick={() => navigate('/signup')}>{t.create}</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Login;