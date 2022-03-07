import { DialogContent } from "@material-ui/core";
import jsPDF from "jspdf";
import "jspdf-autotable";

export function generateCertificate(dependentDetail, vaccineDetail) {
  console.log("d v:", dependentDetail, vaccineDetail);

  const doc = new jsPDF({ orientation: "p", format: "a4" });
  const pageHeight = doc.internal.pageSize.height;
  console.log("page size:", pageHeight);

  doc.text("Certificate for Vaccination", 100, 20, "center");

  doc.text("Beneficiary Details", 14, 30);

  doc.text("Beneficiary Name", 14, 40);
  doc.text(`${dependentDetail.firstName} ${dependentDetail.lastName}`, 100, 40);

  doc.text("Date of Birth", 14, 50);
  doc.text(`${dependentDetail.dob}`, 100, 50);

  doc.text("Gender", 14, 60);
  doc.text(`${dependentDetail.gender}`, 100, 60);

  doc.text("Vaccination Details", 14, 80);

  doc.text("Vaccine Name", 14, 90);
  doc.text(`${vaccineDetail[0].vaccineId.name}`, 100, 90);

  var line = 100;
  {
    vaccineDetail.map((detail, index) => {
      if (line > pageHeight) {
        line = 10;
        doc.addPage();
      }
      doc.text(`Date of ${detail.doseNumber} Dose`, 14, `${line}`);
      doc.text(
        `${new Date(detail.doseDatetime).toLocaleDateString("en-us", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}`,
        100,
        `${line}`
      );
      line = line + index + 10;
    });
  }

  // window.open(doc.output('dataurl'))
  doc.save(`certificate.pdf`);
}

export function generateReport(dependentDetail, vaccineTaken, vaccineSchedule) {
  console.log("vaccineTaken vaccineSchedule", vaccineTaken, vaccineSchedule);

  const doc = new jsPDF({ orientation: "p", format: "a4" });
  const pageHeight = doc.internal.pageSize.height;
  console.log("page size:", pageHeight);

  doc.text("Vaccination Report", 100, 20, "center");

  doc.text("Beneficiary Details", 14, 30);

  doc.text("Beneficiary Name", 14, 40);
  doc.text(`${dependentDetail.firstName} ${dependentDetail.lastName}`, 100, 40);

  doc.text("Date of Birth", 14, 50);
  doc.text(`${dependentDetail.dob}`, 100, 50);

  doc.text("Gender", 14, 60);
  doc.text(`${dependentDetail.gender}`, 100, 60);

  doc.text("Vaccination Details", 14, 80);

  const tableColumn = ["Id", "Vaccine Name", "Dose Taken", "Dose Scheduled"];

  const tableRows = [];

  {
    vaccineTaken.forEach((item, index) => {
      const vaccineDetail = [index + 1, item.name];
      {
        let strDone = "",
          strSchedule = "";

        vaccineSchedule
          .filter(
            (vaccine) =>
              vaccine.vaccineId.id === item.id && vaccine.statusId.id === "2"
          )
          .forEach((vaccineDone) => {
            strDone =
              strDone +
              `Dose ${vaccineDone.doseNumber} : ${new Date(
                vaccineDone.doseDatetime
              ).toLocaleDateString("en-us", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })} \n \n`;
          });
        vaccineDetail.push(strDone);

        vaccineSchedule
          .filter(
            (vaccine) =>
              vaccine.vaccineId.id === item.id && vaccine.statusId.id === "1"
          )
          .forEach((vaccineSchedule) => {
            strSchedule =
              strSchedule +
              `Dose ${vaccineSchedule.doseNumber} : ${new Date(
                vaccineSchedule.doseDatetime
              ).toLocaleDateString("en-us", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })} ${new Date(
                vaccineSchedule.doseDatetime
              ).toLocaleTimeString()}\n \n`;
          });
        vaccineDetail.push(strSchedule);
      }
      tableRows.push(vaccineDetail);
    });
  }

  doc.autoTable(tableColumn, tableRows, { startY: 90 });

  window.open(doc.output("bloburl"));
}
