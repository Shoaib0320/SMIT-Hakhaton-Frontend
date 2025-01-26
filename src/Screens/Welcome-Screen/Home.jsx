import React, { useEffect, useState } from 'react'
import "../../Styles/Styles.css"

import { Link } from 'react-router-dom'
// IMAGES
// import img1 from "../assets/image/main-home-img1.jpg"
// import img2 from "../assets/image/main-home-img2.jpg"
import { message } from 'antd'
import { AppRoutes } from '@/Constant/Constant';

export default function Home() {
  // CATEGERY STATE START
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    try {
      const response = await fetch(AppRoutes.getCategoriesWithSubCategories);
      if (!response.ok) throw new Error("Failed to fetch category");
      const data = await response.json();

      setCategory(data.data);
    } catch (error) {
      console.error("Error fetching category:", error);
      message.error("Failed to fetch category");
    }
  };

  // Call fetchCategory inside useEffect to run once when component mounts
  useEffect(() => {
    fetchCategory();
  }, []);

  // LOADER STATE
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const load = setTimeout(() => {
      setLoader(false);
    }, 2500);

    return () => clearTimeout(load);
  }, []);

  return (
    <>
      {/* LOADER START */}
      {loader ? (
        <div className="loader-main container-fluid d-flex justify-content-center align-items-center ">
          <div className="card">
            <div className="loader">
              <p>Saylani</p>
              <div className="words">
                <span className="word">Micro</span>
                <span className="word">finance</span>
                <span className="word">Website</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // WHOLE BODY START
        <>
          {/* MAIN 1 START */}
          <div className="container-fluid d-flex flex-lg-row flex-column justify-content-center align-items-center container-1">
            <div className="col-lg-6 col-12 d-flex flex-column justify-content-center ">
              <h1 className='display-2 fw-bold pt-5'>Your Partner for Financial Success</h1>
              <h5 className='py-3 col-org'>Lorem ipsum dolor sit amet, vim id assentior moderatius, neligendis iuvaret est per et inani alienum.</h5>
              <button className="btn-1 col-lg-4 col-5" type="submit">
                Free Consultancy
                <span className="btn-1-hover d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-paper-plane text-white"></i>
                </span>
              </button>
            </div>
            {/* <div className="col-lg-6 col-12">
              <img src={img1} className='img-fluid' alt="" />
            </div> */}
          </div>
          {/* MAIN 1 END */}

          {/* MAIN 2 START */}
          <div className="container-fluid my-5">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <div className="position-relative">
                  {/* <img src={img2} alt="Team Meeting" className="img-fluid rounded" /> */}
                  <div className="bg position-absolute box1 translate-middle text-white p-4 rounded shadow">
                    <h4 className="fw-bold text-center mb-1">4.8/5</h4>
                    <p className="small text-center mb-0">Over 5K+ Reviews</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <h6 className="text-uppercase text-muted">What About Us</h6>
                <h2 className="fw-bold mb-4">
                  Strategic Financial Planning <br />  For Optimal Growth
                </h2>
                <p className="text-muted mb-4">
                  Dis etiam tincidunt ante sollicitudin sit magna fermentum. Erat iaculis id turpis pulvinar maximus mollis fermentum.
                </p>
                <div className="row text-center mb-4">
                  <div className="col-4">
                    <h1 className="fw-bold col-org">98%</h1>
                    <p className="text-muted small">Satisfied Customers</p>
                  </div>
                  <div className="col-4">
                    <h1 className="fw-bold col-org">5K+</h1>
                    <p className="text-muted small">Complete Projects</p>
                  </div>
                  <div className="col-4">
                    <h1 className="fw-bold col-org">10+</h1>
                    <p className="text-muted small">Years of Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* MAIN 2 END */}

          {/* MAIN 3 START */}
          <div className="container-fluid py-5  d-flex flex-column  bg">
            {/* DIV 1 START */}
            <div className="container">
              <h1 className='text-center text-white display-5 fw-bold pb-3'>Our Loans</h1>
              <h5 className='text-center text-white fs-4 col-4 mx-auto'>
                Your Financial Goals Are Our Top Priority
              </h5>
            </div>
            {/* DIV 1 END */}
            {/* DIV 2 START */}
            <div className="container d-flex flex-wrap py-5 gap-1 justify-content-around">
              {category.map((e, index) => (
                <div className="col-lg-5 col-12 my-3 d-flex card-1 text-white" key={e._id}>
                  <div className="col-1 d-flex flex-row me-2 align-items-center">
                    <h5 className='p-3 cir'>{index + 1}</h5>
                  </div>
                  <div className="col-10 d-flex flex-row align-items-center">
                    <h3>{e.title}</h3>
                  </div>
                  <div className="col-1 d-flex flex-row align-items-center">
                    <Link to={`/category/${e._id}`} className='text-decoration-none list-unstyled'>
                      <i className="fa-solid fa-arrow-up-right-from-square fs-5 "></i>
                    </Link>
                  </div>
                  {/* hover */}
                  <div className="card-1-hover"></div>
                  {/* hover */}
                </div>
              ))}
            </div>
            {/* DIV 2 END */}
          </div>
        </>
      )}
    </>
  );
}
