function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.style.display = dropdown.style.display === "none" || dropdown.style.display === "" ? "block" : "none";
}


function swapPorts() {
    const asalDiv = document.querySelector('.pilih-asal');
    const tujuanDiv = document.querySelector('.pilih-tujuan');

    const asalText = asalDiv.textContent;
    const tujuanText = tujuanDiv.textContent;

    asalDiv.textContent = tujuanText;
    tujuanDiv.textContent = asalText;
}

function selectPort(portName, targetClass) {
    const targetDiv = document.querySelector(`.${targetClass}`);
    targetDiv.textContent = portName;
    const dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(dropdown => dropdown.style.display = 'none');
}

function selectPengguna(userType, targetClass) {
    const targetDiv = document.querySelector(`.${targetClass}`);
    targetDiv.textContent = userType;
    document.getElementById("jenisPenggunaDropdown").style.display = "none";
}

function selectKendaraan(kendaraan, targetClass) {
    const targetDiv = document.querySelector(`.${targetClass}`);
    targetDiv.textContent = kendaraan;
    document.getElementById("jenisKendaraanDropdown").style.display = "none";
}

function selectArmada(armadaClass, targetClass) {
    const targetDiv = document.querySelector(`.${targetClass}`);
    targetDiv.textContent = armadaClass;
    document.getElementById("kelasArmadaDropdown").style.display = "none";
}

function selectPenumpang(penumpang, targetClass) {
    const targetDiv = document.querySelector(`.${targetClass}`);
    targetDiv.textContent = penumpang;
    document.getElementById("pilihPenumpang").style.display = "none";
}

let currentDate = new Date();

function openDatePicker() {
    const calendar = document.getElementById("calendar");
    calendar.style.display = calendar.style.display === "none" ? "block" : "none";
    if (calendar.style.display === "block") {
        generateCalendar(currentDate);
    }
}

function generateCalendar(date) {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    const month = date.getMonth();
    const year = date.getFullYear();

    const header = document.createElement("div");
    header.className = "calendar-header";
    header.innerHTML = `<strong>${date.toLocaleString('default', { month: 'long' })} ${year}</strong>`;
    calendar.appendChild(header);

    const navButtons = document.createElement("div");
    navButtons.innerHTML = `
    <button onclick="changeMonth(-1)">&#9664;</button>
    <button onclick="changeMonth(1)">&#9654;</button>
`;
    header.appendChild(navButtons);

    const table = document.createElement("table");
    const daysOfWeek = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

    const headerRow = document.createElement("tr");
    daysOfWeek.forEach(day => {
        const th = document.createElement("th");
        th.innerText = day;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    const firstDay = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);
    const firstDayIndex = firstDay.getDay();

    let row = document.createElement("tr");
    for (let i = 0; i < firstDayIndex; i++) {
        const td = document.createElement("td");
        row.appendChild(td);
    }

    for (let day = 1; day <= lastDate.getDate(); day++) {
        const td = document.createElement("td");
        td.innerText = day;
        td.onclick = () => selectDate(day, month + 1, year);
        row.appendChild(td);

        if ((firstDayIndex + day) % 7 === 0) {
            table.appendChild(row);
            row = document.createElement("tr");
        }
    }
    if (row.childNodes.length > 0) {
        table.appendChild(row);
    }

    calendar.appendChild(table);
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    generateCalendar(currentDate);
}

function selectDate(day, month, year) {
    const targetDiv = document.querySelector('.pilih-tanggal');
    const formattedDate = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
    targetDiv.textContent = formattedDate;
    document.getElementById("calendar").style.display = "none";
}


function swapPorts() {
    const asalDiv = document.querySelector('.pilih-asal');
    const tujuanDiv = document.querySelector('.pilih-tujuan');

    const asalText = asalDiv.textContent;
    const tujuanText = tujuanDiv.textContent;

    asalDiv.textContent = tujuanText;
    tujuanDiv.textContent = asalText;
}

window.onclick = function (event) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    if (!event.target.matches('.jenis-pengguna') &&
        !event.target.matches('.pilih-asal') &&
        !event.target.matches('.pilih-tujuan') &&
        !event.target.matches('.kelas-armada') &&
        !event.target.matches('.pilih-penumpang') &&
        !event.target.matches('.pilih-tanggal') &&
        !event.target.closest('.dropdown-content') &&
        !event.target.closest('.calendar')) {
        for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].style.display = "none";
        }
        document.getElementById("calendar").style.display = "none";
    }
}

// function handleDaftarClick() {
//     alert("Daftar button clicked!");
//     // window.location.href = "daftar_page.html"; 
// }

function handleDaftarClick() {
    alert("Daftar button clicked!");
    // window.location.href = "daftar_page.html"; 
}

function handleSearchClick() {
    const asal = document.querySelector('.pilih-asal').textContent;
    const tujuan = document.querySelector('.pilih-tujuan').textContent;
    const pengguna = document.querySelector('.jenis-pengguna').textContent;
    const kendaraan = document.querySelector('.kelas-armada').textContent;
    const tanggal = document.querySelector('.pilih-tanggal').textContent;
    const penumpang = document.querySelector('.pilih-penumpang').textContent;

    if (asal && tujuan && pengguna && kendaraan && tanggal && penumpang) {
        // Simpan data di localStorage
        localStorage.setItem('asal', asal);
        localStorage.setItem('tujuan', tujuan);
        localStorage.setItem('pengguna', pengguna);
        localStorage.setItem('kendaraan', kendaraan);
        localStorage.setItem('tanggal', tanggal);
        localStorage.setItem('penumpang', penumpang);

        window.location.href = "booking.html";
    } else {
        alert("Harap lengkapi semua pilihan sebelum mencari jadwal.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const asal = localStorage.getItem('asal');
    const tujuan = localStorage.getItem('tujuan');
    const pengguna = localStorage.getItem('pengguna');
    const kendaraan = localStorage.getItem('kendaraan');
    const tanggal = localStorage.getItem('tanggal');
    const penumpang = localStorage.getItem('penumpang');

    if (asal) document.querySelector('.pilih-asal').textContent = asal;
    if (asal) document.querySelector('.pelabuhan-asal').textContent = asal;
    if (tujuan) document.querySelector('.pilih-tujuan').textContent = tujuan;
    if (tujuan) document.querySelector('.pelabuhan-tujuan').textContent = tujuan;
    if (pengguna) document.querySelector('.jenis-pengguna').textContent = pengguna;
    if (pengguna) document.querySelector('.jenis-penggunajasa').textContent = pengguna;
    if (kendaraan) document.querySelector('.kelas-armada').textContent = kendaraan;
    if (kendaraan) document.querySelector('.kelas-armada-kapal').textContent = kendaraan;
    if (tanggal) document.querySelector('.pilih-tanggal').textContent = tanggal;
    if (tanggal) document.querySelector('.pilih-tanggal-berangkat').textContent = tanggal;
    if (penumpang) document.querySelector('.pilih-penumpang').textContent = penumpang;
});