import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm, Pagination } from 'antd';
import axios from 'axios';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { AppRoutes } from '@/Constant/Constant';

export const CampusTable = () => {
  const [campuses, setCampuses] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCampus, setEditingCampus] = useState(null);
  const [form] = Form.useForm();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  // Fetch Campuses
  useEffect(() => {
    axios
      .get(AppRoutes.getCampus)
      .then((response) => {
        setCampuses(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching campuses:', error);
      });
  }, []);

  // Submit Form to Add or Edit Campus
  const onFinish = (values) => {
    if (isEditing && editingCampus) {
      // Update campus
      axios
        .put(`${AppRoutes.updateCampus}${editingCampus._id}`, values)
        .then((response) => {
          const updatedCampus = response.data.data;

          // Update the campus locally in state
          setCampuses(
            campuses.map((campus) =>
              campus._id === updatedCampus._id ? updatedCampus : campus
            )
          );

          message.success('Campus updated successfully!');
          resetForm();
        })
        .catch((error) => {
          console.error('Error updating campus:', error);
          message.error('Failed to update campus.');
        });
    } else {
      // Add new campus
      axios
        .post(AppRoutes.addCampus, values)
        .then((response) => {
          setCampuses([...campuses, response.data.data]);
          message.success('Campus added successfully!');
          resetForm();
        })
        .catch((error) => {
          console.error('Error adding campus:', error);
          message.error('Failed to add campus.');
        });
    }
  };

  const paginatedCampuses = campuses.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Reset Form
  const resetForm = () => {
    form.resetFields();
    setVisible(false);
    setIsEditing(false);
    setEditingCampus(null);
  };

  // Handle Edit
  const handleEdit = (record) => {
    setIsEditing(true);
    setEditingCampus(record);
    setVisible(true);
    form.setFieldsValue({
      title: record.title,
      description: record.description,
    });
  };

  // Handle Delete
  const handleDelete = (id) => {
    axios
      .delete(`${AppRoutes.deleteCampus}${id}`)
      .then(() => {
        setCampuses(campuses.filter((campus) => campus._id !== id));
        message.success('Campus deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting campus:', error);
        message.error('Failed to delete campus.');
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold">Campuses</div>
        <Button
          type="primary"
          onClick={() => setVisible(true)}
          className="rounded-lg shadow-lg bg-[#0561a6] text-white hover:text-blue-700"
        >
          {isEditing ? 'Edit Campus' : 'Add Campus'}
        </Button>
      </div>

      {/* Render Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {paginatedCampuses.map((campus) => (
          <div
            key={campus._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-500 ease-in-out flex flex-col"
          >
            <div className="p-6 flex-grow text-gray-800">
              <h3 className="text-2xl font-semibold mb-4 text-[#0561a6] hover:text-blue-700 transition-all duration-300">
                {campus.title}
              </h3>
              <p className="text-sm mb-4 text-[#0561a6] font-light opacity-80">
                {campus.description}
              </p>
            </div>

            <div className="p-4 border-t border-[#0561a6] flex justify-between items-center bg-gray-50">
              <div className="text-sm text-gray-600">Campus</div>
              <div className="flex items-center space-x-4">
                <EditFilled
                  className="text-[#0561a6] hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-110"
                  onClick={() => handleEdit(campus)}
                />
                <Popconfirm
                  title="Are you sure to delete this batch?"
                  onConfirm={() => handleDelete(campus._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteFilled className="text-red-500 hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-110" />
                </Popconfirm>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={campuses.length}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: "20px", textAlign: "center" }}
      />

      {/* Modal for Adding/Editing Campuses */}
      <Modal
        title={isEditing ? 'Edit Campus' : 'Add Campus'}
        visible={visible}
        onCancel={resetForm}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="title"
            label="Campus Title"
            rules={[{ required: true, message: 'Please enter a campus title!' }]}
          >
            <Input placeholder="Enter campus title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description!' }]}
          >
            <Input.TextArea placeholder="Enter campus description" rows={4} />
          </Form.Item>

          <Form.Item>
            <Button type="primary"
              className='rounded-lg shadow-lg bg-[#0561a6] text-white hover:text-blue-700'
              htmlType="submit" block>
              {isEditing ? 'Update Campus' : 'Add Campus'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
