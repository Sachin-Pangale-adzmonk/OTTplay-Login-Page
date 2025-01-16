function showotpbox() {

      document.getElementById("otp-box").style.display = "block";
      document.getElementById("get-otp").style.display = "none";
      document.getElementById("enter-otp").style.display = "block";
    }
  

  // otp section start
  function moveToNext(current, nextFieldId) {
    if (current.value.length >= current.maxLength) {
      document.getElementById(nextFieldId).focus();
      Array.from(document.querySelectorAll(".form-otp-box input")).every(
        (input) => input.value
      );
    }
  }

  document
    .querySelectorAll(".form-otp-box input")
    .forEach((input, index, inputs) => {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
          inputs[index - 1].focus();
        }
      });
    });