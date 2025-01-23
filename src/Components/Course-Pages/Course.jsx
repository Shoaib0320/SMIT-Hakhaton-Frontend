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
import { uploadCourseImage } from "../Upload Images/UploadCourseImage";

export const Course = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewDrawerVisible, setViewDrawerVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [viewingCourse, setViewingCourse] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(AppRoutes.getCourses);
      if (!response.ok) throw new Error("Failed to fetch courses");
      const data = await response.json();
      setCourses(data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      message.error("Failed to fetch courses");
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      const response = await fetch(`${AppRoutes.deleteCourse}/${courseId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete course");
      message.success("Course deleted successfully");
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
      message.error("Failed to delete course");
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
    setViewingCourse(course);
    setViewDrawerVisible(true);
  };

  const closeViewDrawer = () => {
    setViewDrawerVisible(false);
    setViewingCourse(null);
  };

  const handleAddCourse = async (values) => {
    setLoading(true);
    try {
      const uploadedImageUrl = await uploadCourseImage(
        fileList[0]?.originFileObj
      );
      if (!uploadedImageUrl) throw new Error("Image upload failed");

      const courseData = { ...values, thumbnail: uploadedImageUrl };

      const response = await fetch(AppRoutes.addCourse, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) throw new Error("Failed to add course");
      message.success("Course added successfully");
      fetchCourses();
      closeDrawer();
    } catch (error) {
      console.error("Error adding course:", error);
      message.error("Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCourse = async (values) => {
    setLoading(true);
    try {
      const uploadedImageUrl = fileList[0]?.originFileObj
        ? await uploadCourseImage(fileList[0].originFileObj)
        : editingCourse.thumbnail;

      const updatedCourse = { ...values, thumbnail: uploadedImageUrl };

      const response = await fetch(
        `${AppRoutes.updateCourse}/${editingCourse._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCourse),
        }
      );

      if (!response.ok) throw new Error("Failed to update course");
      message.success("Course updated successfully");
      fetchCourses();
      closeModal();
    } catch (error) {
      console.error("Error updating course:", error);
      message.error("Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  const paginatedCourses = courses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1>Courses</h1>
        <Button type="primary"
          className="rounded-lg shadow-lg bg-[#0561a6] text-white hover:text-blue-700"
          onClick={showDrawer}>Add Course</Button>
      </div>

      <Row gutter={[16, 16]}>
        {paginatedCourses.map((course) => (
          <Col xs={24} sm={12} md={8} lg={8} key={course._id}>
            <Card
              hoverable
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-500 ease-in-out flex flex-col"
              cover={
                <img
                  alt="thumbnail"
                  src={course.thumbnail}
                  className="h-48 object-cover rounded-t-lg"
                />
              }
              actions={[
                <EyeOutlined onClick={() => showViewDrawer(course)} key="view" style={{ color: "#0561a6" }} />,
                <EditFilled onClick={() => showEditModal(course)} key="edit" style={{ color: "#0561a6" }} />,
                <Popconfirm
                  title="Are you sure to delete this course?"
                  onConfirm={() => deleteCourse(course._id)}
                  okText="Yes"
                  cancelText="No"
                  key="delete"
                >
                  <DeleteFilled style={{ color: "red" }} />
                </Popconfirm>,
              ]}
            >
              <Card.Meta
                title={<h3 className="text-2xl font-serif mb-4 text-[#0561a6] hover:text-blue-700 transition-all duration-300">{course.title}</h3>}
                description={<p className="text-sm text-gray-500">Duration: {course.duration}</p>}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={courses.length}
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
        {viewingCourse && (
          <div className="space-y-4">
            <p><strong>Title:</strong> {viewingCourse.title}</p>
            <p><strong>Description:</strong> {viewingCourse.description}</p>
            <p><strong>Duration:</strong> {viewingCourse.duration} </p>
            <img src={viewingCourse.thumbnail} alt="Thumbnail" style={{ width: "100%", borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }} />
          </div>
        )}
      </Drawer>

      {/* Drawer for adding course */}
      <Drawer
        title="Add New Course"
        width={400}
        onClose={closeDrawer}
        visible={drawerVisible}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddCourse}>
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input placeholder="Enter course title" />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true }]}>
            <Input.TextArea placeholder="Enter course description" />
          </Form.Item>
          <Form.Item label="Duration (hours)" name="duration" rules={[{ required: true }]}>
            <Input placeholder="Enter duration" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Thumbnail Image" name="thumbnail" rules={[{ required: true }]}>
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Button type="primary"
            className="rounded-lg shadow-lg bg-[#0561a6] text-white hover:text-blue-700"
            htmlType="submit" loading={loading} block>
            Add Course
          </Button>
        </Form>
      </Drawer>

      <Modal
        title={<span style={{ fontSize: '20px', fontWeight: 'bold', color: '#0561a6' }}>Edit Course</span>}
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
        bodyStyle={{ padding: '20px', borderRadius: '10px', background: '#f9f9f9' }}
        style={{ borderRadius: '10px', overflow: 'hidden' }}
      >
        <Form
          form={form}
          onFinish={handleUpdateCourse}
          layout="vertical"
          style={{ maxWidth: '100%' }}
        >
          <Form.Item
            label={<span style={{ fontWeight: '500' }}>Title</span>}
            name="title"
            rules={[{ required: true, message: 'Please enter the title!' }]}
          >
            <Input placeholder="Enter course title" style={{ padding: '10px', borderRadius: '8px' }} />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: '500' }}>Description</span>}
            name="description"
          >
            <Input.TextArea
              placeholder="Enter course description"
              style={{ padding: '10px', borderRadius: '8px' }}
              rows={4}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ fontWeight: '500' }}>Duration</span>}
            name="duration"
            rules={[{ required: true, message: 'Please enter the duration!' }]}
          >
            <Input placeholder="Enter course Duration" style={{ padding: '10px', borderRadius: '8px' }} />
          </Form.Item>

          <Form.Item label={<span style={{ fontWeight: '500' }}>Thumbnail Image</span>}>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
            {editingCourse?.thumbnail && !fileList.length && (
              <img
                src={editingCourse.thumbnail}
                alt="Thumbnail"
                style={{ width: '100%', marginTop: '10px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
              />
            )}
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
            Update Course
          </Button>
        </Form>
      </Modal>

    </>
  );
};
