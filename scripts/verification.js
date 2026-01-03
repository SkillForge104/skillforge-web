const resultDiv = document.getElementById("result");

async function verifyCertificate() {
  const input = document.getElementById("certId").value.trim().toUpperCase();
  resultDiv.classList.remove("d-none");
  const data = await fetch("../data/certificates.json");
  const parsedData = await data.json();

  if (!parsedData.certificates[input]) {
    resultDiv.innerHTML = `
      <div class="alert alert-danger text-center">
        ❌ Certificate not found. Please check the ID.
      </div>
    `;
    return;
  }

  const certificateData = {
    id: input,
    name: parsedData.certificates[input].name,
    track: parsedData.certificates[input].track,
    status: parsedData.certificates[input].status,
    issuer: parsedData.meta.issuer,
    institution: parsedData.meta.institution,
    duration: parsedData.meta.programDuration,
    startDate: parsedData.meta.startDate,
    endDate: parsedData.meta.endDate,
  };
  console.log(certificateData);
  resultDiv.innerHTML = `
    <div class="card shadow border-0 mb-5 ">
      <div class="card-body text-dark">
        <span class="badge bg-success mb-2">Approved</span>
        <h4 class="fw-bold">${certificateData.name}</h4>
        <p class="mb-1"><strong>Track:</strong> ${certificateData.track}</p>
        <p class="mb-1"><strong>Duration:</strong> ${
          certificateData.duration
        }</p>
        <p class="mb-1"><strong>Dates:</strong> ${
          certificateData.startDate
        } → ${certificateData.endDate}</p>
        <p class="mb-3"><strong>Location:</strong> ${
          certificateData.institution
        }</p>

        <h6 class="fw-bold">What the participant completed:</h6>
        <ul>
          ${parsedData.trackTemplates[certificateData.track]
            .map((item) => `<li>${item}</li>`)
            .join("")}
        </ul>

        <p class="mt-3 mb-0 text-muted">
          Issued by ${certificateData.issuer}
        </p>
      </div>
    </div>
  `;
}
