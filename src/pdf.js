const PDF = require('pdfkit');

module.exports.createPdf = function createPdf(user) {
    return new Promise((resolve) => {
        let data = [];
        let length = 0;
        doc = new PDF();
        doc.on('end', () => {
            resolve(Buffer.concat(data, length));
        });

        doc.on('data', (chunk) => {
            length += chunk.length;
            data.push(chunk);
        });
        doc.text(user.firstName + ' ' + user.lastName);
        doc.image(user.img, {fit: [100, 100]});
        doc.end();
    });
};