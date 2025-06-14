// Get references to the sections
const homePage = document.getElementById('home-page');
const icd10SearchPage = document.getElementById('icd10-search-page');
const inputPasienBaruPage = document.getElementById('input-pasien-baru-page');
const riwayatPasienPage = document.getElementById('riwayat-pasien-page');

const searchResultsContainer = document.getElementById('search-results-container');
const icdCodeInput = document.getElementById('icdCodeInput');

// Get references to the buttons
const btnIcd10Search = document.getElementById('btn-icd10-search');
const btnInputPasienBaru = document.getElementById('btn-input-pasien-baru');
const btnLihatRiwayatPasien = document.getElementById('btn-lihat-riwayat-pasien');

const btnBackToHomeIcd = document.getElementById('btn-back-to-home-icd');
const btnBackToHomePasienBaru = document.getElementById('btn-back-to-home-pasien-baru');
const btnBackToHomeRiwayat = document.getElementById('btn-back-to-home-riwayat');

// References to display elements for ICD-10 search results
const icdCodeDisplay = document.getElementById('icd-code-display');
const penjelasanUmumDisplay = document.getElementById('penjelasan-umum-display');
const kategoriBabDisplay = document.getElementById('kategori-bab-display');
const organTerkaitDisplay = document.getElementById('organ-terkait-display');
const definisiPenyakitDisplay = document.getElementById('definisi-penyakit-display');
const kategoriPenyakitDisplay = document.getElementById('kategori-penyakit-display');
const kaidahKodingDisplay = document.getElementById('kaidah-koding-display');
const panduanList = document.getElementById('panduan-list');

// References for Input Pasien Baru fields
const namaPasienInput = document.getElementById('namaPasien');
const nikInput = document.getElementById('nik');
const tanggalLahirInput = document.getElementById('tanggalLahir');
const diagnosisPasienBaruInput = document.getElementById('diagnosisPasienBaru');
const simpanPasienBtn = document.getElementById('simpanPasienBtn');

// References for "Data Pasien Tersimpan" section
const dataPasienTersimpanContainer = document.getElementById('data-pasien-tersimpan-container');
const lastSavedPasienData = document.getElementById('last-saved-pasien-data');


// References for Riwayat Data Pasien
const riwayatListContainer = document.getElementById('riwayat-list-container');
const noRiwayatMessage = document.getElementById('no-riwayat-message');


// Dummy data for ICD-10 demonstration
// Perluas dummy data agar mencakup lebih banyak diagnosis yang bisa dicari
const dummyICDData = {
    "a00": {
        "kode_icd": "A00",
        "penjelasan_umum": "Kolera",
        "kategori_bab": "Bab I - Penyakit Infeksi dan Parasit Tertentu.",
        "organ_terkait": "Usus",
        "definisi_penyakit": "Penyakit diare akut yang disebabkan oleh infeksi bakteri Vibrio cholerae.",
        "kategori_penyakit": "PM (Penyakit Menular)",
        "kaidah_koding": "Gunakan kode tambahan untuk komplikasi.",
        "panduan_klinis": [
            "- S (Hasil Anamnesis): Diare cair parah, muntah, dehidrasi.",
            "- O (Hasil Pemeriksaan Fisik dan Penunjang Sederhana): Turgor kulit menurun, mata cekung, hipotensi.",
            "- A (Penegakan Diagnosis): Kolera akut.",
            "- P (Penatalaksanaan Komprehensif): Rehidrasi oral/intravena, antibiotik (jika diperlukan)."
        ],
        "diagnosa_keyword": "kolera" // Keyword untuk pencarian diagnosa
    },
    "b20": { // Changed key from "b2" to "b20" to match actual ICD code
        "kode_icd": "B20",
        "penjelasan_umum": "Infeksi HIV, fase lanjut",
        "kategori_bab": "Bab I - Penyakit Infeksi dan Parasit Tertentu.",
        "organ_terkait": "Sistem kekebalan tubuh",
        "definisi_penyakit": "Infeksi HIV dengan gejala lanjut atau infeksi opportunistik.",
        "kategori_penyakit": "PM (Penyakit Menular)",
        "kaidah_koding": "Gunakan jika ada manifestasi AIDS atau jumlah CD4 <200.",
        "panduan_klinis": [
            "- S (Hasil Anamnesis): Demam kronis, penurunan berat badan, sariawan.",
            "- O (Hasil Pemeriksaan Fisik dan Penunjang Sederhana): CD4 <200, kandidiasis oral.",
            "- A (Penegakan Diagnosis): HIV tahap AIDS.",
            "- P (Penatalaksanaan Komprehensif): ART (antiretroviral therapy), terapi suportif, konseling."
        ],
        "diagnosa_keyword": "hiv" // Keyword untuk pencarian diagnosa
    },
    "j18": {
        "kode_icd": "J18",
        "penjelasan_umum": "Pneumonia, organisme tidak spesifik",
        "kategori_bab": "Bab X - Penyakit Sistem Pernapasan.",
        "organ_terkait": "Paru-paru",
        "definisi_penyakit": "Inflamasi paru-paru yang menyebabkan alveoli terisi cairan.",
        "kategori_penyakit": "Non-PM (Non Penyakit Menular)",
        "kaidah_koding": "Gunakan kode tambahan untuk identifikasi agen penyebab jika diketahui.",
        "panduan_klinis": [
            "- S (Hasil Anamnesis): Batuk, sesak napas, demam, nyeri dada.",
            "- O (Hasil Pemeriksaan Fisik dan Penunjang Sederhana): Ronkhi, takipneu, infiltrat pada rontgen dada.",
            "- A (Penegakan Diagnosis): Pneumonia.",
            "- P (Penatalaksanaan Komprehensif): Antibiotik, oksigen, terapi suportif."
        ],
        "diagnosa_keyword": "pneumonia"
    },
    "i10": {
        "kode_icd": "I10",
        "penjelasan_umum": "Hipertensi Esensial (Primer)",
        "kategori_bab": "Bab IX - Penyakit Sistem Sirkulasi.",
        "organ_terkait": "Jantung, Pembuluh Darah",
        "definisi_penyakit": "Tekanan darah tinggi tanpa penyebab sekunder yang diketahui.",
        "kategori_penyakit": "Non-PM (Non Penyakit Menular)",
        "kaidah_koding": "Gunakan kode tambahan untuk komplikasi atau kondisi terkait.",
        "panduan_klinis": [
            "- S (Hasil Anamnesis): Sering tanpa gejala, sakit kepala, pusing.",
            "- O (Hasil Pemeriksaan Fisik dan Penunjang Sederhana): Tekanan darah tinggi (>140/90 mmHg).",
            "- A (Penegakan Diagnosis): Hipertensi Esensial.",
            "- P (Penatalaksanaan Komprehensif): Modifikasi gaya hidup, obat antihipertensi."
        ],
        "diagnosa_keyword": "hipertensi"
    }
    // Add more dummy data as needed
};

// Dummy data for storing new patient records (from Input Pasien Baru)
let newPatientRecords = JSON.parse(localStorage.getItem('newPatientRecords')) || [];


// Function to hide all main content pages
function hideAllPages() {
    homePage.style.display = 'none';
    icd10SearchPage.style.display = 'none';
    inputPasienBaruPage.style.display = 'none';
    riwayatPasienPage.style.display = 'none';
}

// Function to show the home page
function showHomePage() {
    hideAllPages();
    homePage.style.display = 'block';
    searchResultsContainer.style.display = 'none'; // Hide ICD results when returning to home
    icdCodeInput.value = ''; // Clear ICD input field
}

// Function to show the ICD-10 search page
function showIcd10SearchPage() {
    hideAllPages();
    icd10SearchPage.style.display = 'block';
    searchResultsContainer.style.display = 'none'; // Ensure results are hidden initially on this page
    icdCodeInput.value = ''; // Clear input field
    icdCodeInput.focus(); // Focus on the input field
}

// Function to show the Input Pasien Baru page
function showInputPasienBaruPage() {
    hideAllPages();
    inputPasienBaruPage.style.display = 'block';
    // Clear input fields when navigating to this page
    namaPasienInput.value = '';
    nikInput.value = '';
    tanggalLahirInput.value = '';
    diagnosisPasienBaruInput.value = '';
    namaPasienInput.focus();

    // Hide the last saved data when opening the input page
    dataPasienTersimpanContainer.style.display = 'none';
    lastSavedPasienData.innerHTML = '';
}

// Function to show the Riwayat Pasien page
function showRiwayatPasienPage() {
    hideAllPages();
    riwayatPasienPage.style.display = 'block';
    displayPatientHistory(); // Display the history when showing the page
}

// Function to perform the ICD-10 search and display results
function performSearch() {
    const searchTerm = icdCodeInput.value.toLowerCase().trim();

    // If search term is empty, hide results and return
    if (searchTerm === '') {
        searchResultsContainer.style.display = 'none';
        return;
    }

    let result = null;

    // First, try to find by ICD Code (exact match)
    if (dummyICDData[searchTerm]) {
        result = dummyICDData[searchTerm];
    } else {
        // If not found by exact code, search by diagnosis keyword
        for (const key in dummyICDData) {
            if (dummyICDData[key].diagnosa_keyword && dummyICDData[key].diagnosa_keyword.includes(searchTerm)) {
                result = dummyICDData[key];
                break; // Found a match, stop searching
            }
        }
    }


    if (result) {
        icdCodeDisplay.textContent = result.kode_icd;
        penjelasanUmumDisplay.textContent = result.penjelasan_umum;
        kategoriBabDisplay.textContent = result.kategori_bab;
        organTerkaitDisplay.textContent = result.organ_terkait;
        definisiPenyakitDisplay.textContent = result.definisi_penyakit;
        kategoriPenyakitDisplay.textContent = result.kategori_penyakit;
        kaidahKodingDisplay.textContent = result.kaidah_koding;

        panduanList.innerHTML = '';
        result.panduan_klinis.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            panduanList.appendChild(li);
        });

        searchResultsContainer.style.display = 'block';
    } else {
        // If no result, hide the container
        searchResultsContainer.style.display = 'none';
        // Optionally, you could display a "Not Found" message here if desired
        // alert('Kode ICD-10 atau Diagnosis tidak ditemukan.'); // Removed this alert for real-time search
    }
}

// Function to save new patient data
function saveNewPatientData() {
    const nama = namaPasienInput.value.trim();
    const nik = nikInput.value.trim();
    const tanggalLahir = tanggalLahirInput.value; // YYYY-MM-DD format
    const diagnosis = diagnosisPasienBaruInput.value.trim();

    if (nama && nik && tanggalLahir && diagnosis) {
        // Format tanggal lahir menjadi dd/mm/yyyy untuk tampilan
        const dateParts = tanggalLahir.split('-'); // YYYY-MM-DD
        const formattedTanggalLahir = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

        const newRecord = {
            nama: nama,
            nik: nik,
            tanggalLahir: formattedTanggalLahir, // Store formatted date for display
            diagnosis: diagnosis,
            timestamp: new Date().toISOString() // Add a timestamp for tracking/sorting
        };
        newPatientRecords.push(newRecord);
        localStorage.setItem('newPatientRecords', JSON.stringify(newPatientRecords)); // Save to localStorage

        alert('Data pasien berhasil disimpan!');
        // Clear form fields
        namaPasienInput.value = '';
        nikInput.value = '';
        tanggalLahirInput.value = '';
        diagnosisPasienBaruInput.value = '';

        // Display the newly saved data below the form
        displayLastSavedPatientData(newRecord);

    } else {
        alert('Harap lengkapi semua kolom data pasien!');
    }
}

// Function to display the last saved patient data
function displayLastSavedPatientData(record) {
    lastSavedPasienData.innerHTML = `
        <p>Nama: <strong>${record.nama}</strong></p>
        <p>NIK: <strong>${record.nik}</strong></p>
        <p>Tanggal: <strong>${record.tanggalLahir}</strong></p>
        <p>Diagnosis: <strong>${record.diagnosis}</strong></p>
    `;
    dataPasienTersimpanContainer.style.display = 'block'; // Show the container
}

// Function to display patient history
function displayPatientHistory() {
    riwayatListContainer.innerHTML = ''; // Clear previous content

    if (newPatientRecords.length === 0) {
        noRiwayatMessage.style.display = 'block'; // Show "no data" message
        return;
    } else {
        noRiwayatMessage.style.display = 'none'; // Hide "no data" message
    }

    // Sort records by timestamp (newest first)
    const sortedRecords = [...newPatientRecords].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    sortedRecords.forEach((record, index) => {
        const recordDiv = document.createElement('div');
        recordDiv.classList.add('pasien-record');

        // Numbering the records as seen in the image
        const recordNumber = document.createElement('h3');
        recordNumber.textContent = `${index + 1}. ${record.nama}`;

        const nikP = document.createElement('p');
        nikP.innerHTML = `<strong>NIK:</strong> ${record.nik}`;

        const tanggalP = document.createElement('p');
        tanggalP.innerHTML = `<strong>Tanggal:</strong> ${record.tanggalLahir}`;

        const diagnosisP = document.createElement('p');
        diagnosisP.innerHTML = `<strong>Diagnosis:</strong> ${record.diagnosis}`;

        recordDiv.appendChild(recordNumber);
        recordDiv.appendChild(nikP);
        recordDiv.appendChild(tanggalP);
        recordDiv.appendChild(diagnosisP);

        riwayatListContainer.appendChild(recordDiv);
    });
}


// Add event listeners to the buttons
btnIcd10Search.addEventListener('click', (event) => {
    event.preventDefault();
    showIcd10SearchPage();
});

btnInputPasienBaru.addEventListener('click', (event) => {
    event.preventDefault();
    showInputPasienBaruPage();
});

btnLihatRiwayatPasien.addEventListener('click', (event) => {
    event.preventDefault();
    showRiwayatPasienPage();
});


btnBackToHomeIcd.addEventListener('click', (event) => {
    event.preventDefault();
    showHomePage();
});

btnBackToHomePasienBaru.addEventListener('click', (event) => {
    event.preventDefault();
    showHomePage();
});

btnBackToHomeRiwayat.addEventListener('click', (event) => {
    event.preventDefault();
    showHomePage();
});

// UBAH: Event listener untuk real-time search
icdCodeInput.addEventListener('input', performSearch);


// Event listener for "Simpan" button in Input Pasien Baru
simpanPasienBtn.addEventListener('click', saveNewPatientData);


// Initialize: show the home page when the page loads
document.addEventListener('DOMContentLoaded', showHomePage);