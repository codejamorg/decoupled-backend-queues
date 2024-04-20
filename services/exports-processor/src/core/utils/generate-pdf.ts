import * as PDFDocument from 'pdfkit';
import * as fs from 'node:fs';
import { Stock } from 'src/database/schemas/Stock';

export const generateStockPDF = (stocks: Stock[], writePath: string) => {
  return new Promise<string>((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const writeStream = fs.createWriteStream(writePath);
      doc.pipe(writeStream);
      console.log('Generating PDF...');

      const table = {
        headers: ['Name', 'Cost', 'Quantity'],
        rows: stocks.map((it) => [it.name, it.cost, it.quantity]),
      };

      const tableWidth = 500;
      const cellPadding = 10;

      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .text('Stock Inventory', { align: 'center' });

      doc.moveDown();
      doc
        .font('Helvetica')
        .text('Stock items for store 1102', { align: 'center' });

      doc.moveDown();
      doc.font('Helvetica-Bold');
      const headerPos = doc.y + 10;

      table.headers.forEach((header, i) => {
        doc.text(
          header,
          (i * tableWidth) / table.headers.length + cellPadding,
          headerPos,
          {
            width: tableWidth / table.headers.length - cellPadding * 2,
            align: 'center',
          },
        );
      });

      // Draw the table rows
      doc.font('Helvetica');
      table.rows.forEach((row) => {
        const rowPos = doc.y + 10;
        row.forEach((cell, j) => {
          doc.text(
            cell,
            (j * tableWidth) / table.headers.length + cellPadding,
            rowPos,
            {
              width: tableWidth / table.headers.length - cellPadding * 2,
              align: 'center',
            },
          );
        });
        doc.moveDown();
      });

      doc.end();
      console.log('PDF generated successfully', writePath);

      return resolve(writePath);
    } catch (err) {
      reject(err);
    }
  });
};
