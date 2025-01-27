import React, { useState } from "react";

const LoanRequestForm = () => {
  const [loanDetails, setLoanDetails] = useState({
    category: "",
    subcategory: "",
    guarantors: [],
    address: "",
    phoneNumber: "",
  });

  const handleSubmit = () => {
    console.log("Loan Details:", loanDetails);
    // API call to submit loan request
  };

  return (
    <div className="loan-request-page">
      <h2>Loan Request Form</h2>
      <input
        type="text"
        placeholder="Loan Category"
        onChange={(e) => setLoanDetails({ ...loanDetails, category: e.target.value })}
      />
      <input
        type="text"
        placeholder="Loan Subcategory"
        onChange={(e) => setLoanDetails({ ...loanDetails, subcategory: e.target.value })}
      />
      <input
        type="text"
        placeholder="Guarantor Name"
        onChange={(e) =>
          setLoanDetails({
            ...loanDetails,
            guarantors: [...loanDetails.guarantors, { name: e.target.value }],
          })
        }
      />
      <input
        type="text"
        placeholder="Address"
        onChange={(e) => setLoanDetails({ ...loanDetails, address: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone Number"
        onChange={(e) => setLoanDetails({ ...loanDetails, phoneNumber: e.target.value })}
      />
      <button onClick={handleSubmit}>Submit Loan Request</button>
    </div>
  );
};

export default LoanRequestForm;
