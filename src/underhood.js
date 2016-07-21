
// Creation of Vandermonde (Not Used)
function vandermonde (a) {

    var vand = [];

    for(var k = 0; k < a.length; k++) {
      vand.push([]);

      for (var i = 0; i < a.length; i++) {
        vand[k].push(Math.pow(a[k][0],a.length - i -1));
      }

    }

    return vand;
  }


// Multiplication of Matrices (Not Used)
function multiplyMatrices(m1, m2) {
    var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}
