document.addEventListener('DOMContentLoaded', () => {
    // Pack data store - edit this to update pack contents
    const packData = {
        simple: {
            title: 'Simple MCM',
            desc: 'Clean lines, minimal detail, timeless forms',
            icons: [
                { src: 'images/simple/icon-01.png', alt: 'Simple MCM icon 1' },
                { src: 'images/simple/icon-02.png', alt: 'Simple MCM icon 2' },
                { src: 'images/simple/icon-03.png', alt: 'Simple MCM icon 3' },
                { src: 'images/simple/icon-04.png', alt: 'Simple MCM icon 4' },
                { src: 'images/simple/icon-05.png', alt: 'Simple MCM icon 5' },
                { src: 'images/simple/icon-06.png', alt: 'Simple MCM icon 6' },
                { src: 'images/simple/icon-07.png', alt: 'Simple MCM icon 7' },
                { src: 'images/simple/icon-08.png', alt: 'Simple MCM icon 8' },
                null // empty slot
            ]
        },
        graphic: {
            title: 'Graphic MCM',
            desc: 'Bold shapes, high contrast, atomic-age flair',
            icons: [
                { src: 'images/graphic/icon-01.png', alt: 'Graphic MCM icon 1' },
                { src: 'images/graphic/icon-02.png', alt: 'Graphic MCM icon 2' },
                { src: 'images/graphic/icon-03.png', alt: 'Graphic MCM icon 3' },
                { src: 'images/graphic/icon-04.png', alt: 'Graphic MCM icon 4' },
                { src: 'images/graphic/icon-05.png', alt: 'Graphic MCM icon 5' },
                null, // empty slot
                null, // empty slot
                null, // empty slot
                null  // empty slot
            ]
        },
        geometric: {
            title: 'Geometric',
            desc: 'Mathematical precision, abstract compositions',
            icons: [
                { src: 'images/geometric/icon-01.png', alt: 'Geometric icon 1' },
                { src: 'images/geometric/icon-02.png', alt: 'Geometric icon 2' },
                { src: 'images/geometric/icon-03.png', alt: 'Geometric icon 3' },
                null, // empty slot
                null, // empty slot
                null, // empty slot
                null, // empty slot
                null, // empty slot
                null  // empty slot
            ]
        }
    };

    // DOM Elements
    const packNavBtns = document.querySelectorAll('.pack-nav-btn');
    const packCards = document.querySelectorAll('.pack-card');
    const packModal = document.getElementById('pack-modal');
    const packModalClose = document.getElementById('pack-modal-close');
    const modalTitle = document.getElementById('modal-pack-title');
    const modalDesc = document.getElementById('modal-pack-desc');
    const modalIconGrid = document.getElementById('modal-icon-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    // Pack filtering
    packNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            packNavBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter packs
            const filter = btn.dataset.pack;
            packCards.forEach(card => {
                if (filter === 'all' || card.dataset.pack === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Open pack modal
    document.querySelectorAll('.pack-expand-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.pack-card');
            const packKey = card.dataset.pack;
            const pack = packData[packKey];

            if (!pack) return;

            // Set modal header
            modalTitle.textContent = pack.title;
            modalDesc.textContent = pack.desc;

            // Build icon grid
            modalIconGrid.innerHTML = '';
            pack.icons.forEach((icon, index) => {
                const slot = document.createElement('div');
                
                if (icon) {
                    slot.className = 'icon-slot';
                    const img = document.createElement('img');
                    img.src = icon.src;
                    img.alt = icon.alt;
                    slot.appendChild(img);
                    
                    // Click to open lightbox
                    slot.addEventListener('click', () => {
                        lightboxImg.src = icon.src;
                        lightboxImg.alt = icon.alt;
                        lightbox.classList.add('active');
                    });
                } else {
                    slot.className = 'icon-slot empty';
                }
                
                modalIconGrid.appendChild(slot);
            });

            // Show modal
            packModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close pack modal
    const closePackModal = () => {
        packModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    packModalClose.addEventListener('click', closePackModal);

    packModal.addEventListener('click', (e) => {
        if (e.target === packModal) {
            closePackModal();
        }
    });

    // Lightbox functionality
    const closeLightbox = () => {
        lightbox.classList.remove('active');
    };

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (lightbox.classList.contains('active')) {
                closeLightbox();
            } else if (packModal.classList.contains('active')) {
                closePackModal();
            }
        }
    });

    // Optional: Click on pack card preview to open modal (not just button)
    document.querySelectorAll('.pack-preview').forEach(preview => {
        preview.style.cursor = 'pointer';
        preview.addEventListener('click', () => {
            const btn = preview.closest('.pack-card').querySelector('.pack-expand-btn');
            btn.click();
        });
    });
});