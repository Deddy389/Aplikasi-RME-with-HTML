// References for Biostatistik input fields
const pasienIdInput = document.getElementById('pasienId');
const usiaInput = document.getElementById('usia');
const jenisKelaminSelect = document.getElementById('jenisKelamin');
const diagnosisSelect = document.getElementById('diagnosis');
const tambahDataBtn = document.getElementById('tambahDataBtn');

// Get table body and stats div
const dataPasienTableBody = document.querySelector('#dataPasienTable tbody');
const diagnosisStatsDiv = document.getElementById('diagnosisStats');
const noStatsMessage = document.getElementById('noStatsMessage'); // NEW

// Reference for the Chart.js canvas
const diagnosisPieChartCanvas = document.getElementById('diagnosisPieChart');
let diagnosisChart = null; // To hold the Chart.js instance

// NEW: Reference for the percentage list
const diagnosisPercentageList = document.getElementById('diagnosisPercentageList');


// Dummy data for storing patient records in localStorage
let pasienData = JSON.parse(localStorage.getItem('pasienData')) || [];


// Function to add new patient data
function addPasienData() {
    const id = pasienIdInput.value.trim();
    const usia = parseInt(usiaInput.value);
    const jenisKelamin = jenisKelaminSelect.value;
    const diagnosis = diagnosisSelect.value;

    if (id && !isNaN(usia) && usia > 0 && diagnosis) {
        pasienData.push({ id, usia, jenisKelamin, diagnosis });
        localStorage.setItem('pasienData', JSON.stringify(pasienData)); // Save to localStorage

        renderPasienData();
        calculateAndDisplayStats();

        // Clear form fields
        pasienIdInput.value = '';
        usiaInput.value = '';
        jenisKelaminSelect.value = 'L';
        diagnosisSelect.value = 'K35-Appendicitis';

    } else {
        alert('Harap lengkapi semua data pasien dengan benar.');
    }
}

// Function to render patient data in the table
function renderPasienData() {
    dataPasienTableBody.innerHTML = ''; // Clear existing table data

    if (pasienData.length === 0) {
        // Optionally, hide the table if no data
        // dataPasienTable.style.display = 'none';
        return;
    }
    // dataPasienTable.style.display = 'table'; // Show table if data exists

    pasienData.forEach(pasien => {
        const row = dataPasienTableBody.insertRow();
        row.insertCell().textContent = pasien.id;
        row.insertCell().textContent = pasien.usia;
        row.insertCell().textContent = pasien.jenisKelamin;
        row.insertCell().textContent = pasien.diagnosis;
    });
}

// Function to calculate and display statistics
function calculateAndDisplayStats() {
    // Hide "no data" message if there is data, show if not
    if (pasienData.length === 0) {
        noStatsMessage.style.display = 'block';
        diagnosisPercentageList.innerHTML = ''; // Clear percentage list
        if (diagnosisChart) {
            diagnosisChart.destroy();
            diagnosisChart = null;
        }
        return;
    } else {
        noStatsMessage.style.display = 'none';
    }


    const diagnosisCounts = {};
    pasienData.forEach(pasien => {
        diagnosisCounts[pasien.diagnosis] = (diagnosisCounts[pasien.diagnosis] || 0) + 1;
    });

    const totalCases = pasienData.length;

    let statsHtml = '';
    const chartLabels = [];
    const chartData = [];
    const chartBackgroundColors = []; // For pie chart colors

    // Clear previous percentage list
    diagnosisPercentageList.innerHTML = '';

    // Convert counts to percentages and build the list and chart data
    for (const diagnosis in diagnosisCounts) {
        const count = diagnosisCounts[diagnosis];
        const percentage = ((count / totalCases) * 100).toFixed(1); // One decimal place
        
        // Add to the percentage list
        const listItem = document.createElement('li');
        listItem.textContent = `${diagnosis}: ${count} kasus (${percentage}%)`;
        diagnosisPercentageList.appendChild(listItem);

        // Add to chart data
        chartLabels.push(diagnosis);
        chartData.push(count);
        // Generate a random color for the pie chart slice
        chartBackgroundColors.push(`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`);
    }

    // Update Chart.js (or create if not exists)
    if (diagnosisChart) {
        diagnosisChart.data.labels = chartLabels;
        diagnosisChart.data.datasets[0].data = chartData;
        diagnosisChart.data.datasets[0].backgroundColor = chartBackgroundColors;
        diagnosisChart.update();
    } else {
        diagnosisChart = new Chart(diagnosisPieChartCanvas, {
            type: 'pie',
            data: {
                labels: chartLabels,
                datasets: [{
                    data: chartData,
                    backgroundColor: chartBackgroundColors,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false,
                        text: 'Distribusi Diagnosis'
                    }
                }
            }
        });
    }
}


// Add event listener for "Tambah Data" button in Biostatistik
tambahDataBtn.addEventListener('click', addPasienData);


// Initialize: render data and calculate stats when the Biostatistik page loads
document.addEventListener('DOMContentLoaded', () => {
    renderPasienData();
    calculateAndDisplayStats();
});