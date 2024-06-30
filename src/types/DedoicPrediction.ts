export function createDedoicPrediction(deaths: number[]): number[] {
    const prediction: number[] = [];
    const personalBests: number[] = [100];
    const distanceBetweenProgressTries: Distance[] = [];
    const progressTries: Distance[] = [];
    const deathsToDistance: Distance[] = [];
    const linearFunction = linearRegression([...Array(deaths.length).keys()], deaths);
    let distanceBPT = -1;
    for (let i = 0; i < deaths.length; i++) {
        const death = deaths[i];
        distanceBPT++;

        // hier maybe nur den ersten teil vom prädikat dann bekommt man nächsten PB
        if (death < personalBests[personalBests.length - 1] || death < (linearFunction.m * i + linearFunction.b)) {
            // if (death < personalBests[personalBests.length - 1]) {
            if (death < personalBests[personalBests.length - 1]) {
                personalBests.push(death);
            }
            distanceBetweenProgressTries.push({ distance: distanceBPT, times: Math.pow(Math.E, 0.05 * i) * distanceBPT });
            progressTries.push({ distance: death, times: Math.pow(Math.E, 0.1 * (deaths[0] - death)) });
            // progressTries.push({ distance: death, times: Math.pow(Math.E, 0.05 * i) + 1 });
            distanceBPT = 0;
        }
        deathsToDistance.push({ distance: death, times: Math.pow(Math.E, 0.05 * i) + 1 });
    }

    const meanProgress = calculateMeanDistance(progressTries);
    const stdDevProgress = calculateStandardDeviationDistance(progressTries, meanProgress);
    const meanOfDistance = Math.floor(calculateMeanDistance(distanceBetweenProgressTries) + 1);

    const mean = calculateMeanDistance(deathsToDistance);
    const stdDev = calculateStandardDeviationDistance(deathsToDistance, mean);

    const pushAmount = meanOfDistance - distanceBPT < 0 ? 0 : meanOfDistance - distanceBPT
    pushTries(prediction, pushAmount, mean, stdDev, deaths[0]);

    // const goodTry = mean - (Math.random() + 1.5) * stdDev;
    const goodTry = randomTry(meanProgress, stdDevProgress);
    if (goodTry <= deaths[0] && goodTry >= 0) {
        prediction.push(goodTry);
    } else if (goodTry <= deaths[0] && goodTry < 0) {
        prediction.push(0);
    } else {
        prediction.push(deaths[0]);
    }
    pushTries(prediction, meanOfDistance, mean, stdDev, deaths[0]);

    console.log("------------------------------------");
    // console.log("DEATHS", deaths);
    // console.log("DISTANCE TO LAST PROGRESS", distanceBPT);
    // console.log("pushAmount", pushAmount);
    // console.log("LINEAR FUNCTION", linearFunction);
    // console.log("personalBests:", personalBests);
    // console.log("distanceBetweenPBs:", distanceBetweenPBs);
    // console.log("distanceBetweenProgressTries:", distanceBetweenProgressTries);
    console.log("mean:", mean);
    console.log("stdDev:", stdDev);
    // console.log("meanOfDistance:", meanOfDistance);
    // console.log("deathsToDistance:", deathsToDistance);
    console.log("meanProgress:", meanProgress);
    console.log("stdDevProgress:", stdDevProgress);
    console.log("CHANCE OF BEATING BOSS:", normalCDF(0, meanProgress, stdDevProgress) * 100);
    // console.log("PREDICTION:", prediction);
    return prediction;
}

function pushTries(prediction: number[], numoOfTries: number, mean: number, stdDev: number, max: number) {
    for (let i = 0; i < numoOfTries; i++) {
        const r = randomTry(mean, stdDev);
        if (r <= max && r >= 0) {
            prediction.push(r);
        } else if (r <= max && r < 0) {
            prediction.push(0);
        } else {
            prediction.push(max);
        }
    }
}

function calculateMeanDistance(data: Distance[]): number {
    const sum = data.reduce((acc, val) => acc + (val.distance * val.times), 0);
    const entries = data.reduce((acc, val) => acc + val.times, 0);
    return sum / entries;
}

function calculateStandardDeviationDistance(data: Distance[], mean: number): number {
    for (let i = 0; i < data.length; i++) {
        data[i] = { distance: Math.pow(data[i].distance - mean, 2), times: data[i].times };
    }
    const avgSquaredDiff = calculateMeanDistance(data);
    return Math.sqrt(avgSquaredDiff);
}

// Generate normal distribution data points
function randomTry(mean: number, stdDev: number): number {
    const u1 = Math.random();
    const u2 = Math.random();
    const randStdNormal = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
    const randNormal = mean + stdDev * randStdNormal;
    return randNormal;
}

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

function normalCDF(x: number, mean: number, stdDev: number): number {
    return 0.5 * (1 + erf((x - mean) / (stdDev * Math.sqrt(2))));
}

interface Distance {
    distance: number;
    times: number;
}