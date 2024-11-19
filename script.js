document.addEventListener('DOMContentLoaded', () => {
    const { jsPDF } = window.jspdf;

    // Signature pad setup
    const canvas = document.getElementById('signature-pad');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    // Functions for drawing signature
    canvas.addEventListener('mousedown', () => (isDrawing = true));
    canvas.addEventListener('mouseup', () => (isDrawing = false));
    canvas.addEventListener('mousemove', draw);

    function draw(event) {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';
        ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
    }

    // Clear the canvas
    document.getElementById('clear-signature').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Generate PDF
    document.getElementById('submit-btn').addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const doc = new jsPDF();

        // Add header and form data
        doc.setFontSize(18);
        doc.text('Submission Details', 10, 10);
        doc.setFontSize(12);
        doc.text(`Name: ${name}`, 10, 30);
        doc.text(`Email: ${email}`, 10, 40);
        doc.text('Message:', 10, 50);
        doc.text(message, 10, 60, { maxWidth: 180 });

        // Add e-signature
        const signatureDataURL = canvas.toDataURL('image/png');
        if (signatureDataURL) {
            doc.text('Signature:', 10, 100);
            doc.addImage(signatureDataURL, 'PNG', 10, 110, 60, 20); // Adjust dimensions as needed
        }

        // Save PDF
        doc.save('form-submission-with-signature.pdf');
    });
});
