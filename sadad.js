class BoolMatrix {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.matrix = [];

        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < columns; j++) {
                row.push(false);
            }
            this.matrix.push(row);
        }

        BoolMatrix.incrementCount();
    }

    static count = 0;

    static incrementCount() {
        BoolMatrix.count++;
    }

    static getInfo() {
        console.log(`Number of created objects: ${BoolMatrix.count}`);
    }

    getRowCount() {
        return this.rows;
    }

    getColumnCount() {
        return this.columns;
    }

    getValue(row, column) {
        return this.matrix[row][column];
    }

    setValue(row, column, value) {
        this.matrix[row][column] = value;
    }

    logicalOr(matrix) {
        if (this.rows !== matrix.getRowCount() || this.columns !== matrix.getColumnCount()) {
            throw new Error("Matrix dimensions do not match");
        }

        const result = new BoolMatrix(this.rows, this.columns);

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                result.setValue(i, j, this.getValue(i, j) || matrix.getValue(i, j));
            }
        }

        return result;
    }

    logicalAnd(matrix) {
        if (this.rows !== matrix.getRowCount() || this.columns !== matrix.getColumnCount()) {
            throw new Error("Matrix dimensions do not match");
        }

        const result = new BoolMatrix(this.rows, this.columns);

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                result.setValue(i, j, this.getValue(i, j) && matrix.getValue(i, j));
            }
        }

        return result;
    }

    invert() {
        const result = new BoolMatrix(this.rows, this.columns);

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                result.setValue(i, j, !this.getValue(i, j));
            }
        }

        return result;
    }

    countOnes() {
        let count = 0;

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.getValue(i, j)) {
                    count++;
                }
            }
        }

        return count;
    }

    static findMatrixWithMaxOnes(matrices) {
        let maxCount = -1;
        let maxMatrix = null;

        for (let i = 0; i < matrices.length; i++) {
            const count = matrices[i].countOnes();
            if (count > maxCount) {
                maxCount = count;
                maxMatrix = matrices[i];
            }
        }

        return maxMatrix;
    }

    static findMatrixWithMinOnes(matrices) {
        let minCount = Number.MAX_SAFE_INTEGER;
        let minMatrix = null;

        for (let i = 0; i < matrices.length; i++) {
            const count = matrices[i].countOnes();
            if (count < minCount) {
                minCount = count;
                minMatrix = matrices[i];
            }
        }

        return minMatrix;
    }

    static findMatricesWithEqualSymbol(matrices, symbol) {
        const result = [];

        for (let i = 0; i < matrices.length; i++) {
            let hasEqualSymbol = true;
            for (let j = 0; j < matrices[i].rows; j++) {
                let rowHasSymbol = false;
                for (let k = 0; k < matrices[i].columns; k++) {
                    if (matrices[i].getValue(j, k) === symbol) {
                        rowHasSymbol = true;
                        break;
                    }
                }
                if (!rowHasSymbol) {
                    hasEqualSymbol = false;
                    break;
                }
            }
            if (hasEqualSymbol) {
                result.push(matrices[i]);
            }
        }

        return result;
    }
}

// Пример использования

const matrix1 = new BoolMatrix(2, 2);
matrix1.setValue(0, 0, true);
matrix1.setValue(0, 1, false);
matrix1.setValue(1, 0, true);
matrix1.setValue(1, 1, true);

const matrix2 = new BoolMatrix(2, 2);
matrix2.setValue(0, 0, false);
matrix2.setValue(0, 1, true);
matrix2.setValue(1, 0, true);
matrix2.setValue(1, 1, false);

const matrix3 = new BoolMatrix(3, 3);
matrix3.setValue(0, 0, true);
matrix3.setValue(0, 1, true);
matrix3.setValue(0, 2, false);
matrix3.setValue(1, 0, false);
matrix3.setValue(1, 1, true);
matrix3.setValue(1, 2, true);
matrix3.setValue(2, 0, true);
matrix3.setValue(2, 1, false);
matrix3.setValue(2, 2, false);

BoolMatrix.getInfo();

const resultMatrix1 = matrix1.logicalOr(matrix2);
console.log("Logical OR:");
console.log(resultMatrix1.matrix);

const resultMatrix2 = matrix1.logicalAnd(matrix2);
console.log("Logical AND:");
console.log(resultMatrix2.matrix);

const invertedMatrix = matrix1.invert();
console.log("Inverted Matrix:");
console.log(invertedMatrix.matrix);

console.log("Number of ones in matrix1:", matrix1.countOnes());

const matrices = [matrix1, matrix2, matrix3];
const matrixWithMaxOnes = BoolMatrix.findMatrixWithMaxOnes(matrices);
console.log("Matrix with the most ones:");
console.log(matrixWithMaxOnes.matrix);

const matrixWithMinOnes = BoolMatrix.findMatrixWithMinOnes(matrices);
console.log("Matrix with the least ones:");
console.log(matrixWithMinOnes.matrix);

const matricesWithEqualSymbol = BoolMatrix.findMatricesWithEqualSymbol(matrices, true);
console.log("Matrices with equal symbol 'true' in each row:");
matricesWithEqualSymbol.forEach((matrix) => {
    console.log(matrix.matrix);
});