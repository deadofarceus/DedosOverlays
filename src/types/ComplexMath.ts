import { AttemptData } from "./DedoicPrediction";

export function linearRegression(x: number[], y: number[]) {
    const n = y.length;
    let sum_x = 0, sum_y = 0, sum_xy = 0, sum_xx = 0;

    for (let i = 0; i < y.length; i++) {

        sum_x += x[i];
        sum_y += y[i];
        sum_xy += (x[i] * y[i]);
        sum_xx += (x[i] * x[i]);
    }

    const m = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
    const intercept = (sum_y - m * sum_x) / n;

    return { m: m, b: intercept };
}

export function exponentialRegression(x: number[], y: number[]) {
    const n = y.length;
    let sum_x = 0, sum_ln_y = 0, sum_x_ln_y = 0, sum_xx = 0;

    for (let i = 0; i < n; i++) {
        const ln_y = Math.log(100 - y[i]);

        sum_x += x[i];
        sum_ln_y += ln_y;
        sum_x_ln_y += x[i] * ln_y;
        sum_xx += x[i] * x[i];
    }

    const b = (n * sum_x_ln_y - sum_x * sum_ln_y) / (n * sum_xx - sum_x * sum_x);
    const ln_a = (sum_ln_y - b * sum_x) / n;
    const a = Math.exp(ln_a);

    return { a: a, b: b };
}

export function meanWeighted(data: AttemptData[]): number {
    const sum = data.reduce((acc, val) => acc + (val.percentage * val.weight), 0);
    const entries = data.reduce((acc, val) => acc + val.weight, 0);
    return sum / entries;
}

export function standardDeviationWeighted(data: AttemptData[], mean: number): number {
    const cloneData = Array.from(data);
    for (let i = 0; i < cloneData.length; i++) {
        const clonedAttempt = new AttemptData(Math.pow(cloneData[i].percentage - mean, 2), cloneData[i].weight, cloneData[i].position);
        cloneData[i] = clonedAttempt;
    }
    const avgSquaredDiff = meanWeighted(cloneData);
    return Math.sqrt(avgSquaredDiff);
}

function erf(x: number): number {
    // Using the approximation of the error function
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    // Save the sign of x
    const sign = Math.sign(x);
    x = Math.abs(x);

    // A&S formula 7.1.26
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
}

export function normalCDF(x: number, mean: number, stdDev: number): number {
    return 0.5 * (1 + erf((x - mean) / (stdDev * Math.sqrt(2))));
}

export function randomFromND(mean: number, stdDev: number): number {
    const u1 = Math.random();
    const u2 = Math.random();
    const randStdNormal = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
    const randNormal = mean + stdDev * randStdNormal;
    return randNormal;
}