const moment = require('moment-timezone');
const jsdom = require('jsdom');
const e = require('express');
const tabletojson = require('tabletojson').Tabletojson;

function formatDate(date) {
  // const now = moment().tz('America/Los_Angeles');
  const dateToFormat = moment(date);
  const datetime = dateToFormat.format('YYYY/MM/DD HH:mm:ss');
  const year = dateToFormat.format('YYYY');
  const formattedDate = moment(dateToFormat).format('YYMMDD');

  return { datetime, year, formattedDate };
}

function createURL({ datetime, year, formattedDate }, municipality) {
  return `http://www.pjbc.gob.mx/boletinj/${year}/my_html/${municipality}${formattedDate}.htm`;
}

async function getBoletinData(URL) {

  try {
    const response = await fetch(URL);
    const html = await response.text();

    const dom = new jsdom.JSDOM(html);
    const mainSection = dom.window.document.querySelector('.WordSection1');

    if (!mainSection) {
      throw new Error('No main section found');
    }

    const juryCases = {};
    let currentJury = '';

    for (const child of mainSection.children) {
      if (child.tagName === 'DIV') {
        const reformattedContent = child.textContent.replace(/\n/g, ' ').trim();
        juryCases[reformattedContent] = [];
        currentJury = reformattedContent;
      } else if (child.tagName === 'TABLE') {
        const jsonTableData = tabletojson.convert(child.outerHTML);
        const jsonTableDataFlat = jsonTableData.flat(1);
        juryCases[currentJury].push(jsonTableDataFlat);
      }
    }

    const flattenedJuryFilesObj = Object.entries(juryCases).map(([key, files]) => {
      return {
        key: key,
        files: files.flat(),
      };
    });

    return flattenedJuryFilesObj;

  } catch (error) {
    return error;
  }
}

module.exports = {
  formatDate,
  createURL,
  getBoletinData,
};