const form = document.createElement('form');
form.classList.add('row', 'g-3');

const formGroup1 = document.createElement('div');
formGroup1.classList.add('col-md-9');

const label1 = document.createElement('label');
label1.setAttribute('for', 'data');
label1.classList.add('form-label');
label1.textContent = 'Data :';

const input1 = document.createElement('input');
input1.setAttribute('for', 'data');
input1.classList.add('form-control');
input1.setAttribute('id', 'data');
input1.style.borderColor = 'black';

// Create Image Width input field
const widthLabel = document.createElement('label');
widthLabel.setAttribute('for', 'width');
widthLabel.textContent = 'Image Width: ';
widthLabel.style.paddingRight="10px";
const widthInput = document.createElement('input');
widthInput.setAttribute('type', 'number');
widthInput.id = 'width';

// Create Image Height input field
const heightLabel = document.createElement('label');
heightLabel.setAttribute('for', 'height');
heightLabel.textContent = 'Image Height: ';
heightLabel.style.padding = "20px";
const heightInput = document.createElement('input');
heightInput.setAttribute('type', 'number');
heightInput.id = 'height';

// Append the label and input elements to the first form group div


// Append the form to the document body or any desired container

const mainContainer = document.createElement('div');
mainContainer.className = 'container';

const heading = document.createElement('h1');
heading.textContent = 'QR Code Generator';
heading.style.display='flex';
heading.style.alignItems='center';
heading.style.justifyContent='center';

// Create the input section
const inputSection = document.createElement('div');
inputSection.className = 'input-section';

inputSection.style.color = "#white";
inputSection.style.background = "#white";





// Create QR Image Format dropdown
const formatLabel = document.createElement('label');
formatLabel.setAttribute('for', 'format');
formatLabel.textContent = 'QR Image Format: ';
formatLabel.style.paddingRight="10px";
const formatSelect = document.createElement('select');
formatSelect.id = 'format';



const formatOptions = ['jpg', 'png', 'svg', "eps", "jpeg", "gif"];
formatOptions.forEach((format) => {
    const option = document.createElement('option');
    option.value = format;
    option.textContent = format.toUpperCase();
    formatSelect.appendChild(option);
});

// Create QR Code Color input
const qrColorLabel = document.createElement('label');
qrColorLabel.setAttribute('for', 'qrColor');
qrColorLabel.textContent = 'QR Code Color: ';
qrColorLabel.style.paddingTop = "20px";
qrColorLabel.style.paddingRight="10px";
const qrColorInput = document.createElement('input');
qrColorInput.setAttribute('type', 'color');
qrColorInput.id = 'qrColor';

// Create Background Color input
const bgColorLabel = document.createElement('label');
bgColorLabel.setAttribute('for', 'bgColor');
bgColorLabel.textContent = 'Background Color: ';
bgColorLabel.style.paddingRight="10px";
const bgColorInput = document.createElement('input');
bgColorInput.setAttribute('type', 'color');
bgColorInput.id = 'bgColor';

// Create Generate button
const generateButton = document.createElement('button');
generateButton.textContent = 'Generate';
generateButton.id = 'generate';
generateButton.style.margin = "10px";

// Create Download button
const downloadButton = document.createElement('button');
downloadButton.textContent = 'Download';
downloadButton.id = 'download';
downloadButton.disabled = true;

// Create QR code container
const qrCodeContainer = document.createElement('div');
qrCodeContainer.className = 'qr-code';

// Create QR code image
const qrCodeImage = document.createElement('img');
qrCodeImage.id = 'qrCodeImage';
qrCodeImage.src = '';
qrCodeImage.alt = '';

formGroup1.appendChild(label1);
formGroup1.appendChild(input1);
formGroup1.appendChild(document.createElement('br'));
formGroup1.appendChild(widthLabel);
formGroup1.appendChild(widthInput);
formGroup1.appendChild(heightLabel);
formGroup1.appendChild(heightInput);
formGroup1.appendChild(document.createElement('br'));
formGroup1.appendChild(formatLabel);
formGroup1.appendChild(formatSelect);
formGroup1.appendChild(document.createElement('br'));
formGroup1.appendChild(qrColorLabel);
formGroup1.appendChild(qrColorInput);

// Append the first form group div to the form
form.appendChild(formGroup1);

// Append all elements to the main container
inputSection.append(
    form,
    document.createElement('br'),
    bgColorLabel,
    bgColorInput,
    document.createElement('br'),
    generateButton,
    downloadButton
);

qrCodeContainer.appendChild(qrCodeImage);

mainContainer.append(heading, inputSection, qrCodeContainer);

document.body.appendChild(mainContainer);


document.getElementById('generate').addEventListener('click', generateQRCode);



document.getElementById('download').addEventListener('click', downloadQRCode);
function generateQRCode() {
    const data = document.getElementById('data').value;
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    const format = document.getElementById('format').value;
    const qrColor = document.getElementById('qrColor').value;
    const bgColor = document.getElementById('bgColor').value;

    // Construct the URL for the QR code API
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${width}x${height}&data=${encodeURIComponent(data)}&color=${qrColor.substring(1)}&bgcolor=${bgColor.substring(1)}&format=${format}`;

    // Update the QR code image
    const qrCodeImage = document.getElementById('qrCodeImage');
    qrCodeImage.src = apiUrl;

    // Enable the download button
    const downloadButton = document.getElementById('download');
    downloadButton.disabled = false;
}

// Function to handle QR code download
function downloadQRCode() {
    const qrCodeImage = document.getElementById('qrCodeImage');
    const format = document.getElementById('format').value;

    fetch(qrCodeImage.src)
        .then(response => response.blob())
        .then(blob => {

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `qrcode.${format}`;

            a.click();

            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error downloading QR code:', error);
        });
}


