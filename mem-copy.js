const fs = require('fs');
const { spawn } = require('child_process');

const fileName = `gif-memory-${js_yyyy_mm_dd_hh_mm_ss()}.csv`;
const fileHeader = 'Total Memory (mb), JS Memory (mb)\n';
const package = process.argv[2] || 'com.walmart.gifapp';
let prevTotalInMB = 0;

const err = fs.appendFileSync(fileName, fileHeader);
if (err) {
  console.error(err);
  process.exit(1);
}

function getInfo(package) {
  const ls = spawn('adb', ['shell', 'dumpsys', 'meminfo', package]);

  let fulldata = '';
  ls.stdout.on('data', data => {
    fulldata += data.toString();
  });

  ls.stdout.on('close', code => {
    if (!code) {
      const copy = fulldata;
      fulldata = '';
      transform(copy);
    }
  });
}

function transform(input) {
  try {
    const totalHeap = new RegExp(/TOTAL\s+([0-9]+)\s/g).exec(input)[1];
    const jsHeap = new RegExp(/Unknown\s+([0-9]+)\s/g).exec(input)[1];
    const totalHeapInMB = Math.floor(totalHeap / 1024);
    const jsHeapInMB = Math.floor(jsHeap / 1024);

    if (prevTotalInMB !== totalHeapInMB) {
      const row = `${totalHeapInMB}, ${jsHeapInMB}\n`;
      fs.appendFile(fileName, row, err => {
        if (err) {
          console.error(err);
        }
      });
      console.log(totalHeapInMB, jsHeapInMB);
      prevTotalInMB = totalHeapInMB;
    }
  } catch (e) {
    console.log(`Error ${e} while parsing ${input}`);
  }
}

setInterval(() => getInfo(package), 3000);

function js_yyyy_mm_dd_hh_mm_ss() {
  const now = new Date();
  let year = '' + now.getFullYear();
  let month = '' + (now.getMonth() + 1);
  if (month.length == 1) {
    month = '0' + month;
  }
  let day = '' + now.getDate();
  if (day.length == 1) {
    day = '0' + day;
  }
  let hour = '' + now.getHours();
  if (hour.length == 1) {
    hour = '0' + hour;
  }
  let minute = '' + now.getMinutes();
  if (minute.length == 1) {
    minute = '0' + minute;
  }
  let second = '' + now.getSeconds();
  if (second.length == 1) {
    second = '0' + second;
  }
  return (
    year + '-' + month + '-' + day + 'T' + hour + '-' + minute + '-' + second
  );
}
