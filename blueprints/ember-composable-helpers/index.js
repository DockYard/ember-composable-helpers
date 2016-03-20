module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackageToProject('ember-cli-shims', '~0.1.1');
  }
};
