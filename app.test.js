const assert = require('assert');
const { calculateMean, 
    calculateMedian, 
    calculateMode } = require('./app');

   // Test calculateMean function
describe('calculateMean', function () {
    it('should return 0 for an empty array', function () {
      assert.strictEqual(calculateMean([]), 0);
    });
  
    it('should return the correct mean for an array of numbers', function () {
      assert.strictEqual(calculateMean([1, -1, 4, 2]), 1.5);
    });
  });
  
  // Test calculateMedian function
describe('calculateMedian', function () {
    it('should return the correct median for an even-length array', function () {
      assert.strictEqual(calculateMedian([1, -1, 4, 2]), 1.5);
    });
  
    it('should return the correct median for an odd-length array', function () {
      assert.strictEqual(calculateMedian([1, -1, 4]), 1);
    });
  });
  
  // Test calculateMode function
describe('calculateMode', function () {
    it('should return the correct mode for an array of numbers', function () {
      assert.strictEqual(calculateMode([1, 1, 1, 2, 2, 3]), 1);
    });
  }); 
