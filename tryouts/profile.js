document.getElementById('upload-pfp').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-pic').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// Adding hover effect for a smooth user experience
document.getElementById('profile-pic').addEventListener('mouseover', function() {
    this.style.borderColor = '#007bff';
});

document.getElementById('profile-pic').addEventListener('mouseout', function() {
    this.style.borderColor = '#ddd';
});
