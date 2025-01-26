import React, { useState, useEffect } from "react";
import {
  Button,
  Drawer,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Card,
  Row,
  Col,
  Popconfirm,
  Pagination,
} from "antd";
import {
  DeleteFilled,
  EditFilled,
  UploadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import styles from "../../Styles/styles.module.css";
import { AppRoutes } from "@/Constant/Constant";

export const Categories = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewDrawerVisible, setViewDrawerVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [viewingCategory, setViewingCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await fetch(AppRoutes.getCategoriesWithSubCategories);
      if (!response.ok) throw new Error("Failed to fetch category");
      console.log();
      
      const data = await response.json();
      setCategory(data.data);
    } catch (error) {
      console.error("Error fetching category:", error);
      message.error("Failed to fetch category");
    }
  };

  const deleteCategory = async (courseId) => {
    try {
      const response = await fetch(`${AppRoutes.deleteCategory}/${courseId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete category");
      message.success("Category deleted successfully");
      fetchCategory();
    } catch (error) {
      console.error("Error deleting category:", error);
      message.error("Failed to delete category");
    }
  };

  const showDrawer = () => setDrawerVisible(true);

  const closeDrawer = () => {
    setDrawerVisible(false);
    setFileList([]);
  };

  const showEditModal = (course) => {
    setEditingCourse(course);
    form.setFieldsValue(course);
    setFileList([]);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingCourse(null);
    setFileList([]);
  };

  const handleFileChange = (info) => {
    setFileList(

      info.fileList.map((file) => ({
        ...file,
        preview: URL.createObjectURL(file.originFileObj),
      }))
    );
  };

  const showViewDrawer = (course) => {
    setViewingCategory(course);
    setViewDrawerVisible(true);
  };

  const closeViewDrawer = () => {
    setViewDrawerVisible(false);
    setViewingCategory(null);
  };

  const handleAddCategory = async (values) => {
    setLoading(true);
    try {
      // const uploadedImageUrl = await uploadCourseImage(
      //   fileList[0]?.originFileObj
      // );
      // if (!uploadedImageUrl) throw new Error("Image upload failed");

      const categoryData = { ...values, };

      const response = await fetch(AppRoutes.addCategory, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) throw new Error("Failed to add Category");
      message.success("Category added successfully");
      fetchCategory();
      closeDrawer();
    } catch (error) {
      console.error("Error adding Category:", error);
      message.error("Failed to add Category");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async (values) => {
    setLoading(true);
    try {
      const updatedCategory = { ...values, };

      const response = await fetch(
        `${AppRoutes.updateCategory}/${editingCourse._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCategory),
        }
      );

      if (!response.ok) throw new Error("Failed to update category");
      message.success("Category updated successfully");
      fetchCategory();
      closeModal();
    } catch (error) {
      console.error("Error updating category:", error);
      message.error("Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  const paginatedCategory = category.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1>Categories</h1>
        <Button type="primary"
          className="rounded-lg shadow-lg bg-[#0561a6] text-white hover:text-blue-700"
          onClick={showDrawer}>Add Category</Button>
      </div>

      <Row gutter={[16, 16]}>
        {paginatedCategory.map((category) => (
          <Col xs={24} sm={12} md={8} lg={8} key={category._id}>
            <Card
              hoverable
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-500 ease-in-out flex flex-col"
              actions={[
                <EyeOutlined onClick={() => showViewDrawer(category)} key="view" style={{ color: "#0561a6" }} />,
                <EditFilled onClick={() => showEditModal(category)} key="edit" style={{ color: "#0561a6" }} />,
                <Popconfirm
                  title="Are you sure to delete this course?"
                  onConfirm={() => deleteCategory(category._id)}
                  okText="Yes"
                  cancelText="No"
                  key="delete"
                >
                  <DeleteFilled style={{ color: "red" }} />
                </Popconfirm>,
              ]}
            >
              <Card.Meta
                title={<h3 className="text-2xl font-serif mb-4 text-[#0561a6] hover:text-blue-700 transition-all duration-300">{category.title}</h3>}
                maxloan={<p className="text-sm text-gray-500">Duration: {category.maxLoan}</p>}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={category.length}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: "20px", textAlign: "center" }}
      />

      <Drawer
        title="Course Details"
        width={400}
        onClose={closeViewDrawer}
        visible={viewDrawerVisible}
        className="p-4 bg-white rounded-lg shadow-lg"
      >
        {viewingCategory && (
          <div className="space-y-4">
            <p><strong>Title:</strong> {viewingCategory.title}</p>
            <p><strong>Description:</strong> {viewingCategory.description}</p>
            <p><strong>MaxLoan:</strong> {viewingCategory.maxloan}</p>
            <p><strong>Loan Period:</strong> {viewingCategory.loanPeriod}</p>
          </div>
        )}
      </Drawer>

      {/* Drawer for adding course */}
      <Drawer
        title="Add New Category"
        width={400}
        onClose={closeDrawer}
        visible={drawerVisible}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddCategory}>
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input placeholder="Enter category title" />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true }]}>
            <Input.TextArea placeholder="Enter category description" />
          </Form.Item>
          <Form.Item label="MaxLoan" name="maxLoan" rules={[{ required: true }]}>
            <Input placeholder="Enter maxLoan" />
          </Form.Item>
          <Form.Item label="Loan Period" name="loanPeriod" rules={[{ required: true }]}>
            <Input placeholder="Enter loanPeriod" />
          </Form.Item>
          <Button type="primary"
            className="rounded-lg shadow-lg bg-[#0561a6] text-white hover:text-blue-700"
            htmlType="submit" loading={loading} block>
            Add Category
          </Button>
        </Form>
      </Drawer>

      <Modal
        title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#0561a6' }}>Edit Category</span>}
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
        bodyStyle={{ padding: '20px', borderRadius: '10px', background: '#f9f9f9' }}
        style={{ borderRadius: '10px', overflow: 'hidden' }}
      >
        <Form
          form={form}
          onFinish={handleUpdateCategory}
          layout="vertical"
          style={{ maxWidth: '100%' }}
        >
          <Form.Item
            label={<span style={{ fontWeight: '500' }}>Title</span>}
            name="title"
            rules={[{ required: true, message: 'Please enter the title!' }]}
          >
            <Input placeholder="Enter category title" style={{ padding: '10px', borderRadius: '8px' }} />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: '500' }}>Description</span>}
            name="description"
          >
            <Input.TextArea
              placeholder="Enter category description"
              style={{ padding: '10px', borderRadius: '8px' }}
              rows={4}
            />
          </Form.Item>

          <Form.Item label="MaxLoan" name="maxLoan" rules={[{ required: true }]}>
            <Input placeholder="Enter maxLoan" />
          </Form.Item>
          <Form.Item label="Loan Period" name="loanPeriod" rules={[{ required: true }]}>
            <Input placeholder="Enter loanPeriod" />
          </Form.Item>

          <Button
            htmlType="submit"
            // className="rounded-lg shadow-lg bg-[#0561a6] text-white hover:text-blue-700"
            style={{
              background: '#0561a6',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: '500',
              width: '100%',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            Update Category
          </Button>
        </Form>
      </Modal>
    </>
  );
};
