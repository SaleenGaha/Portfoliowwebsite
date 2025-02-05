document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("oz5lPMCE8LXOCSDiD"); // Replace with your EmailJS Public Key

  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      emailjs.sendForm("service_m6gsjrj", "template_hlzaifo", this).then(
        function () {
          document.getElementById("responseMessage").innerHTML =
            "✅ Message sent successfully!";
        },
        function (error) {
          document.getElementById("responseMessage").innerHTML =
            "❌ Failed to send message. Please try again.";
        }
      );
    });
});
