document.addEventListener("DOMContentLoaded", function () {
    const resumeContainer = document.getElementById("resume-container");

    // Retrieve resume content from localStorage
    const savedResume = localStorage.getItem("savedResume");
    
    // Display saved content or a default message
    resumeContainer.innerHTML = savedResume ? savedResume : "<p>No resume content available.</p>";
});

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    const resumeContainer = document.getElementById("resume-container");

    // Convert HTML to PDF using higher resolution and correct formatting
    html2canvas(resumeContainer, {
        scale: 3, // Increase scale for better resolution
        useCORS: true, // Allow images to render properly
        logging: false
    }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const xOffset = 10; // Moves text 10mm to the right
        const yOffset = 10; // Keeps default vertical positioning

        // Add the image to the PDF
        doc.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);

        // Save the PDF
        doc.save("Resume_Lauren_Dwyer.pdf");
    });
}