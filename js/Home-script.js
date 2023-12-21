document.addEventListener('DOMContentLoaded', (event) => {
    let currentImageIndex = 0;
    let images = document.querySelectorAll('.carousel-image');

    function changeImage(direction) {
        images[currentImageIndex].style.display = 'none';
        currentImageIndex += direction;

        if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        }

        images[currentImageIndex].style.display = 'block';
    }

    setInterval(() => {
        changeImage(1);
    }, 3000); // Change image every 3000 milliseconds (3 seconds)

    function showMoreInfo() {
    var moreInfo = document.getElementById("moreInfo");
    if (moreInfo.style.opacity === "0" || moreInfo.style.opacity === "") {
        moreInfo.style.opacity = 1;
        moreInfo.style.visibility = "visible";
        moreInfo.style.height = "auto"; // Adjust as needed
        moreInfo.style.overflow = "visible";
    } else {
        moreInfo.style.opacity = 0;
        moreInfo.style.visibility = "hidden";
        moreInfo.style.height = 0;
        moreInfo.style.overflow = "hidden";
    }
}


    // Attach event handlers if needed
    // Example: document.getElementById("yourButtonId").onclick = showMoreInfo;
});
