/**
 * @param {Object} objectToEvaluate
 * @param {Array | Object} requiredKeys
 */
function validateObjectKeysPresence(objectToEvaluate, requiredKeys) {
  if (requiredKeys == null || requiredKeys == undefined) {
    throw new Error('Required keys is required');
  }

  // Is array and check only presense
  if (Array.isArray(requiredKeys)) {
    let isValid = true;
    // remove blank|null|undefined items
    let filteredArray = requiredKeys.filter((key) => {
      return key != '' && key != ' ' && key != null && key != undefined;
    });

    Object.keys(objectToEvaluate).forEach((key) => {
      if (filteredArray.indexOf(key) === -1) {
        isValid = false;
      }
    });

    return isValid;
  }

  // is object so check type also
  if (typeof requiredKeys === 'object' && !Array.isArray(requiredKeys)) {
    let isValid = true;

    Object.entries(objectToEvaluate).forEach((objectEntry) => {
      const [objectKey, objectValue] = objectEntry;

      let filteredArray = Object.keys(requiredKeys).filter((key) => {
        return key != '' && key != ' ' && key != null && key != undefined;
      });

      if (filteredArray.indexOf(objectKey) === -1) {
        isValid = false;
      } else {
        let requiredValueType = requiredKeys[objectKey];
        if (typeof objectValue != requiredValueType) {
          isValid = false;
        }
      }
    });

    return isValid;
  }

  return false;
}

module.exports = { validateObjectKeysPresence };
