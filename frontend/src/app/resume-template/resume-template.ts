import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatAnchor } from "@angular/material/button";
import { MaterialDesignModule } from '../material-design/material-design/material-design-module';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-resume-template',
  imports: [CommonModule, MatAnchor, MaterialDesignModule],
  templateUrl: './resume-template.html',
  styleUrl: './resume-template.css',
})
export class ResumeTemplate {
  @Input() resumeData: any;
  @Input() templateType: string = 'premium';
  @Output() changeTemplate = new EventEmitter<void>();

  onChangeTemplate() {
    this.changeTemplate.emit();
  }

  downloadPDF() {

    const data = document.getElementById('resume-content');

    if (!data) return;

    html2canvas(data, { scale: 2 }).then(canvas => {
      const imgWidth = 210;
      const pageHeight = 295;

      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      const contentDataURL = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');

      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('Resume.pdf');
    })
  }
}