// JavaScript for slideshow in the "Special offers" section
// let slideIndex = 0;
// showSlides();

// function showSlides() {
//     let i;
//     const slides = document.querySelectorAll('.main-content .row:nth-of-type(2) .list .items .item');
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }
//     slideIndex++;
//     if (slideIndex > slides.length) {slideIndex = 1}
//     slides[slideIndex-1].style.display = "block";
//     setTimeout(showSlides, 2000);
// }

let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    const slides = document.querySelectorAll('.slideshow-container .item');
    const dots = document.querySelectorAll('.slideshow-container .dot');

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    setTimeout(showSlides, 2000);
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}






// Contact form functionality
document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Form data validation
        var firstName = document.getElementById('first-name').value.trim();
        var lastName = document.getElementById('last-name').value.trim();
        var email = document.getElementById('email').value.trim();
        var subject = document.getElementById('subject').value.trim();
        var message = document.getElementById('message').value.trim();

        if (firstName === '' || lastName === '' || email === '' || subject === '' || message === '') {
            alert('Please fill in all fields.');
            return;
        }

        // Checking the email address using a simple regular expression
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // If you reach here, the data is valid, and you can continue with processing or storing it.

        // Form data object
        var formData = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "subject": subject,
            "message": message
        };

        // Convert the object into a JSON string
        var formDataJSON = JSON.stringify(formData);

        // Saving the data into localStorage
        localStorage.setItem('formData', formDataJSON);

        // Redirect to 'success.html' after 5 seconds
    //     setTimeout(function() {
    //         window.location.href = 'contact.html';
    //     }, 3000);
    // });

        // Redirect to 'success.html'
        window.location.href = 'success.html';
    });

    // When the page loads, check if there are saved data and display them
    var savedFormData = localStorage.getItem('formData');

    if (savedFormData) {
        var formData = JSON.parse(savedFormData);
        // Display the data on the page or process it in another way
    }

    // Update the counter for each form submission
    var counter = localStorage.getItem('submissionCounter') || 0;
    counter++;
    localStorage.setItem('submissionCounter', counter);

    // Display the counter in the HTML page
    var counterElement = document.getElementById('submission-counter');
    if (counterElement) {
        counterElement.textContent = counter;
    }
});
