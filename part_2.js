const fs = require('fs');
const commander = require('commander');
const program = new commander.Command();

program
  .requiredOption('-i, --input <file>', 'Path to the input JSON file')
  .option('-o, --output <file>', 'Path to the output file')
  .option('-d, --display', 'Display the result in the console');

program.parse(process.argv);
const options = program.opts();

try {
  const data = fs.readFileSync(options.input, 'utf8');
  const jsonData = JSON.parse(data);

  if (!Array.isArray(jsonData)) {
    console.error('JSON is not an array of currency rates.');
    process.exit(1);
  }

  const results = [];

  jsonData.forEach(item => {
    if (item.exchangedate && item.rate) {
      results.push(`${item.exchangedate}:${item.rate}`);
    }
  });

  if (results.length === 0) {
    console.log('No valid currency records found.');
    process.exit(0);
  }

  if (options.display) {
    results.forEach(line => console.log(line));
  }

  if (options.output) {
    fs.writeFileSync(options.output, results.join('\n') + '\n');
    console.log(`Results saved to ${options.output}`);
  }

} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
