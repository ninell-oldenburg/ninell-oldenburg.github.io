document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const loader = document.getElementById('loader');

    let page = 1;
    let lastImageBottom = 0; // Track the bottom position of the last loaded image

    // Function to load content
    function loadContent() {
        loader.style.display = 'block';

        fetch('/random-image')
            .then(response => response.json())
            .then(data => {
                const imageContainer = document.createElement('div');
                imageContainer.className = 'image-container';

                const image = document.createElement('img');
                image.src = data.url;
                image.alt = `Random Image`;

                imageContainer.appendChild(image);
                content.appendChild(imageContainer);

                // Update lastImageBottom after the image has been added to the DOM
                lastImageBottom = imageContainer.offsetTop + imageContainer.offsetHeight;

                loader.style.display = 'none';
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Load initial content
    loadContent();

    // Event listener for scrolling
    window.addEventListener('scroll', () => {
        // Calculate how far the user has scrolled from the top
        const scrollY = window.scrollY || window.pageYOffset;

        // Calculate the position 500px below the last loaded image
        const limitScroll = lastImageBottom - window.innerHeight + 500;

        // Load more content if the scroll position is within the limit
        if (scrollY >= limitScroll) {
            loadContent();
        }
    });
});
