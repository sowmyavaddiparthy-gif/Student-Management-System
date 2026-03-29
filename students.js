
let editRow = null;
document.addEventListener("DOMContentLoaded", function(){
    loadStudents();
});
    


const form = document.getElementById("form");
const studentList = document.getElementById("student-list");



form.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value;
    const roll = document.getElementById("roll").value;
    const course = document.getElementById("course").value;
    const year = document.getElementById("year").value;
    const contact = document.getElementById("contact").value;

    if(name === "" || roll === ""){
        alert("Please fill required fields");
        return;
    }

    if(editRow === null){
        // ADD NEW ROW
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${name}</td>
            <td>${roll}</td>
            <td>${course}</td>
            <td>${year}</td>
            <td>${contact}</td>
            <td>
                <button onclick="editStudent(this)">✏️</button>
            </td>
            <td>
             <button onclick="deleteStudent(this)">🗑️</button>
             </td>
        `;

        studentList.appendChild(row);
        saveToLocalStorage();
    } else {
        // UPDATE EXISTING
        editRow.children[0].innerText = name;
        editRow.children[1].innerText = roll;
        editRow.children[2].innerText = course;
        editRow.children[3].innerText = year;
        editRow.children[4].innerText = contact;

        editRow = null;
        saveToLocalStorage();
    }

    form.reset();
});


// DELETE FUNCTION
function deleteStudent(btn){
    btn.parentElement.parentElement.remove();
    saveToLocalStorage();
}


// EDIT FUNCTION
function editStudent(btn){
    editRow = btn.parentElement.parentElement;

    document.getElementById("name").value = editRow.children[0].innerText;
    document.getElementById("roll").value = editRow.children[1].innerText;
    document.getElementById("course").value = editRow.children[2].innerText;
    document.getElementById("year").value = editRow.children[3].innerText;
    document.getElementById("contact").value = editRow.children[4].innerText;
}
function saveToLocalStorage() {
    const rows = document.querySelectorAll("#student-list tr");
    let students = [];

    rows.forEach(row => {
        let cols = row.querySelectorAll("td");

        students.push({
            name: cols[0].innerText,
            roll: cols[1].innerText,
            course: cols[2].innerText,
            year: cols[3].innerText,
            contact: cols[4].innerText
        });
    });

    localStorage.setItem("students", JSON.stringify(students));
}
function loadStudents() {
    let data = localStorage.getItem("students");

    if (!data) return;

    let students = JSON.parse(data);

    students.forEach(student => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.roll}</td>
        <td>${student.course}</td>
        <td>${student.year}</td>
        <td>${student.contact}</td>

        <td>
            <button onclick="editStudent(this)">✏️</button>
        </td>

        <td>
            <button onclick="deleteStudent(this)">🗑️</button>
        </td>
        `;

        studentList.appendChild(row);
    });
}
/* DARK MODE TOGGLE
const toggle = document.querySelector(".mode-toggle");

toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
    */