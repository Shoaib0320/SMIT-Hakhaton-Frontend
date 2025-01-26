// // // import React, { useEffect, useState } from 'react'
// // // import "../../Styles/styles.css"

// // // import { Link } from 'react-router-dom'
// // // // IMAGES
// // // // import img1 from "../assets/image/main-home-img1.jpg"
// // // // import img2 from "../assets/image/main-home-img2.jpg"
// // // import { message } from 'antd'
// // // import { AppRoutes } from '@/Constant/Constant';

// // // export default function Home() {
// // //   // CATEGERY STATE START
// // //   const [category, setCategory] = useState([]);

// // //   const fetchCategory = async () => {
// // //     try {
// // //       const response = await fetch(AppRoutes.getCategoriesWithSubCategories);
// // //       if (!response.ok) throw new Error("Failed to fetch category");
// // //       const data = await response.json();

// // //       setCategory(data.data);
// // //     } catch (error) {
// // //       console.error("Error fetching category:", error);
// // //       message.error("Failed to fetch category");
// // //     }
// // //   };

// // //   // Call fetchCategory inside useEffect to run once when component mounts
// // //   useEffect(() => {
// // //     fetchCategory();
// // //   }, []);

// // //   // LOADER STATE
// // //   const [loader, setLoader] = useState(true);

// // //   useEffect(() => {
// // //     const load = setTimeout(() => {
// // //       setLoader(false);
// // //     }, 2500);

// // //     return () => clearTimeout(load);
// // //   }, []);

// // //   return (
// // //     <>
// // //       {/* LOADER START */}
// // //       {loader ? (
// // //         <div className="loader-main container-fluid d-flex justify-content-center align-items-center ">
// // //           <div className="card">
// // //             <div className="loader">
// // //               <p>Saylani</p>
// // //               <div className="words">
// // //                 <span className="word">Micro</span>
// // //                 <span className="word">finance</span>
// // //                 <span className="word">Website</span>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       ) : (
// // //         // WHOLE BODY START
// // //         <>
// // //           {/* MAIN 1 START */}
// // //           <div className="container-fluid d-flex flex-lg-row flex-column justify-content-center align-items-center container-1">
// // //             <div className="col-lg-6 col-12 d-flex flex-column justify-content-center ">
// // //               <h1 className='display-2 fw-bold pt-5'>Your Partner for Financial Success</h1>
// // //               <h5 className='py-3 col-org'>Lorem ipsum dolor sit amet, vim id assentior moderatius, neligendis iuvaret est per et inani alienum.</h5>
// // //               <button className="btn-1 col-lg-4 col-5" type="submit">
// // //                 Free Consultancy
// // //                 <span className="btn-1-hover d-flex justify-content-center align-items-center">
// // //                   <i className="fa-solid fa-paper-plane text-white"></i>
// // //                 </span>
// // //               </button>
// // //             </div>
// // //             {/* <div className="col-lg-6 col-12">
// // //               <img src={img1} className='img-fluid' alt="" />
// // //             </div> */}
// // //           </div>
// // //           {/* MAIN 1 END */}

// // //           {/* MAIN 2 START */}
// // //           <div className="container-fluid my-5">
// // //             <div className="row align-items-center">
// // //               <div className="col-lg-6 mb-4 mb-lg-0">
// // //                 <div className="position-relative">
// // //                   {/* <img src={img2} alt="Team Meeting" className="img-fluid rounded" /> */}
// // //                   <div className="bg position-absolute box1 translate-middle text-white p-4 rounded shadow">
// // //                     <h4 className="fw-bold text-center mb-1">4.8/5</h4>
// // //                     <p className="small text-center mb-0">Over 5K+ Reviews</p>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="col-lg-6">
// // //                 <h6 className="text-uppercase text-muted">What About Us</h6>
// // //                 <h2 className="fw-bold mb-4">
// // //                   Strategic Financial Planning <br />  For Optimal Growth
// // //                 </h2>
// // //                 <p className="text-muted mb-4">
// // //                   Dis etiam tincidunt ante sollicitudin sit magna fermentum. Erat iaculis id turpis pulvinar maximus mollis fermentum.
// // //                 </p>
// // //                 <div className="row text-center mb-4">
// // //                   <div className="col-4">
// // //                     <h1 className="fw-bold col-org">98%</h1>
// // //                     <p className="text-muted small">Satisfied Customers</p>
// // //                   </div>
// // //                   <div className="col-4">
// // //                     <h1 className="fw-bold col-org">5K+</h1>
// // //                     <p className="text-muted small">Complete Projects</p>
// // //                   </div>
// // //                   <div className="col-4">
// // //                     <h1 className="fw-bold col-org">10+</h1>
// // //                     <p className="text-muted small">Years of Experience</p>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //           {/* MAIN 2 END */}

// // //           {/* MAIN 3 START */}
// // //           <div className="container-fluid py-5  d-flex flex-column  bg">
// // //             {/* DIV 1 START */}
// // //             <div className="container">
// // //               <h1 className='text-center text-white display-5 fw-bold pb-3'>Our Loans</h1>
// // //               <h5 className='text-center text-white fs-4 col-4 mx-auto'>
// // //                 Your Financial Goals Are Our Top Priority
// // //               </h5>
// // //             </div>
// // //             {/* DIV 1 END */}
// // //             {/* DIV 2 START */}
// // //             <div className="container d-flex flex-wrap py-5 gap-1 justify-content-around">
// // //               {category.map((e, index) => (
// // //                 <div className="col-lg-5 col-12 my-3 d-flex card-1 text-white" key={e._id}>
// // //                   <div className="col-1 d-flex flex-row me-2 align-items-center">
// // //                     <h5 className='p-3 cir'>{index + 1}</h5>
// // //                   </div>
// // //                   <div className="col-10 d-flex flex-row align-items-center">
// // //                     <h3>{e.title}</h3>
// // //                   </div>
// // //                   <div className="col-1 d-flex flex-row align-items-center">
// // //                     <Link to={`/category/${e._id}`} className='text-decoration-none list-unstyled'>
// // //                       <i className="fa-solid fa-arrow-up-right-from-square fs-5 "></i>
// // //                     </Link>
// // //                   </div>
// // //                   {/* hover */}
// // //                   <div className="card-1-hover"></div>
// // //                   {/* hover */}
// // //                 </div>
// // //               ))}
// // //             </div>
// // //             {/* DIV 2 END */}
// // //           </div>
// // //         </>
// // //       )}
// // //     </>
// // //   );
// // // }


// // import React, { useEffect, useState } from 'react';
// // import "../../Styles/styles.css";
// // import { Link } from 'react-router-dom';
// // import { message } from 'antd';
// // import { AppRoutes } from '@/Constant/Constant';

// // export default function Home() {
// //   const [category, setCategory] = useState([]);
// //   const [loader, setLoader] = useState(true);

// //   const fetchCategory = async () => {
// //     try {
// //       const response = await fetch(AppRoutes.getCategoriesWithSubCategories);
// //       if (!response.ok) throw new Error("Failed to fetch category");
// //       const data = await response.json();
// //       setCategory(data.data);
// //     } catch (error) {
// //       console.error("Error fetching category:", error);
// //       message.error("Failed to fetch category");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCategory();
// //   }, []);

// //   useEffect(() => {
// //     const load = setTimeout(() => {
// //       setLoader(false);
// //     }, 2500);

// //     return () => clearTimeout(load);
// //   }, []);

// //   return (
// //     <>
// //       {loader ? (
// //         <div className="flex justify-center items-center h-screen bg-gray-100">
// //           <div className="text-center">
// //             <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
// //             <p className="mt-4 text-lg font-bold">Loading Saylani Microfinance...</p>
// //           </div>
// //         </div>
// //       ) : (
// //         <>
// //           {/* Header Section */}
// //           <div className="bg-blue-500 text-white py-16 px-6 md:px-20">
// //             <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
// //               <div className="md:w-1/2">
// //                 <h1 className="text-4xl md:text-6xl font-bold leading-tight">
// //                   Your Partner for Financial Success
// //                 </h1>
// //                 <p className="mt-4 text-lg">
// //                   Empowering communities through strategic financial solutions. Join us to achieve your goals.
// //                 </p>
// //                 <button className="mt-6 bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-yellow-300 transition">
// //                   Free Consultancy
// //                   <span className="ml-2">
// //                     <i className="fa-solid fa-paper-plane"></i>
// //                   </span>
// //                 </button>
// //               </div>
// //               <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
// //                 <img src="/images/main-home-img1.jpg" alt="Financial Planning" className="rounded-lg shadow-lg max-w-full" />
// //               </div>
// //             </div>
// //           </div>

// //           {/* About Us Section */}
// //           <div className="bg-gray-50 py-16 px-6 md:px-20">
// //             <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
// //               <div className="relative">
// //                 <img src="/images/main-home-img2.jpg" alt="Team Meeting" className="rounded-lg shadow-lg" />
// //                 <div className="absolute bg-blue-500 text-white p-4 rounded-lg shadow-lg top-4 left-4">
// //                   <h4 className="text-xl font-bold text-center">4.8/5</h4>
// //                   <p className="text-center text-sm">Over 5K+ Reviews</p>
// //                 </div>
// //               </div>
// //               <div className="flex flex-col justify-center">
// //                 <h6 className="text-blue-500 uppercase font-bold">What About Us</h6>
// //                 <h2 className="text-3xl font-bold mt-4">
// //                   Strategic Financial Planning <br /> For Optimal Growth
// //                 </h2>
// //                 <p className="mt-4 text-gray-600">
// //                   Empowering lives with strategic solutions for sustainable development. Discover new horizons with our expertise.
// //                 </p>
// //                 <div className="grid grid-cols-3 mt-8 text-center">
// //                   <div>
// //                     <h1 className="text-3xl font-bold text-blue-500">98%</h1>
// //                     <p className="text-gray-600">Satisfied Customers</p>
// //                   </div>
// //                   <div>
// //                     <h1 className="text-3xl font-bold text-blue-500">5K+</h1>
// //                     <p className="text-gray-600">Complete Projects</p>
// //                   </div>
// //                   <div>
// //                     <h1 className="text-3xl font-bold text-blue-500">10+</h1>
// //                     <p className="text-gray-600">Years of Experience</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Our Loans Section */}
// //           <div className="bg-blue-500 py-16 px-6 md:px-20 text-white">
// //             <div className="max-w-6xl mx-auto text-center">
// //               <h1 className="text-4xl font-bold">Our Loans</h1>
// //               <p className="mt-4 text-lg">
// //                 Your Financial Goals Are Our Top Priority
// //               </p>
// //             </div>
// //             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
// //               {category.map((e, index) => (
// //                 <div className="relative bg-gray-100 text-black rounded-lg shadow-lg p-6 flex items-center" key={e._id}>
// //                   <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white font-bold rounded-full">
// //                     {index + 1}
// //                   </div>
// //                   <div className="ml-4 flex-1">
// //                     <h3 className="text-xl font-bold">{e.title}</h3>
// //                   </div>
// //                   <Link to={`/category/${e._id}`} className="text-blue-500 hover:text-blue-700">
// //                     <i className="fa-solid fa-arrow-up-right-from-square text-lg"></i>
// //                   </Link>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </>
// //       )}
// //     </>
// //   );
// // }







// import { Phone, Mail, Globe } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Image } from "antd"
// import { AppRoutes } from "@/Constant/Constant";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export default function Home() {

//   const [category, setCategory] = useState([]);
//   // const [loader, setLoader] = useState(true);

//   const fetchCategory = async () => {
//     try {
//       const response = await fetch(AppRoutes.getCategoriesWithSubCategories);
//       if (!response.ok) throw new Error("Failed to fetch category");
//       const data = await response.json();
//       setCategory(data.data);
//     } catch (error) {
//       console.error("Error fetching category:", error);
//       message.error("Failed to fetch category");
//     }
//   };

//   useEffect(() => {
//     fetchCategory();
//   }, []);

//   return (
//     <div className="min-h-screen">
//       {/* Top Bar */}
//       <div className="bg-gray-100 py-2 px-4 text-sm">
//         <div className="container mx-auto flex flex-wrap justify-between items-center">
//           <div className="flex flex-wrap gap-4">
//             <a
//               href="mailto:info@saylaniwelfare.com"
//               className="flex items-center gap-2 text-gray-600 hover:text-[#0D6DB7]"
//             >
//               <Mail className="h-4 w-4" />
//               info@saylaniwelfare.com
//             </a>
//             <a href="tel:021-111-729-526" className="flex items-center gap-2 text-gray-600 hover:text-[#0D6DB7]">
//               <Phone className="h-4 w-4" />
//               021-111-729-526
//             </a>
//           </div>
//           <div className="flex items-center gap-4">
//             <span className="text-gray-600">Visit Our other websites:</span>
//             <div className="flex gap-2">
//               {["🇬🇧", "🇺🇸", "🇨🇦", "🇹🇷"].map((flag) => (
//                 <button key={flag} className="hover:opacity-75 transition-opacity">
//                   {flag}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Navigation */}
//       <header className="border-b shadow-sm">
//         <div className="container mx-auto py-4 px-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-12">
//               <Image
//                 src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Saylani%20Theme.PNG-BwiBQH0SKSr2dbybfq7F4oWStIpO71.png"
//                 alt="Saylani Welfare Logo"
//                 width={200}
//                 height={60}
//                 className="h-12 w-auto"
//               />
//               <nav className="hidden md:flex gap-8">
//                 <a href="#" className="text-gray-600 hover:text-[#0D6DB7]">
//                   About
//                 </a>
//                 <a href="#" className="text-gray-600 hover:text-[#0D6DB7]">
//                   Services
//                 </a>
//                 <a href="#" className="text-gray-600 hover:text-[#0D6DB7]">
//                   Media
//                 </a>
//                 <a href="#" className="text-gray-600 hover:text-[#0D6DB7]">
//                   Contact Us
//                 </a>
//                 <a href="#" className="text-gray-600 hover:text-[#0D6DB7]">
//                   Bank Details
//                 </a>
//                 <a href="#" className="text-[#8DC63F] hover:text-[#7ab32f]">
//                   Other Websites
//                 </a>
//               </nav>
//             </div>
//             <div className="flex gap-4">
//               <Button className="bg-[#0D6DB7] hover:bg-[#0b5a9a]">DONATE NOW</Button>
//               <Button variant="outline" className="border-[#8DC63F] text-[#8DC63F] hover:bg-[#8DC63F] hover:text-white">
//                 BE A SPONSOR
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="container mx-auto px-4 py-16">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           <div>
//             <h1 className="text-5xl font-bold leading-tight">
//               Welcome to the <span className="text-[#8DC63F]">Saylani</span> Welfare
//             </h1>
//             <h2 className="text-4xl font-bold mt-2 mb-6">Non Governmental Organization in Pakistan</h2>
//             <p className="text-xl text-gray-600 mb-8">
//               The largest NGO offering free clean water, healthcare, and education. Saylani Welfare is on the ground and
//               already working with local communities to assess how best to support underprivileged families in more than
//               63 areas of day to day lives.
//             </p>
//             <Button className="bg-[#0D6DB7] hover:bg-[#0b5a9a] text-lg px-8 py-6">
//               Explore More
//               <Globe className="ml-2 h-5 w-5" />
//             </Button>
//           </div>
//           <div className="relative">
//             <div className="grid grid-cols-2 gap-6">
//               <div className="space-y-6">
//                 <div className="rounded-full overflow-hidden shadow-lg">
//                   <Image
//                     src="/placeholder.svg?height=300&width=300"
//                     alt="Saylani Activity 1"
//                     width={300}
//                     height={300}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="rounded-full overflow-hidden shadow-lg">
//                   <Image
//                     src="/placeholder.svg?height=300&width=300"
//                     alt="Saylani Activity 2"
//                     width={300}
//                     height={300}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>
//               <div className="mt-12 space-y-6">
//                 <div className="rounded-full overflow-hidden shadow-lg">
//                   <Image
//                     src="/placeholder.svg?height=300&width=300"
//                     alt="Saylani Activity 3"
//                     width={300}
//                     height={300}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="rounded-full overflow-hidden shadow-lg">
//                   <Image
//                     src="/placeholder.svg?height=300&width=300"
//                     alt="Saylani Activity 4"
//                     width={300}
//                     height={300}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#8DC63F]/10 rounded-full blur-3xl"></div>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
//             {category.map((e, index) => (
//               <div className="relative bg-gray-100 text-black rounded-lg shadow-lg p-6 flex items-center" key={e._id}>
//                 <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white font-bold rounded-full">
//                   {index + 1}
//                 </div>
//                 <div className="ml-4 flex-1">
//                   <h3 className="text-xl font-bold">{e.title}</h3>
//                 </div>
//                 <Link to={`/category/${e._id}`} className="text-blue-500 hover:text-blue-700">
//                   <i className="fa-solid fa-arrow-up-right-from-square text-lg"></i>
//                 </Link>
//               </div>
//             ))}
//           </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }















import { Phone, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Image } from "antd";
import { AppRoutes } from "@/Constant/Constant";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    try {
      const response = await fetch(AppRoutes.getCategoriesWithSubCategories);
      if (!response.ok) throw new Error("Failed to fetch category");
      const data = await response.json();
      setCategory(data.data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <div className="bg-gray-100 py-2 px-4 text-sm">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:info@saylaniwelfare.com"
              className="flex items-center gap-2 text-gray-600 hover:text-[#0D6DB7]"
            >
              <Mail className="h-4 w-4" />
              info@saylaniwelfare.com
            </a>
            <a
              href="tel:021-111-729-526"
              className="flex items-center gap-2 text-gray-600 hover:text-[#0D6DB7]"
            >
              <Phone className="h-4 w-4" />
              021-111-729-526
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Visit Our other websites:</span>
            <div className="flex gap-2">
              {["🇬🇧", "🇺🇸", "🇨🇦", "🇹🇷"].map((flag) => (
                <button
                  key={flag}
                  className="hover:opacity-75 transition-opacity"
                >
                  {flag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 bg-white border-b shadow-sm z-50">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-12">
              <Image
                src="https://saylaniwelfare.com/static/media/logo_saylaniwelfare.22bf709605809177256c.png"
                alt="Saylani Welfare Logo"
                width={200}
                height={60}
                className="h-12 w-auto"
              />
              <nav className="hidden md:flex gap-8">
                <a href="#" className="text-gray-600 hover:text-[#0D6DB7]">
                  About
                </a>
                <a href="#" className="text-gray-600 hover:text-[#0D6DB7]">
                  Services
                </a>
                <a href="#" className="text-gray-600 hover:text-[#0D6DB7]">
                  Media
                </a>
                <a href="#" className="text-gray-600 hover:text-[#0D6DB7]">
                  Contact Us
                </a>
                <a href="#" className="text-gray-600 hover:text-[#0D6DB7]">
                  Bank Details
                </a>
                <a href="#" className="text-[#8DC63F] hover:text-[#7ab32f]">
                  Other Websites
                </a>
              </nav>
            </div>
            <div className="flex gap-4">
              <Button className="bg-[#0D6DB7] hover:bg-[#0b5a9a]">DONATE NOW</Button>
              <Button
                variant="outline"
                className="border-[#8DC63F] text-[#8DC63F] hover:bg-[#8DC63F] hover:text-white"
              >
                BE A SPONSOR
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Welcome to the <span className="text-[#8DC63F]">Saylani</span> Welfare
            </h1>
            <h2 className="text-4xl font-bold mt-2 mb-6">
              Non Governmental Organization in Pakistan
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              The largest NGO offering free clean water, healthcare, and education. Saylani Welfare is on the ground
              and already working with local communities to assess how best to support underprivileged families in
              more than 63 areas of day to day lives.
            </p>
            <Button className="bg-[#0D6DB7] hover:bg-[#0b5a9a] text-lg px-8 py-6">
              Explore More
              <Globe className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Saylani Activity 1"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Saylani Activity 2"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-12 space-y-6">
                <div className="rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Saylani Activity 3"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Saylani Activity 4"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#8DC63F]/10 rounded-full blur-3xl"></div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
              {category.map((e, index) => (
                <div
                  className="relative bg-gray-100 text-black rounded-lg shadow-lg p-6 flex items-center"
                  key={e._id}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white font-bold rounded-full">
                    {index + 1}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-xl font-bold">{e.title}</h3>
                  </div>
                  <Link
                    to={`/category/${e._id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square text-lg"></i>
                  </Link>
                </div>
              ))}
            </div>
      </section>
    </div>
  );
}
