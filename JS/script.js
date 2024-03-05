// Slideshow

let slideIndex = 0;
let timer;

function showSlides() {
    const slides = document.querySelectorAll('.slideshow-container .item');
    if (slides.length) {

        const itemsPerSlide = slideIndex * 4;
        const noSlides = Math.floor(slides.length / 4);
        const dots = document.querySelectorAll('.dot');
    
        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
    
        // Display the next set of slides
        for (let i = itemsPerSlide; i < itemsPerSlide + 4; i++) {
            if (slides[i]) {
                slides[i].style.display = "block";
            }
        }
    
        // Update active dot
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
        }
        dots[Math.floor(slideIndex / 1)].classList.add("active");
    
        // Move to the next set of slides
        slideIndex += 1;
        if (slideIndex >= noSlides) {
            slideIndex = 0; // Start over from the beginning
        }
    
        // Call showSlides() again after a certain interval
        timer = setTimeout(showSlides, 5000); // Change interval as needed
    }
}

function plusSlides(n) {
    clearTimeout(timer);
    showSlides();
}

function currentSlide(n) {
    clearTimeout(timer);
    showSlides((slideIndex = n - 1)); // Adjust index to match array index
}

showSlides();




// Contact form

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve existing submissions from local storage or initialize an empty array
    let submissions = JSON.parse(localStorage.getItem('submissions')) || [];

    // Display existing submissions count
    displaySubmissionCount();

    // Form submission event listener
    document.querySelector('.contact-form form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting

        // Get form values
        let firstName = document.getElementById('first-name').value;
        let lastName = document.getElementById('last-name').value;
        let email = document.getElementById('email').value;
        let subject = document.getElementById('subject').value;
        let message = document.getElementById('message').value;

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


        event.currentTarget.submit();
    });

    // Function to display submissions count
    function displaySubmissionCount() {
        let submissionCounter = document.getElementById('submission-counter');
        submissionCounter.textContent = submissions.length;
    }
});


// API
let offset = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Get the button element
    var viewAllBooksBtn = document.querySelector('.btn');
    if (viewAllBooksBtn) {

        // Add an event listener to the button
        viewAllBooksBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
    
            // Construct the API URL with .json appended
            var apiUrl = 'https://openlibrary.org/search.json?title=the+lord+of+the+rings&offset='+offset+'&limit=4';
    
            // Fetch data from the Open Library API
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => { 
                    const container = document.getElementById("books-container");
                    data.docs.forEach((book) => {
                        let item = document.createElement("div");
                        item.classList.add("item");
                        item.innerHTML='<img src="img/lord1.jpeg" alt="The Fellowship of the ring"><h3>'+book.title+'</h3><p>'+book.author_name[0]+'</p><p>$19.99</p>'
                        container.append(item)
                    })
                    offset += 4;
                })
                .catch(error => {
                    console.error('Error fetching book data:', error);
                });
        });
    }

});


