const fs = require('fs');
const commander = require('commander');
const program = new commander.Command();

program
  .requiredOption('-i, --input <file>', 'Path to the input JSON file')
  .option('-o, --output <file>', 'Path to the output file')
  .option('-d, --display', 'Display the result in the console');

program.parse(process.argv);

if (!program.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

try {
  const data = fs.readFileSync(program.input, 'utf8');
  const jsonData = JSON.parse(data);

  if (jsonData && jsonData.length > 0) {
    jsonData.forEach(item => {
      if (item.currency && item.date && item.rate) {
        console.log(`${item.date}:${item.rate}`);
        
        if (program.output) {
          fs.writeFileSync(program.output, `${item.date}:${item.rate}\n`, { flag: 'a' });
        }
      }
    });
  } else {
    console.error('Invalid JSON structure or no data found.');
  }

  if (program.display) {
    console.log('Displayed the results.');
  }

} catch (err) {
  console.error('Cannot find input file or error parsing JSON:', err.message);
  process.exit(1);
}
