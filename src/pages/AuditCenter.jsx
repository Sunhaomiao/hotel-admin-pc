import React, { useState } from 'react';
import { Table, Tag, Space, Button, Modal, Input, message, Typography } from 'antd';
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  StopOutlined, 
  ReloadOutlined 
} from '@ant-design/icons';
import { useOutletContext } from 'react-router-dom';

const { Title } = Typography;

// 1. Translation Dictionary
const auditT = {
  en: {
    pageTitle: "Hotel Audit Center",
    colCn: "Hotel Name (CN)",
    colEn: "English Name",
    colStatus: "Status",
    colReason: "Reason",
    colAction: "Action",
    btnApprove: "Approve",
    btnReject: "Reject",
    btnOffline: "Take Offline",
    btnRestore: "Restore",
    modalTitle: "Rejection Reason",
    modalPlaceholder: "Please explain why this hotel listing was rejected...",
    msgSuccess: "Status updated to",
    statusMap: {
      pending: "PENDING",
      approved: "APPROVED",
      rejected: "REJECTED",
      offline: "OFFLINE"
    }
  },
  zh: {
    pageTitle: "酒店审核中心",
    colCn: "酒店名称 (中)",
    colEn: "英文名称",
    colStatus: "状态",
    colReason: "原因",
    colAction: "操作",
    btnApprove: "通过",
    btnReject: "拒绝",
    btnOffline: "下架",
    btnRestore: "重新上架",
    modalTitle: "拒绝原因",
    modalPlaceholder: "请说明拒绝该酒店入驻的原因...",
    msgSuccess: "状态已更新为",
    statusMap: {
      pending: "待审核",
      approved: "已通过",
      rejected: "已拒绝",
      offline: "已下架"
    }
  }
};

const AuditCenter = ({ hotels, setHotels }) => {
  // 2. Access the global language state
  const { lang } = useOutletContext();
  const t = auditT[lang] || auditT.en;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHotelId, setCurrentHotelId] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const updateStatus = (id, newStatus, reason = '') => {
    const updated = hotels.map(h => 
      h.id === id ? { ...h, status: newStatus, reason: reason } : h
    );
    setHotels(updated);
    
    // Translate the success message status
    const translatedStatus = t.statusMap[newStatus];
    message.success(`${t.msgSuccess} ${translatedStatus}`);
    
    setIsModalOpen(false);
    setRejectReason('');
  };

  const columns = [
    { title: t.colCn, dataIndex: 'nameCn', key: 'nameCn' },
    { title: t.colEn, dataIndex: 'nameEn', key: 'nameEn' },
    { 
      title: t.colStatus, 
      dataIndex: 'status', 
      render: (status) => {
        let color = status === 'approved' ? 'green' : status === 'rejected' ? 'red' : 'gold';
        // Dynamically translate the tag text
        return <Tag color={color}>{t.statusMap[status] || status.toUpperCase()}</Tag>;
      } 
    },
    {
      title: t.colReason,
      dataIndex: 'reason',
      render: (text) => text || '-'
    },
    {
      title: t.colAction,
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 'pending' && (
            <>
              <Button type="link" icon={<CheckCircleOutlined />} onClick={() => updateStatus(record.id, 'approved')}>
                {t.btnApprove}
              </Button>
              <Button type="link" danger icon={<CloseCircleOutlined />} onClick={() => {
                setCurrentHotelId(record.id);
                setIsModalOpen(true);
              }}>
                {t.btnReject}
              </Button>
            </>
          )}
          {record.status === 'approved' && (
            <Button danger icon={<StopOutlined />} onClick={() => updateStatus(record.id, 'offline')}>
              {t.btnOffline}
            </Button>
          )}
          {record.status === 'offline' && (
            <Button icon={<ReloadOutlined />} onClick={() => updateStatus(record.id, 'approved')}>
              {t.btnRestore}
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ background: '#fff', padding: 24, borderRadius: 8 }}>
      <Title level={2}>{t.pageTitle}</Title>
      <Table columns={columns} dataSource={hotels} rowKey="id" />

      <Modal 
        title={t.modalTitle} 
        open={isModalOpen} 
        onOk={() => updateStatus(currentHotelId, 'rejected', rejectReason)}
        onCancel={() => setIsModalOpen(false)}
        okText={lang === 'zh' ? '确定' : 'Confirm'}
        cancelText={lang === 'zh' ? '取消' : 'Cancel'}
      >
        <Input.TextArea 
          rows={4} 
          placeholder={t.modalPlaceholder} 
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default AuditCenter;