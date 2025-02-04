import React, { useState } from 'react';

const DriverSDK = () => {
  const [status, setStatus] = useState(""); // State to hold the status message

  const startOnboarding = () => {
    const accessToken = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6InNuNW5xbiIsImhhc2giOiJkNzkwZGM4MzZmNDkwOTEzNmY4MmFjZjYyOWM3YTJhNzBmMGY1ZDQzZTVjN2NkYmRkMTFhMWE4ZmM0ZTExODZlIiwiaWF0IjoxNzM3NzAyNDk3LCJleHAiOjE3Mzc3NDU2OTcsImp0aSI6IjljMmRmOWNkLTU3NTEtNGZjYS04OTgxLWY2YWZkNjY5ODdmZSJ9.nAX-QKASU44bT2FhEcmr-uHlRdkpHdnwLXyxQe5sFYvRdAAAP3xJFvfW_FKouXZOuKGu1Lz1rufwxsVDtRDLIKy9J6P8JMoa508SGYLHtOwao6Nh9MBGi1UD_PDKefa4NQYdoqXj-BDVJQYnrp_DWxo0Wa8q4FRg21HNaiFXL8E";
    
    // Create the HyperKYCConfig object with the required parameters
    const hyperKycConfig = new window.HyperKycConfig(
      accessToken,
      "firstworkflow", // Workflow ID (can be replaced with your workflow ID)
      "DS_hunter_test_1737697625590" // Customer ID (replace it with your customer ID)
    );

    // Launch the HyperKYCModule with the configuration
    window.HyperKYCModule.launch(hyperKycConfig, handler);
  };

  const handler = (HyperKycResult) => {
    if (HyperKycResult.Cancelled) {
      setStatus("Onboarding Cancelled: " + HyperKycResult.Cancelled); // Update status
    } else if (HyperKycResult.Failure) {
      setStatus("Onboarding Failed: " + HyperKycResult.Failure); // Update status
    } else if (HyperKycResult.Success) {
      setStatus("Onboarding Success: " + HyperKycResult.Success); // Update status
    } else {
      setStatus("Unexpected result: " + JSON.stringify(HyperKycResult)); // For any unexpected results
    }
  };

  return (
    <div className="driver-sdk-container">
      <h1>Driver Onboarding</h1>
      <button onClick={startOnboarding} className="btn btn-primary">
        Start Onboarding
      </button>

      {/* Display the status message */}
      <div className="status-message">
        <p>{status}</p>
      </div>
    </div>
  );
};

export default DriverSDK;
