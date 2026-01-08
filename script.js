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

    // Select all clickable items (icons, patterns, illustrations)
    const clickableItems = document.querySelectorAll(
        '.icon-slot:not(.empty), .pattern-tile img, .illustration-mockup img, .divider-sample img'
    );

    // Open lightbox when clicking any asset
    clickableItems.forEach(item => {
        item.addEventListener('click', () => {
            let img;
            
            // Handle different element types
            if (item.tagName === 'IMG') {
                img = item;
            } else {
                img = item.querySelector('img');
            }

            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Also handle icon slots (which contain images)
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

    // Close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});
