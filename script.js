document.getElementById('submit-btn').addEventListener('click', async () => {
    const { jsPDF } = window.jspdf;

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create a new PDF document
    const doc = new jsPDF();

    // Add a logo (ensure your logo file is in the same directory or use a URL)
    const logo = await loadImage('logo.png'); // Replace with your logo path or URL
    doc.addImage(logo, 'PNG', 10, 10, 30, 30); // x, y, width, height

    // Add header
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Submission Details', 50, 25); // x, y

    // Draw a line below the header
    doc.setLineWidth(0.5);
    doc.line(10, 40, 200, 40); // x1, y1, x2, y2

    // Add form details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${name}`, 10, 50);
    doc.text(`Email: ${email}`, 10, 60);
    doc.text('Message:', 10, 70);
    doc.text(message, 10, 80, { maxWidth: 190 });

    // Footer
    doc.setFontSize(10);
    doc.text('Generated on: ' + new Date().toLocaleString(), 10, 280);
    doc.text('Company Name © 2024', 150, 280);

    // Save the PDF
    doc.save('form-submission.pdf');
});

// Utility function to load an image
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
        img.src = url;
    });
}
