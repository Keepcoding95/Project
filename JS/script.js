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



let offset = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Get the button element
    var viewAllBooksBtn = document.querySelector('.btn');
    if (viewAllBooksBtn) {

        // Add an event listener to the button
        viewAllBooksBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior

            // Construct the API URL with .json appended
            var apiUrl = 'https://openlibrary.org/search.json?title=the+lord+of+the+rings&offset=' + offset + '&limit=4';

            // Fetch data from the Open Library API
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const container = document.getElementById("books-container");
                    data.docs.forEach((book) => {
                        let item = document.createElement("div");
                        item.classList.add("item");
                        item.innerHTML = '<img src="img/lord1.jpeg" alt="The Fellowship of the ring"><h3>' + (book.title ? book.title : 'Unknown Title') + '</h3>';

                        // Check if author_name exists and has elements
                        if (book.author_name && book.author_name.length > 0) {
                            item.innerHTML += '<p>' + book.author_name[0] + '</p>';
                        } else {
                            item.innerHTML += '<p>Unknown Author</p>';
                        }

                        item.innerHTML += '<p>$19.99</p>';
                        container.append(item);
                    })
                    offset += 4;
                })
                .catch(error => {
                    console.error('Error fetching book data:', error);
                });
        });
    }
});

