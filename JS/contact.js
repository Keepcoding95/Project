document.addEventListener('DOMContentLoaded', function() {
    // Retrieve existing submissions from local storage or initialize an empty array
    let submissions = JSON.parse(localStorage.getItem('submissions')) || [];

    // Display existing submissions count
    displaySubmissionCount();

    // Form submission event listener
    document.querySelector('.contact-form form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting

        // Get form values
        let firstName = document.getElementById('first-name').value.trim();
        let lastName = document.getElementById('last-name').value.trim();
        let email = document.getElementById('email').value.trim();
        let subject = document.getElementById('subject').value.trim();
        let message = document.getElementById('message').value.trim();

        // Perform form validation
        if (firstName === '' || lastName === '' || email === '' || subject === '' || message === '') {
            alert('Please fill out all fields.');
            return;
        }

        // Validate email format using a regular expression
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Create new submission object
        let submission = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            subject: subject,
            message: message
        };

        // Add new submission to submissions array
        submissions.push(submission);

        // Save updated submissions array to local storage
        localStorage.setItem('submissions', JSON.stringify(submissions));

        // Update displayed submissions count
        displaySubmissionCount();

        // Clear form fields
        document.getElementById('first-name').value = '';
        document.getElementById('last-name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('message').value = '';

        // You might want to redirect or display a success message here instead of automatically submitting the form
        // event.currentTarget.submit();
    });

    // Function to display submissions count
    function displaySubmissionCount() {
        let submissionCounter = document.getElementById('submission-counter');
        submissionCounter.textContent = submissions.length;
    }
});
