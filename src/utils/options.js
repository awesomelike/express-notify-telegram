const validateOptions = (options) => {
  if (!options) options = {};
  
  options = Object.assign({
    enable4xx: true,
    sound4xx: false,
    enable5xx: true,
    sound5xx: true,
    exclude: [],
  }, options);

  if (!Array.isArray(options.exclude)) {
    options.exclude = [];
  }

  return options;
};

module.exports = validateOptions;