document.addEventListener('DOMContentLoaded', () => {
    // =======================================
    // CATEGORY TAB NAVIGATION
    // =======================================
    const categoryTabs = document.querySelectorAll('.category-tab');
    const categorySections = document.querySelectorAll('.category-section');

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetCategory = tab.dataset.category;

            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show corresponding section
            categorySections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `category-${targetCategory}`) {
                    section.classList.add('active');
                }
            });
        });
    });

    // =======================================
    // LIGHTBOX FUNCTIONALITY
    // =======================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    // Close lightbox function (defined early so it can be used by patterns)
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Open lightbox for icon slots
    const iconSlots = document.querySelectorAll('.icon-slot:not(.empty)');
    iconSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            const img = slot.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox on X button
    lightboxClose.addEventListener('click', closeLightbox);

    // Close lightbox on backdrop click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close lightbox on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // =======================================
    // PATTERN TILE LOADING
    // =======================================
    const patternPreviews = document.querySelectorAll('.pattern-preview');

    patternPreviews.forEach(preview => {
        const patternSrc = preview.dataset.pattern;
        if (patternSrc) {
            // Apply the pattern as a tiled background
            preview.style.backgroundImage = `url('${patternSrc}')`;

            // Click to view the original tile in lightbox
            preview.addEventListener('click', () => {
                lightboxImg.src = patternSrc;
                lightboxImg.alt = 'Pattern tile';
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });
});