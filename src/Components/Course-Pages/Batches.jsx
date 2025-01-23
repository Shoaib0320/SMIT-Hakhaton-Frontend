// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form, Input, Select, Tag, Space, message, Popconfirm, Card, Pagination, Row, Col } from 'antd';
// import axios from 'axios';
// import { DeleteFilled, EditFilled } from '@ant-design/icons';
// import { AppRoutes } from '@/Constant/Constant';

// const { Option } = Select;

// export const Batches = () => {
//   const [batches, setBatches] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [visible, setVisible] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingBatch, setEditingBatch] = useState(null);
//   const [form] = Form.useForm();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(3);
//   const [selectedCourse, setSelectedCourse] = useState(null);

//   // Fetch Batches
//   const fetchBatches = (courseId = null) => {
//     const url = courseId
//       ? `${AppRoutes.getBatch}?course=${courseId}`
//       : AppRoutes.getBatch;

//     axios
//       .get(url)
//       .then((response) => {
//         setBatches(response.data.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching batches:', error);
//       });
//   };

//   useEffect(() => {
//     fetchBatches();
//   }, []);


//   // Fetch Courses
//   useEffect(() => {
//     axios
//       .get(AppRoutes.getCourses)
//       .then((response) => {
//         setCourses(response.data.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching courses:', error);
//       });
//   }, []);

//   // Submit Form to Add or Edit Batch
//   const onFinish = (values) => {
//     if (isEditing && editingBatch) {
//       // Update batch
//       axios
//         .put(`${AppRoutes.updateBatch}${editingBatch._id}`, values)
//         .then((response) => {
//           const updatedBatch = response.data.data;

//           // Update the batch locally in state
//           setBatches(
//             batches.map((batch) =>
//               batch._id === updatedBatch._id ? updatedBatch : batch
//             )
//           );

//           message.success('Batch updated successfully!');
//           resetForm();
//         })
//         .catch((error) => {
//           console.error('Error updating batch:', error);
//           message.error('Failed to update batch.');
//         });
//     } else {
//       // Add new batch
//       axios
//         .post(AppRoutes.addBatch, values)
//         .then((response) => {
//           setBatches([...batches, response.data.data]);
//           message.success('Batch added successfully!');
//           resetForm();
//         })
//         .catch((error) => {
//           console.error('Error adding batch:', error);
//           message.error('Failed to add batch.');
//         });
//     }
//   };

//   // Reset Form
//   const resetForm = () => {
//     form.resetFields();
//     setVisible(false);
//     setIsEditing(false);
//     setEditingBatch(null);
//   };

//   // Handle Edit
//   const handleEdit = (record) => {
//     setIsEditing(true);
//     setEditingBatch(record);
//     setVisible(true);
//     form.setFieldsValue({
//       title: record.title,
//       description: record.description,
//       course: record.course?._id,
//     });
//   };

//   // Handle Delete
//   const handleDelete = (id) => {
//     axios
//       .delete(`${AppRoutes.deleteBatch}${id}`)
//       .then(() => {
//         setBatches(batches.filter((batch) => batch._id !== id));
//         message.success('Batch deleted successfully!');
//       })
//       .catch((error) => {
//         console.error('Error deleting batch:', error);
//         message.error('Failed to delete batch.');
//       });
//   };

//     // Handle Course Selection
//     const handleCourseChange = (value) => {
//       setSelectedCourse(value);
//       fetchBatches(value);
//     };

//   const paginatedBacthes = batches.slice((currentPage - 1) * pageSize, currentPage * pageSize);

//   return (
//     <div style={{ padding: '20px' }}>
//       <div className="flex justify-between items-center mb-4">
//         <div className="text-xl font-semibold">Batches</div>
//         {/* Course Dropdown */}
//         <Select
//           placeholder="Select a course"
//           style={{ width: '300px' }}
//           onChange={handleCourseChange}
//           allowClear
//         >
//           {courses.map((course) => (
//             <Option key={course._id} value={course._id}>
//               {course.title}
//             </Option>
//           ))}
//         </Select>
//         <div className="text-xl font-semibold">Total Batches</div>
//         <Button
//           type="primary"
//           onClick={() => setVisible(true)}
//           className="rounded-lg shadow-lg bg-[#0561a6] text-white hover:text-blue-700"
//         >
//           {isEditing ? 'Edit Batch' : 'Add Batch'}
//         </Button>
//       </div>

//       {/* Render Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
//         {paginatedBacthes.map((batch) => (
//           <div
//             key={batch._id}
//             className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-500 ease-in-out flex flex-col"
//           >
//             <div className="p-6 flex-grow text-gray-800">
//               <h3 className="text-2xl font-semibold mb-4 text-[#0561a6] hover:text-blue-700 transition-all duration-300">
//                 {batch.title}
//               </h3>
//               <p className="text-sm mb-4 font-light opacity-80">
//                 {batch.description}
//               </p>
//               <p className="text-sm text-[#0561a6]">
//                 Course:{" "}
//                 {batch.course ? (
//                   <span className="font-medium">{batch.course.title}</span>
//                 ) : (
//                   "N/A"
//                 )}
//               </p>
//             </div>

//             <div className="p-4 border-t border-[#0561a6] flex justify-between items-center bg-gray-50">
//               <div className="text-sm text-gray-600">Batch</div>
//               <div className="flex items-center space-x-4">
//                 <EditFilled
//                   className="text-[#0561a6] hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-110"
//                   onClick={() => handleEdit(batch)}
//                 />
//                 <Popconfirm
//                   title="Are you sure to delete this batch?"
//                   onConfirm={() => handleDelete(batch._id)}
//                   okText="Yes"
//                   cancelText="No"
//                 >
//                   <DeleteFilled className="text-red-500 hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-110" />
//                 </Popconfirm>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <Pagination
//         current={currentPage}
//         pageSize={pageSize}
//         total={batches.length}
//         onChange={(page) => setCurrentPage(page)}
//         style={{ marginTop: "20px", textAlign: "center" }}
//       />

//       {/* Modal for Adding/Editing Batches */}
//       <Modal
//         title={isEditing ? 'Edit Batch' : 'Add Batch'}
//         visible={visible}
//         onCancel={resetForm}
//         footer={null}
//       >
//         <Form form={form} onFinish={onFinish} layout="vertical">
//           <Form.Item
//             name="title"
//             label="Batch Title"
//             rules={[{ required: true, message: 'Please enter a batch title!' }]}
//           >
//             <Input placeholder="Enter batch title" />
//           </Form.Item>

//           <Form.Item
//             name="description"
//             label="Description"
//             rules={[{ required: true, message: 'Please enter a description!' }]}
//           >
//             <Input.TextArea placeholder="Enter batch description" rows={4} />
//           </Form.Item>

//           <Form.Item
//             name="course"
//             label="Course"
//             rules={[{ required: true, message: 'Please select a course!' }]}
//           >
//             <Select placeholder="Select a course">
//               {courses.map((course) => (
//                 <Option key={course._id} value={course._id}>
//                   {course.title}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary"
//               className="rounded-lg shadow-lg bg-[#0561a6] text-white hover:text-blue-700"
//               htmlType="submit" block>
//               {isEditing ? 'Update Batch' : 'Add Batch'}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };







import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  Modal,
  Form,
  Input,
  Pagination,
  Popconfirm,
  message,
  Spin,
} from "antd";
import axios from "axios";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { AppRoutes } from "@/Constant/Constant";

const { Option } = Select;

export const Batches = () => {
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [form] = Form.useForm();

  // Fetch Batches
  const fetchBatches = (courseId = null) => {
    setLoading(true);
    const url = courseId
      ? `${AppRoutes.getBatch}?course=${courseId}`
      : AppRoutes.getBatch;

    axios
      .get(url)
      .then((response) => {
        const fetchedBatches = response.data.data;
        setBatches(fetchedBatches);
        setTotalCount(fetchedBatches.length); // Set the total count
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching batches:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  // Fetch Courses
  useEffect(() => {
    axios
      .get(AppRoutes.getCourses)
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  // Submit Form to Add or Edit Batch
  const onFinish = (values) => {
    setLoading(true);
    if (isEditing && editingBatch) {
      axios
        .put(`${AppRoutes.updateBatch}${editingBatch._id}`, values)
        .then((response) => {
          const updatedBatch = response.data.data;
          setBatches(
            batches.map((batch) =>
              batch._id === updatedBatch._id ? updatedBatch : batch
            )
          );
          message.success("Batch updated successfully!");
          resetForm();
        })
        .catch((error) => {
          console.error("Error updating batch:", error);
          message.error("Failed to update batch.");
        })
        .finally(() => setLoading(false));
    } else {
      axios
        .post(AppRoutes.addBatch, values)
        .then((response) => {
          setBatches([...batches, response.data.data]);
          message.success("Batch added successfully!");
          resetForm();
        })
        .catch((error) => {
          console.error("Error adding batch:", error);
          message.error("Failed to add batch.");
        })
        .finally(() => setLoading(false));
    }
  };

  // Reset Form
  const resetForm = () => {
    form.resetFields();
    setVisible(false);
    setIsEditing(false);
    setEditingBatch(null);
  };

  // Handle Edit
  const handleEdit = (record) => {
    setIsEditing(true);
    setEditingBatch(record);
    setVisible(true);
    form.setFieldsValue({
      title: record.title,
      description: record.description,
      course: record.course?._id,
    });
  };

  // Handle Delete
  const handleDelete = (id) => {
    setLoading(true);
    axios
      .delete(`${AppRoutes.deleteBatch}${id}`)
      .then(() => {
        setBatches(batches.filter((batch) => batch._id !== id));
        setTotalCount(totalCount - 1); // Decrement the total count
        message.success("Batch deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting batch:", error);
        message.error("Failed to delete batch.");
      })
      .finally(() => setLoading(false));
  };

  // Handle Course Selection
  const handleCourseChange = (value) => {
    setSelectedCourse(value);
    fetchBatches(value);
  };

  const paginatedBatches = batches.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div style={{ padding: "20px" }}>
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        {/* <div className="text-xl font-semibold">Batches</div> */}
        <Select
          placeholder="Select a course"
          style={{ width: "300px" }}
          onChange={handleCourseChange}
          allowClear
        >
          {courses.map((course) => (
            <Option key={course._id} value={course._id}>
              {course.title}
            </Option>
          ))}
        </Select>
        <div className="text-xl font-semibold">
          Total Batches: {totalCount}
        </div>
        <Button
          type="primary"
          onClick={() => setVisible(true)}
          className="rounded-lg shadow-lg bg-[#0561a6] text-white hover:text-blue-700"
        >
          {isEditing ? "Edit Batch" : "Add Batch"}
        </Button>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center" style={{ height: "200px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {paginatedBatches.map((batch) => (
            <div
              key={batch._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-500 ease-in-out flex flex-col"
            >
              <div className="p-6 flex-grow text-gray-800">
                <h3 className="text-2xl font-semibold mb-4 text-[#0561a6] hover:text-blue-700 transition-all duration-300">
                  {batch.title}
                </h3>
                <p className="text-sm mb-4 font-light opacity-80">
                  {batch.description}
                </p>
                <p className="text-sm text-[#0561a6]">
                  Course:{" "}
                  {batch.course ? (
                    <span className="font-medium">{batch.course.title}</span>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
              <div className="p-4 border-t border-[#0561a6] flex justify-between items-center bg-gray-50">
                <div className="text-sm text-gray-600">Batch</div>
                <div className="flex items-center space-x-4">
                  <EditFilled
                    className="text-[#0561a6] hover:text-white cursor-pointer transition-all duration-300 transform hover:scale-110"
                    onClick={() => handleEdit(batch)}
                  />
                  <Popconfirm
                    title="Are you sure to delete this batch?"
                    onConfirm={() => handleDelete(batch._id)}
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
      )}

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={batches.length}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: "20px", textAlign: "center" }}
      />

      {/* Modal for Adding/Editing Batches */}
      <Modal
        title={isEditing ? "Edit Batch" : "Add Batch"}
        visible={visible}
        onCancel={resetForm}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="title"
            label="Batch Title"
            rules={[{ required: true, message: "Please enter a batch title!" }]}
          >
            <Input placeholder="Enter batch title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description!" }]}
          >
            <Input.TextArea placeholder="Enter batch description" rows={4} />
          </Form.Item>
          <Form.Item
            name="course"
            label="Course"
            rules={[{ required: true, message: "Please select a course!" }]}
          >
            <Select placeholder="Select a course">
              {courses.map((course) => (
                <Option key={course._id} value={course._id}>
                  {course.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              className="rounded-lg shadow-lg bg-[#0561a6] text-white hover:text-blue-700"
              htmlType="submit"
              block
            >
              {isEditing ? "Update Batch" : "Add Batch"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
