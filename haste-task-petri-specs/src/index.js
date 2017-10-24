const path = require('path');
const petriSpecs = require('petri-specs/lib/petri-specs');

module.exports = ({config = {}, base = process.cwd(), staticsDir = 'statics'}) => async () => {
  const directory = path.join(base, 'petri-specs');
  const destFile = path.join(base, staticsDir, 'petri-experiments.json');

  const options = Object.assign({directory, json: destFile, base}, config);
  const {convertedFilesCount} = petriSpecs.convert(options);

  if (convertedFilesCount > 0) {
    const errorMessage = `Error: yoshi-petri detected ${convertedFilesCount} deprecated specs that got converted. More info: https://github.com/wix-private/petri-specs/docs/CONVERT_SPECS.md`;
    throw new Error(errorMessage);
  }

  petriSpecs.build(options);
};
