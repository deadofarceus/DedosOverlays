export function createDedoicPrediction(deaths: number[]): number[] {
    const personalBest = Math.min(...deaths);
    const prediction: number[] = [];
    const personalBests: number[] = [100];
    const distanceBetweenPBs: number[] = [];
    const distanceBetweenProgressTries: Distance[] = [];
    const deathsToDistance: Distance[] = [];
    const linearFunction = linearRegression([...Array(deaths.length).keys()], deaths);
    let distance = -1;
    let distanceBPT = -1;
    for (let i = 0; i < deaths.length; i++) {
        const death = deaths[i];
        distance++;
        distanceBPT++;

        // hier maybe nur den ersten teil vom prädikat
        if (death < personalBests[personalBests.length - 1] || death < (linearFunction.m * i + linearFunction.b)) {
            if (death < personalBests[personalBests.length - 1]) {
                personalBests.push(death);
                distanceBetweenPBs.push(distance);
                distance = 0;
            }
            distanceBetweenProgressTries.push({ distance: distanceBPT, times: Math.pow(Math.E, 0.05 * i) * distanceBPT });
            deathsToDistance.push({ distance: death, times: Math.pow(Math.E, 0.05 * i) + 1 });
            distanceBPT = 0;
        } else {
            deathsToDistance.push({ distance: death, times: 1 });
        }
    }

    const meanOfDistance = Math.floor(calculateMeanDistance(distanceBetweenProgressTries) + 1);

    const mean = calculateMeanDistance(deathsToDistance);
    const stdDev = calculateStandardDeviationDistance(deathsToDistance, mean);

    const pushAmount = meanOfDistance - distanceBPT < 0 ? 0 : meanOfDistance - distanceBPT
    pushTries(prediction, pushAmount, mean, stdDev * 2, deaths[0], personalBest);
    const goodTry = mean - 2.5 * stdDev;
    prediction.push(goodTry);
    pushTries(prediction, meanOfDistance, mean, stdDev * 2, deaths[0], personalBest);

    // console.log("------------------------------------");
    // console.log("DEATHS", deaths);
    console.log("DISTANCE TO LAST PROGRESS", distanceBPT);
    // console.log("pushAmount", pushAmount);
    // console.log("LINEAR FUNCTION", linearFunction);
    // console.log("personalBests:", personalBests);
    // console.log("distanceBetweenPBs:", distanceBetweenPBs);
    console.log("distanceBetweenProgressTries:", distanceBetweenProgressTries);
    // console.log("mean:", mean);
    // console.log("stdDev:", stdDev);
    console.log("meanOfDistance:", meanOfDistance);
    // console.log("deathsToDistance:", deathsToDistance);
    // console.log("PREDICTION:", prediction);
    return prediction;
}

function pushTries(prediction: number[], numoOfTries: number, mean: number, stdDev: number, max: number, min: number) {
    for (let i = 0; i < numoOfTries; i++) {
        const r = randomTry(mean, stdDev);
        if (r <= max && r >= min) {
            prediction.push(r);
        } else if (r <= max && r < min) {
            prediction.push(min);
        } else {
            prediction.push(max);
        }
    }
}

// Calculate mean
function calculateMeanDistance(data: Distance[]): number {
    const sum = data.reduce((acc, val) => acc + (val.distance * val.times), 0);
    const eintreage = data.reduce((acc, val) => acc + val.times, 0);
    return sum / eintreage;
}

// Calculate standard deviation
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

function linearRegression(x: number[], y: number[]) {
    const n = y.length;
    let sum_x = 0;
    let sum_y = 0;
    let sum_xy = 0;
    let sum_xx = 0;

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

interface Distance {
    distance: number;
    times: number;
}