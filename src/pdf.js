const PDF = require('pdfkit');

module.exports.createPdf = function createPdf(user) {
    return new Promise((resolve, reject) => {
        if (!user[0]) reject({result: false});
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
        doc.text(user[0].firstName + ' ' + user[0].lastName);
        doc.image(user[0].img, {fit: [100, 100]});
        doc.end();
    });
};