module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function(options) {
    if (!('ember-cli-shims' in options.project.addonPackages)) {
      return this.addBowerPackageToProject('ember-cli-shims', '~0.1.1');
    }
  }
};
