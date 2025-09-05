 // Video Modal
 const videoLinks = document.querySelectorAll('.video-link');
 const videoModal = document.getElementById('videoModal');
 const closeVideo = document.querySelector('.close-video');
 const iframe = document.getElementById('youtubeIframe');
 
 // Open modal when clicking on video link
 videoLinks.forEach(link => {
     link.addEventListener('click', function(e) {
         e.preventDefault();
         const videoId = this.getAttribute('data-video-id');
         iframe.src = `https://www.youtube.com/embed/TP8N1a-edBE?autoplay=1&rel=0`;
         videoModal.style.display = 'block';
         document.body.classList.add('no-scroll');
     });
 });
 
 // Close modal when clicking on close button
 closeVideo.addEventListener('click', function() {
     videoModal.style.display = 'none';
     iframe.src = '';
     document.body.classList.remove('no-scroll');
 });
 
 // Close modal when clicking outside of it
 window.addEventListener('click', function(e) {
     if (e.target == videoModal) {
         videoModal.style.display = 'none';
         iframe.src = '';
         document.body.classList.remove('no-scroll');
     }
 });
 
 // Close modal with Escape key
 document.addEventListener('keydown', function(e) {
     if (e.key === 'Escape' && videoModal.style.display === 'block') {
         videoModal.style.display = 'none';
         iframe.src = '';
         document.body.classList.remove('no-scroll');
     }
 });