const fs = require('fs');
const commander = require('commander');
const program = new commander.Command();

program
  .requiredOption('-i, --input <file>', 'Path to the input JSON file')
  .option('-o, --output <file>', 'Path to the output file')
  .option('-d, --display', 'Display the result in the console');

program.parse(process.argv);

// Debugging: print the arguments received
console.log('Arguments received:', program.opts());

if (!program.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

fs.readFile(program.input, 'utf8', (err, data) => {
  if (err) {
    console.error('Cannot find input file');
    process.exit(1);
  }

  let jsonData;
  try {
    jsonData = JSON.parse(data);
  } catch (parseError) {
    console.error('Invalid JSON format in the input file');
    process.exit(1);
  }

  if (program.display) {
    console.log('Displaying data:', jsonData);
  }

  if (program.output) {
    fs.writeFile(program.output, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error('Error writing to output file');
        process.exit(1);
      }
      console.log(`Data has been written to ${program.output}`);
    });
  }
});
