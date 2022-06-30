import pkginfo from 'pkginfo';
pkginfo(module, 'name', 'version', 'description');

export class Package {
  /**
   * Method that return the field 'name' present on 'package.json'
   */
  static getName(): string {
    return module.exports.name;
  }

  /**
   * Method that return the field 'version' present on 'package.json'
   */
  static getVersion(): string {
    return module.exports.version;
  }

  /**
   * Method that return the field 'description' present on 'package.json'
   */
  static getDescription(): string {
    return module.exports.description;
  }
}
