// References for Biostatistik input fields
const pasienIdInput = document.getElementById('pasienId');
const usiaInput = document.getElementById('usia');
const jenisKelaminSelect = document.getElementById('jenisKelamin');
const diagnosisSelect = document.getElementById('diagnosis');
const tambahDataBtn = document.getElementById('tambahDataBtn');

// Dummy data for Biostatistik (for demonstration purposes)
// Menggunakan localStorage untuk menyimpan data agar tidak hilang saat refresh
let pasienData = JSON.parse(localStorage.getItem('pasienData')) || [];
//let pasienData = []; // Array to store patient data

// Get table body and stats div
const dataPasienTableBody = document.querySelector('#dataPasienTable tbody');
const diagnosisStatsDiv = document.getElementById('diagnosisStats');

// Reference for the Chart.js canvas
//const ctx = document.getElementById('diagnosisPieChart').getContext('2d');
const diagnosisPieChartCanvas = document.getElementById('diagnosisPieChart');
const ctx = diagnosisPieChartCanvas.getContext('2d'); // Pastikan ini tidak null!
let diagnosisChart; // Variable to hold the Chart.js instance


// Functions for Biostatistik Page
function addPasienData() {
    const id = pasienIdInput.value.trim();
    const usia = parseInt(usiaInput.value);
    const jenisKelamin = jenisKelaminSelect.value;
    const diagnosis = diagnosisSelect.value;

    if (id && !isNaN(usia) && usia > 0 && diagnosis) {
        pasienData.push({ id, usia, jenisKelamin, diagnosis });
        renderPasienData();
        calculateAndDisplayStats(); // Update both list and chart
        // Clear form fields
        pasienIdInput.value = '';
        usiaInput.value = '';
        jenisKelaminSelect.value = 'L';
        diagnosisSelect.value = 'K35-Appendicitis';
    } else {
        alert('Harap lengkapi semua data pasien dengan benar.');
    }
}

function renderPasienData() {
    dataPasienTableBody.innerHTML = ''; // Clear existing table rows
    pasienData.forEach(pasien => {
        const row = dataPasienTableBody.insertRow();
        row.insertCell().textContent = pasien.id;
        row.insertCell().textContent = pasien.usia;
        row.insertCell().textContent = pasien.jenisKelamin;
        row.insertCell().textContent = pasien.diagnosis;
    });
}

function calculateAndDisplayStats() {
    const stats = {};
    if (pasienData.length === 0) {
        // Jika tidak ada data, sembunyikan canvas dan tampilkan pesan
        diagnosisPieChartCanvas.style.display = 'none';
        diagnosisStatsDiv.querySelector('p').style.display = 'block'; // Tampilkan pesan
        if (diagnosisChart) {
            diagnosisChart.destroy(); // Hancurkan chart yang ada
            diagnosisChart = null;
        }
        return;


    // if (pasienData.length === 0) {
    //     diagnosisStatsDiv.innerHTML = '<p>Belum ada data pasien untuk dihitung statistiknya.</p><div style="width: 400px; margin: 20px auto;"><canvas id="diagnosisPieChart"></canvas></div>'; // Reset HTML if no data
    //     if (diagnosisChart) {
    //         diagnosisChart.destroy(); // Destroy existing chart if no data
    //         diagnosisChart = null;
    //     }
    //     return;
    }

    // Jika ada data, tampilkan canvas dan sembunyikan pesan
    diagnosisPieChartCanvas.style.display = 'block';
    diagnosisStatsDiv.querySelector('p').style.display = 'none'; // Sembunyikan pesan

    pasienData.forEach(pasien => {
        stats[pasien.diagnosis] = (stats[pasien.diagnosis] || 0) + 1;
    });

    // Prepare data for Chart.js
    const labels = Object.keys(stats);
    const dataValues = Object.values(stats);

    // Generate random distinct colors for the pie chart
    const backgroundColors = labels.map(() => `hsl(${Math.random() * 360}, 70%, 60%)`);
    const borderColors = labels.map(() => `hsl(${Math.random() * 360}, 70%, 50%)`);


    // Destroy existing chart if it exists to prevent overlap
    if (diagnosisChart) {
        diagnosisChart.destroy();
    }

    // Create new chart
    diagnosisChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: dataValues,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Distribusi Diagnosis Pasien'
                }
            }
        }
    });

    // Optionally, keep the list representation as well
    // let statsHtml = '<h4>Jumlah Kasus per Diagnosis:</h4><ul>';
    // for (const diagnosis in stats) {
    //     statsHtml += `<li>${diagnosis}: ${stats[diagnosis]} kasus</li>`;
    // }
    // statsHtml += '</ul>';
    // diagnosisStatsDiv.innerHTML = statsHtml + diagnosisStatsDiv.innerHTML; // Append list to existing content
}


// Event listener for "Tambah Data" button in Biostatistik
tambahDataBtn.addEventListener('click', addPasienData);

// Initialize: render data and stats when the Biostatistik page loads
document.addEventListener('DOMContentLoaded', () => {
    // We don't need to call renderPasienData() or calculateAndDisplayStats() here
    // directly, as they will be called when data is added.
    // However, if you load initial data, you'd call them here.
    // For now, ensure the chart is initialized empty if no data.
    calculateAndDisplayStats(); // Call once to initialize empty chart or with loaded data
});