Saylani Microfinance App Hackathon

Overview

Welcome to the Saylani Microfinance App Hackathon! This 12-hour event is designed for students who have completed a 13-month MERN stack course. The objective is to develop a microfinance application for Saylani Welfare, focusing on providing interest-free loans under the Qarze Hasana program. The application will cater to multiple loan categories, include a landing page, and feature both user and admin functionalities.

Features and Requirements

Loan Categories

The application will support the following loan categories:

Wedding Loans

Subcategories: Valima, Furniture, Valima Food, Jahez

Maximum loan: PKR 5 Lakh

Loan period: 3 years

Home Construction Loans

Subcategories: Structure, Finishing, Loan

Maximum loan: PKR 10 Lakh

Loan period: 5 years

Business Startup Loans

Subcategories: Buy Stall, Advance Rent for Shop, Shop Assets, Shop Machinery

Maximum loan: PKR 10 Lakh

Loan period: 5 years

Education Loans

Subcategories: University Fees, Child Fees Loan

Maximum loan: Based on requirement

Loan period: 4 years

User Journey

Landing Page

Displays loan categories and subcategories.

Includes a loan calculator where users can:

Select a category and subcategory.

Input initial deposit.

Select loan period.

Calculate estimated loan breakdown.

Application Process

Proceed Action:

Users click the "Proceed" button, which opens a popup form.

Fields: CNIC, Email, Name.

Account Creation:

User receives an email containing a password.

User logs in and is prompted to create a new password.

Loan Request Submission:

Users view their loan request details.

Provide additional details:

Two guarantors' information (Name, Email, Location, CNIC).

Statement and salary sheet (optional).

Personal details (Address, Phone Number, etc.).

Slip Generation:

System generates a slip containing:

Token number

QR code

Appointment details (date, time, office location)

Users can download the slip for their appointment.

Admin Panel Features

Application Management:

View all submitted applications.

Filter applications by City/Country.

Add token numbers to applications.

Loan Details:

View requested loan details (category, subcategory, loan amount).

View guarantor details and user-provided information.

Appointment Scheduling:

Automatically schedule user appointments based on available slots.

Development Structure

Frontend

Technologies: React.js

Pages:

Landing Page

Calculator Page

User Registration/Login

Loan Request Form

Dashboard (User & Admin)

Backend

Technologies: Node.js with Express

Database: MongoDB

Features:

User Authentication

Loan Request Handling

Guarantor Information Storage

Appointment Scheduling

API Endpoints

User Endpoints

POST /register – Register user (CNIC, Email, Name)

POST /loan-request – Submit loan request

POST /add-guarantor – Add guarantor information

GET /loan-details – Fetch loan details

GET /generate-slip – Generate slip with QR code & appointment details

Admin Endpoints

GET /applications – View all applications

PUT /update-application-status – Update application status

POST /add-token – Add token numbers to applications

GET /filter-applications – Filter applications by city/country

Project Workflow

1. Design Phase

Create wireframes for landing page, calculator, and user journey.

Finalize database schema for users, guarantors, loans, and appointments.

2. Development Phase

Implement frontend components for user journey.

Develop backend APIs for user authentication, loan requests, and admin functionalities.

Integrate QR code generation and appointment scheduling.

3. Testing Phase

Test user flows for loan request submission and account creation.

Validate data integrity for guarantors and loan details.

4. Deployment

Deploy the application on Vercel or AWS.

Hackathon Timeline

Hour 1-3:

Set up project structure and basic frontend/backend integration.

Implement landing page and loan calculator.

Hour 4-6:

Create user registration and login functionalities.

Develop loan request form and submission flow.

Hour 7-9:

Implement QR code generation and slip download.

Build admin panel functionalities.

Hour 10-12:

Test the complete application.

Deploy project and prepare presentations.

Expected Deliverables

Fully functional microfinance app.

User-friendly landing page with loan categories and calculator.

Complete user journey for loan request submission.

Admin panel for managing applications and appointments.

Deployed application ready for presentation.

Hackathon Rules and Guidelines

Teams will consist of 4-5 members.

All code must be written during the hackathon.

Use of pre-built templates or libraries must be disclosed.

Evaluation criteria:

Functionality – Does the app work as intended?

User Experience – Is the app intuitive and easy to use?

Code Quality – Is the code well-structured and maintainable?

Presentation – How well is the project demonstrated?

Conclusion

The Saylani Microfinance App aims to simplify the loan application process for users while ensuring efficient management for the organization. This hackathon will test students' MERN stack knowledge and provide a practical solution for Saylani Welfare’s Qarze Hasana program.

Good luck and happy coding!

