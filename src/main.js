import "./style.css";

async function getJobs() {
  try {
    const response = await fetch("http://localhost:5000/jobs");
    const jobs = await response.json();
    displayJobs(jobs);
  } catch (error) {
    console.error("Kunde inte hämta jobb:", error);
  }
}

async function addJob(newJob) {
  if (newJob.companyname.length < 2) {
    alert("Företagsnamnet är för kort!");
    return;
  }
  // valideringar

  // Fetch-anrop
  const response = await fetch("http://localhost:5000/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newJob),
  });

  if (response.ok) {
    // Gå tillbaka till startsidan eller uppdatera listan
    window.location.href = "index.html";
  }
}

const myJobs = getJobs();
console.log(myJobs);

function displayJobs(jobs) {
  const tableBody = document.getElementById("jobBody");
  jobBody.innerHTML = "";

  jobs.forEach((job) => {
    const row = document.createElement("tr");

    // Fyll med objektdata
    row.innerHTML = `
            <td>${job.companyname}</td>
            <td>${job.jobtitle}</td>
            <td>${job.location}</td>
            <td>${job.startdate}</td>
            <td>${job.enddate}</td>
            <td>${job.description}</td>
            
            <td></td> 
        `;

    // Skapa radera-knapp
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Radera";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", () => {
      removeJob(job.id);
    });

    // Lägg till knappen i sista cellen
    row.querySelector("td:last-child")?.appendChild(deleteBtn);

    // Lägg till raden i tabellen
    tableBody.appendChild(row);
  });
}

async function deleteJob(id) {
  // Bekräfta radering
  if (confirm("Vill du verkligen radera?")) {
    // Skicka DELETE-förfrågan
    await fetch(`http://localhost:5000/jobs/${id}`, {
      method: "DELETE",
    });

    // Uppdatera listan efter radering
    getJobs();
  }
}
