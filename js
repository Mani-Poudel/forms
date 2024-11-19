document.getElementById('submit-btn').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create a new PDF document
    const doc = new jsPDF();

    // Add content to the PDF
    doc.text('Form Submission', 10, 10);
    doc.text(`Name: ${name}`, 10, 20);
    doc.text(`Email: ${email}`, 10, 30);
    doc.text('Message:', 10, 40);
    doc.text(message, 10, 50);

    // Save the PDF
    doc.save('form-submission.pdf');
});
