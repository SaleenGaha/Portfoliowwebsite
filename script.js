document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const nameInput = document.getElementById("person_name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  if (!contactForm || !formMessage) {
    console.error("Form or message container not found.");
    return;
  }

  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Clear previous validation messages
    formMessage.innerHTML = "";
    formMessage.style.color = "";

    // Validate form fields
    let isValid = true;
    if (!nameInput.value.trim()) {
      nameInput.style.borderColor = "red"; // Highlight the invalid field
      isValid = false;
    } else {
      nameInput.style.borderColor = ""; // Remove the highlight
    }

    if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
      emailInput.style.borderColor = "red"; // Highlight the invalid field
      isValid = false;
    } else {
      emailInput.style.borderColor = ""; // Remove the highlight
    }

    if (!messageInput.value.trim()) {
      messageInput.style.borderColor = "red"; // Highlight the invalid field
      isValid = false;
    } else {
      messageInput.style.borderColor = ""; // Remove the highlight
    }

    // If the form is invalid, show an error message and exit
    if (!isValid) {
      formMessage.innerHTML = "Please fill in all required fields correctly. ❌";
      formMessage.style.color = "red";
      return;
    }

    // Proceed with sending the form data if valid
    const formData = new FormData(this);
    formData.append("access_key", "9a0c08da-30f6-4c2e-ae1b-d4cd42951496"); // Web3Forms access key

    formMessage.innerHTML = "Sending message... ⏳";
    formMessage.style.color = "#007bff"; // Blue color while sending

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        formMessage.innerHTML = "Message sent successfully! ✅";
        formMessage.style.color = "green";
        contactForm.reset(); // Reset the form after success
        
        // Clear the success message after 5 seconds
        setTimeout(() => {
          formMessage.innerHTML = "";
          formMessage.style.color = "";
        }, 5000); // 5 seconds
      } else {
        formMessage.innerHTML = "Something went wrong. ❌ Please try again.";
        formMessage.style.color = "red";
      }
    } catch (error) {
      console.error("Error:", error);
      formMessage.innerHTML = "Network error. Please try again later. ❌";
      formMessage.style.color = "red";
    }
  });

  // Helper function to validate email format
  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  }
});
