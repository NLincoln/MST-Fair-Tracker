const types = [
  'company'
];

module.exports = types.map((type) => require(`./${type}`));
