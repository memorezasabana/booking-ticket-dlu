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
    checkSelections();
}

function selectPort(portName, targetClass) {
    const targetDiv = document.querySelector(`.${targetClass}`);
    targetDiv.textContent = portName;
    const dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(dropdown => dropdown.style.display = 'none');
    checkSelections();
}

function selectPengguna(userType, targetClass) {
    const targetDiv = document.querySelector(`.${targetClass}`);
    targetDiv.textContent = userType;
    document.getElementById("jenisPenggunaDropdown").style.display = "none";
    checkSelections();
}

function selectKendaraan(kendaraan, targetClass) {
    const targetDiv = document.querySelector(`.${targetClass}`);
    targetDiv.textContent = kendaraan;
    document.getElementById("jenisKendaraanDropdown").style.display = "none";
    checkSelections();
}

function selectArmada(armadaClass, targetClass) {
    const targetDiv = document.querySelector(`.${targetClass}`);
    targetDiv.textContent = armadaClass;
    document.getElementById("kelasArmadaDropdown").style.display = "none";
    checkSelections();
}

function selectPenumpang(penumpang, targetClass) {
    const targetDiv = document.querySelector(`.${targetClass}`);
    targetDiv.textContent = penumpang;
    document.getElementById("pilihPenumpang").style.display = "none";
    checkSelections();
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
    checkSelections();
}

function checkSelections() {
    const asal = document.querySelector('.pilih-asal').textContent;
    const tujuan = document.querySelector('.pilih-tujuan').textContent;
    const pengguna = document.querySelector('.jenis-pengguna').textContent;
    const kendaraan = document.querySelector('.kelas-armada').textContent;
    const tanggal = document.querySelector('.pilih-tanggal').textContent;
    const penumpang = document.querySelector('.pilih-penumpang').textContent;

    const asalSelected = asal && asal !== 'Pilih Asal';
    const tujuanSelected = tujuan && tujuan !== 'Pilih Tujuan';
    const penggunaSelected = pengguna && pengguna !== 'Pilih Pengguna';
    const kendaraanSelected = kendaraan && kendaraan !== 'Pilih Kendaraan';
    const tanggalSelected = tanggal && tanggal !== 'Pilih Tanggal';
    const penumpangSelected = penumpang && penumpang !== 'Pilih Penumpang';

    const isComplete = asalSelected && tujuanSelected && penggunaSelected && kendaraanSelected && tanggalSelected && penumpangSelected;

    document.querySelector('.search-button').disabled = !isComplete;
}

function handleSearchClick() {
    const asal = document.querySelector('.pilih-asal').textContent;
    const tujuan = document.querySelector('.pilih-tujuan').textContent;
    const pengguna = document.querySelector('.jenis-pengguna').textContent;
    const kendaraan = document.querySelector('.kelas-armada').textContent;
    const tanggal = document.querySelector('.pilih-tanggal').textContent;
    const penumpang = document.querySelector('.pilih-penumpang').textContent;

    if (asal && tujuan && pengguna && kendaraan && tanggal && penumpang) {
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
