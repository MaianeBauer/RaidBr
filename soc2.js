document.addEventListener('DOMContentLoaded', () => {
    const timelineMarkers = document.querySelectorAll('.timeline-marker');

    timelineMarkers.forEach(marker => {
        marker.addEventListener('mouseenter', () => {
            const parentItem = marker.closest('.timeline-item');

            document.querySelectorAll('.timeline-item').forEach(item => {
                item.classList.remove('active');
            });

            if (parentItem) {
                parentItem.classList.add('active');
            }
        });

        marker.addEventListener('mouseleave', () => {
            const parentItem = marker.closest('.timeline-item');
            if (parentItem) {
                parentItem.classList.remove('active');
            }
        });
    });
});