import React, { useState, useEffect } from 'react';
import { Drawer, Input, Select, Form, Space, Modal, Tag, Button, Card, Pagination } from 'antd';
import { DeleteFilled, EditFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { AppRoutes } from '@/Constant/Constant';

export const Section = () => {
  const [visible, setVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalSections, setTotalSections] = useState(0); // Added state for total sections

  const { confirm } = Modal;

  // Fetch courses when component mounts
  useEffect(() => {
    axios.get(AppRoutes.getCourses)
      .then(response => {
        if (Array.isArray(response.data.data)) {
          setCourses(response.data.data);
        } else {
          console.error("Error: Courses data is not an array", response.data);
        }
      })
      .catch(error => console.error("Error fetching courses:", error));
  }, []);

  // Fetch table data (sections)
  useEffect(() => {
    fetchSections(selectedCourse, selectedBatch);
  }, [selectedCourse, selectedBatch]); // Updated dependency array

  // Fetch batches based on selected course
  const fetchBatches = (courseId) => {
    if (courseId) {
      axios.get(AppRoutes.getBatch)
        .then(response => {
          if (Array.isArray(response.data.data)) {
            const filteredBatches = response.data.data.filter(batch => batch.course && batch.course._id === courseId);
            setBatches(filteredBatches);
          } else {
            console.error("Error: Batches data is not an array", response.data);
          }
        })
        .catch(error => console.error("Error fetching batches:", error));
    }
  };

  // Updated fetchSections function
  const fetchSections = (courseId, batchId) => {
    setLoading(true);
    let url = AppRoutes.getSections;
    if (courseId) {
      url += `?course=${courseId}`;
      if (batchId) {
        url += `&batch=${batchId}`;
      }
    }

    axios
      .get(url)
      .then((response) => {
        const fetchedSections = response.data;
        console.log('Fetched sections:', fetchedSections);
        setTableData(fetchedSections);
        setTotalSections(fetchedSections.length);
        setTotalCount(fetchedSections.length);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Sections:", error);
        setLoading(false);
      });
  };


  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  const handleSubmit = (values) => {
    if (editingRecord) {
      // Update section if editing
      axios.put(`${AppRoutes.updateSection}${editingRecord._id}`, values)
        .then(response => {
          const updatedSection = response.data;
          const updatedTableData = tableData.map(item =>
            item._id === updatedSection._id ? updatedSection : item
          );
          setTableData(updatedTableData);
          setEditModalVisible(false);
        })
        .catch(error => console.error('Error updating section:', error));
    } else {
      // Create new section if not editing
      const newSection = {
        title: values.title,
        description: values.description,
        course: values.course,
        batch: values.batch,
        status: values.status,
      };

      axios.post(AppRoutes.addSection, newSection)
        .then(response => {
          setTableData([...tableData, { ...newSection, key: tableData.length + 1 }]);
          setVisible(false);
        })
        .catch(error => console.error('Error adding section:', error));
    }
    form.resetFields();
    editForm.resetFields();
  };

  // Get paginated sections
  const paginatedSections = tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleEdit = (record) => {
    setEditingRecord(record);
    setSelectedCourse(record.course._id);
    setSelectedBatch(record.batch._id);
    editForm.setFieldsValue({
      title: record.title,
      description: record.description,
      course: record.course._id,
      batch: record.batch._id,
      status: record.status,
    });
    fetchBatches(record.course._id); // Fetch batches for the selected course
    setEditModalVisible(true);
  };

  const confirmDelete = (sectionId) => {
    confirm({
      title: 'Are you sure you want to delete this section?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleDelete(sectionId);
      },
    });
  };

  const handleDelete = (sectionId) => {
    axios.delete(`${AppRoutes.deleteSection}${sectionId}`)
      .then(() => {
        setTableData(tableData.filter(item => item._id !== sectionId));
      })
      .catch(error => console.error('Error deleting section:', error));
  };

  const renderForm = (formInstance) => (
    <Form form={formInstance} onFinish={handleSubmit} layout="vertical">
      <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the title!' }]} >
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Course" name="course" rules={[{ required: true, message: 'Please select a course!' }]}>
        <Select value={selectedCourse} onChange={(value) => {
          setSelectedCourse(value);
          fetchBatches(value); // Fetch batches when course changes
          formInstance.setFieldsValue({ batch: null }); // Reset batch field
        }}>
          {courses.map(course => (
            <Select.Option key={course._id} value={course._id}>{course.title}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      {selectedCourse && (
        <Form.Item label="Batch" name="batch" rules={[{ required: true, message: 'Please select a batch!' }]}>
          <Select value={selectedBatch} onChange={(value) => setSelectedBatch(value)}>
            {batches.map(batch => (
              <Select.Option key={batch._id} value={batch._id}>{batch.title}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
      <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select a status!' }]}>
        <Select>
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="ongoing">Ongoing</Select.Option>
          <Select.Option value="finished">Finished</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <h2 className="font-bold text-xl sm:text-2xl">Section</h2>
        <div className="flex flex-wrap items-center">
          {/* Course Filter */}
          <Form.Item name="courseFilter" className="w-full sm:w-auto">
            <Select
              placeholder="Select a Course"
              style={{ width: "200px" }}
              value={selectedCourse}
              onChange={(value) => {
                setSelectedCourse(value);
                setSelectedBatch(null);
                fetchBatches(value);
                fetchSections(value, null);
              }}
              allowClear
              className="w-full"
            >
              {courses.map(course => (
                <Select.Option key={course._id} value={course._id}>
                  {course.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Batch Filter (Only Show if a Course is Selected) */}
          {selectedCourse && (
            <Form.Item name="batchFilter" className="w-full sm:w-auto">
              <Select
                placeholder="Select a Batch"
                style={{ width: "200px" }}
                value={selectedBatch}
                onChange={(value) => {
                  setSelectedBatch(value);
                  fetchSections(selectedCourse, value);
                }}
                allowClear
                className="w-full"
              >
                {batches.map(batch => (
                  <Select.Option key={batch._id} value={batch._id}>
                    {batch.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </div>

        {/* Add Section Button */}
        <Button
          type="primary"
          className="rounded-lg shadow-lg bg-[#0561a6] text-white hover:text-blue-700"
          onClick={showDrawer}
        >
          Add Section
        </Button>
      </div>

      <div className="mb-4">
        <span className="font-bold">Total Sections: {totalSections}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {paginatedSections.map((section) => (
          <div
            key={section._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-500 ease-in-out flex flex-col"
          >
            <div className="p-6 flex-grow text-gray-800">
              <h3 className="text-2xl font-semibold mb-4 text-[#0561a6] hover:text-blue-700 transition-all duration-300">
                {section.title}
              </h3>
              <p className="text-sm mb-4 font-light opacity-80">
                {section.description}
              </p>
              <p className="text-sm mb-4 font-bold opacity-80">
               Total Student: {section.studentCount}
              </p>
              <p className="text-sm text-[#0561a6]">
                Course:{" "}
                {section.course ? (
                  <span className="font-medium">{section.course.title}</span>
                ) : (
                  "N/A"
                )}
              </p>
              <p className="text-sm mt-2 text-[#0561a6]">
                Batch:{" "}
                {section.batch ? (
                  <span className="font-medium">{section.batch.title}</span>
                ) : (
                  "N/A"
                )}
              </p>
            </div>

            <div className="p-4 border-t border-[#0561a6] flex justify-between items-center bg-gray-50">
              <div className="text-sm text-gray-600">Section</div>
              <div className="flex items-center space-x-4">
                <EditFilled
                  className="text-[#0561a6] hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-110"
                  onClick={() => handleEdit(section)}
                />
                <DeleteFilled onClick={() => confirmDelete(section._id)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalSections}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: 16, textAlign: 'center' }}
      />
      <Drawer
        title="Add Section"
        width={500}
        visible={visible}
        onClose={onClose}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button onClick={onClose} style={{ marginRight: 8 }}>Cancel</Button>
            <Button onClick={() => form.submit()}
              className="rounded-lg shadow-lg bg-[#0561a6] text-white hover:text-blue-700"
              type="primary">Submit</Button>
          </div>
        }
      >
        {renderForm(form)}
      </Drawer>
      <Modal
        title="Edit Section"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setEditModalVisible(false)}>Cancel</Button>,
          <Button key="submit" type="primary"
            className="rounded-lg shadow-lg bg-[#0561a6] text-white hover:text-blue-700"

            onClick={() => editForm.submit()}>Update</Button>,
        ]}
      >
        {renderForm(editForm)}
      </Modal>
    </div>
  );
};

