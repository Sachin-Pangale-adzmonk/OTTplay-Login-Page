let otpGenerated = false;

// Function to generate OTP
function generateOtp() {
  const phoneNumber = document.getElementById("phoneNumber").value;
  if (!phoneNumber) {
    alert("Please enter a valid phone number.");
    return;
  }

  const generateOtpApi = "https://api2.ottplay.com/api/user-service/v1/generate-otp";
  const userAgent = navigator.userAgent;
  let deviceId = localStorage.getItem("device_id");
  
  if (!deviceId) {
    deviceId = uuid.v4(); // Generate a new one if it doesn't exist
    localStorage.setItem("device_id", deviceId); // Store it for future use
  }

  const headers = {
    accept: "application/json, text/plain, */*",
    authorization: "Bearer F421D63D166CA343454DD833B599C",
    captcha: "",
    "content-type": "application/json",
    device_id: deviceId,
    devicetype: "web",
    origin: "https://www.ottplay.com",
    referer: "https://www.ottplay.com",
    "user-agent": userAgent,
    "x-client": "1001",
  };

  const body = JSON.stringify({
    otpFor: "LOGIN",
    referrer: "OTT",
    cellNumber: phoneNumber,
  });

  fetch(generateOtpApi, {
    method: "POST",
    headers: headers,
    body: body,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        otpGenerated = true;
        alert("OTP has been sent to your phone.");
        document.getElementById("otpSection").style.display = "none";
        document.getElementById("verifySection").style.display = "block";
        document.getElementById("generateOtpBtn").disabled = true;
      } else {
        alert("Error generating OTP. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error generating OTP. Please try again.");
    });
}

// Function to verify OTP
function verifyOtp() {
  const phoneNumber = document.getElementById("phoneNumber").value;
  const otp = document.getElementById("otp").value;

  if (!otp) {
    alert("Please enter the OTP.");
    return;
  }

  const verifyOtpApi = "https://api2.ottplay.com/api/user-service/v1/verify-via-otp";
  const deviceId = localStorage.getItem("device_id") || "50912eb2-fcde-4cb1-a9a2-571af8c30982";

  const headers = {
    accept: "application/json, text/plain, */*",
    "content-type": "application/json",
    device_id: deviceId,
    devicetype: "web",
    origin: "https://www.ottplay.com",
    referer: "https://www.ottplay.com",
    "user-agent": navigator.userAgent,
    "x-client": "1001",
  };

  const body = JSON.stringify({
    referrer: "OTT",
    cellNumber: phoneNumber,
    otp: otp,
    newsletterConsent: false,
    platform: "Web",
    device_id: deviceId,
    device_name: "Windows-Chrome",
    register: true,
  });

  fetch(verifyOtpApi, {
    method: "POST",
    headers: headers,
    body: body,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("API Response:", data);

      if (data.data.success) {
        alert("OTP verified successfully!");
        console.log("User Name:", data.data.data.name);
        console.log("User Email:", data.data.data.email);
      } else {
        alert("Invalid OTP. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error verifying OTP. Please try again.");
    });
}

// Enable/Disable OTP verification button based on OTP entered
document.getElementById("otp").addEventListener("input", function () {
  const otpValue = document.getElementById("otp").value;
  document.getElementById("verifyOtpBtn").disabled = !otpValue;
});
