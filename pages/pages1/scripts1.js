function changeSlide(newImagePath, clickedThumbnail) {
            const mainImage = document.getElementById('mainSliderImage');
            mainImage.src = newImagePath;

            const thumbnails = document.querySelectorAll('.thumbnail-gallery-column img');
            thumbnails.forEach(img => img.classList.remove('active'));
            if (clickedThumbnail) {
                clickedThumbnail.classList.add('active');
            }
        }
        
        document.addEventListener('DOMContentLoaded', (event) => {
            const firstThumbnail = document.querySelector('.thumbnail-gallery-column img');
            if (firstThumbnail) {
                firstThumbnail.classList.add('active');
            }
        });