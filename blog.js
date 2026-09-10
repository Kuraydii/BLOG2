// Navigation Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Like Button Toggle
const likeBtn = document.getElementById('likeBtn');
const likeCount = document.getElementById('likeCount');
let isLiked = false;

if (likeBtn && likeCount) {
    likeBtn.addEventListener('click', () => {
        let currentLikes = parseInt(likeCount.innerText);
        if (!isLiked) {
            likeCount.innerText = currentLikes + 1;
            likeBtn.classList.add('liked');
            isLiked = true;
        } else {
            likeCount.innerText = currentLikes - 1;
            likeBtn.classList.remove('liked');
            isLiked = false;
        }
    });
}

// Copy Article Link Functionality
function copyURL() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Article link copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy URL: ', err);
    });
}

// Dynamic Comment Posting
const commentForm = document.getElementById('commentForm');
const commentsList = document.getElementById('commentsList');

if (commentForm && commentsList) {
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('commenterName');
        const textInput = document.getElementById('commentText');

        if (nameInput.value.trim() === '' || textInput.value.trim() === '') return;

        const newComment = document.createElement('div');
        newComment.classList.add('comment-card');

        newComment.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">${escapeHTML(nameInput.value)}</span>
                <span class="comment-time">Just now</span>
            </div>
            <p class="comment-content">${escapeHTML(textInput.value)}</p>
        `;

        commentsList.prepend(newComment);

        nameInput.value = '';
        textInput.value = '';
    });
}

// Helper function to sanitize comment inputs
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}