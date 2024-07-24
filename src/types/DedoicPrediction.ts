import { linearRegression, meanWeighted, normalCDF, randomFromND, standardDeviationWeighted } from "./ComplexMath";

const PREDICTIONLENGTH = 7;
const MINIMUM = 0;

export function createOracle(): DedoicOracle {
    return new DedoicOracle();
}

export class DedoicOracle {
    mean: number = 0;
    meanProgress: number = 0;
    stdDev: number = 0;
    stdDevProgress: number = 0;
    meanOfDistance: number = 0;
    distanceBPT: number = 0;
    personalBests: number[] = [];
    prediction: number[] = [];
    max: number = 0;
    personalBest: number = 0;

    constructor() {

    }

    createDedoicPrediction(deaths: number[]): number[] {
        //clear prediction to start fresh each time
        this.prediction = [];
        this.max = deaths[0];

        const tries = Array.from(deaths).splice(1, deaths.length - 1);
        this.personalBests = [tries[0]];
        this.personalBest = tries[0];
        const deathsToDistance: AttemptData[] = [];
        const distanceBetweenProgressTries: AttemptData[] = [];
        const progressTries: AttemptData[] = [];
        const linearFunction = linearRegression([...Array(tries.length).keys()], tries);
        this.distanceBPT = -1;
        for (let i = 0; i < tries.length; i++) {
            const death = tries[i];
            this.distanceBPT++;

            // hier maybe nur den ersten teil vom prädikat dann bekommt man nächsten PB
            if (death < this.personalBest || death < (linearFunction.m * i + linearFunction.b)) {
                // if (death < personalBests[personalBests.length - 1]) {
                if (death < this.personalBest) {
                    this.personalBests.push(death);
                    this.personalBest = death;
                }
                this.distanceBPT--;
                const newDistance = new AttemptData(this.distanceBPT, Math.pow(Math.E, 0.05 * i), i);
                distanceBetweenProgressTries.push(newDistance);
                const newProgress = new AttemptData(death, Math.pow(Math.E, 0.05 * (deaths[0] - death)), i);
                progressTries.push(newProgress);
                // progressTries.push({ distance: death, times: Math.pow(Math.E, 0.05 * i) + 1 });
                this.distanceBPT = 0;
            }
            const newDeathsToDistance = new AttemptData(death, Math.pow(Math.E, 0.05 * i) + 1, i);
            deathsToDistance.push(newDeathsToDistance);
        }

        this.meanProgress = meanWeighted(progressTries);
        this.stdDevProgress = standardDeviationWeighted(progressTries, this.meanProgress);
        this.meanOfDistance = Math.floor(meanWeighted(distanceBetweenProgressTries) + 1);

        this.mean = meanWeighted(deathsToDistance);
        this.stdDev = standardDeviationWeighted(deathsToDistance, this.mean);


        // const goodTry = mean - (Math.random() + 1.5) * stdDev;
        // const linearFunction2 = linearRegression(progressTries.map(t => t.position), progressTries.map(t => t.distance));
        // const exponential = exponentialRegression(progressTries.map(t => t.position), progressTries.map(t => t.distance));
        //Push Tries till progressTry
        const pushAmount = this.meanOfDistance - this.distanceBPT < 0 ? 0 : this.meanOfDistance - this.distanceBPT;
        this.pushTries(pushAmount, this.mean, this.stdDev);


        //recursive pushing till length of prediction is reached
        this.fillPrediction(1);

        this.logStats();

        return this.prediction;
    }

    pushTries(numoOfTries: number, mean: number, stdDev: number) {
        for (let i = 0; i < numoOfTries; i++) {
            this.pushOneTry(randomFromND(mean, stdDev));
        }
    }

    pushOneTry(tryToPush: number) {
        this.prediction.push(Math.min(Math.max(tryToPush, MINIMUM), this.max));
    }

    fillPrediction(recursive: number) {
        const goodTry = randomFromND(this.meanProgress - 0.5 * this.stdDevProgress, 1.25 * this.stdDevProgress);
        this.pushOneTry(goodTry);
        this.pushTries(this.meanOfDistance, this.mean - recursive * 0.2 * this.stdDev, recursive * 0.1 * this.stdDev + this.stdDev);
        if (this.prediction.length < PREDICTIONLENGTH) {
            this.fillPrediction(recursive + 1);
        }
    }

    logStats() {
        const separator = '------------------------------------';
        console.log(separator);

        const stats = {
            "Mean of Distance": this.meanOfDistance,
            "Distance to Last Progress": this.distanceBPT,
            "Mean": this.mean,
            "Standard Deviation": this.stdDev,
            "Mean Progress": this.meanProgress,
            "Standard Deviation Progress": this.stdDevProgress,
            "Chance of Beating Boss": `${normalCDF(0, Math.min(...this.personalBests), this.stdDevProgress) * 100}%`,
            "Prediction": this.prediction
        };

        for (const [key, value] of Object.entries(stats)) {
            console.log(`%c${key}: %c[${value}]`, 'color: #1e90ff; font-weight: bold;', 'color: #32cd32;');
        }
    }
}

export class AttemptData {
    percentage: number;
    weight: number;
    position: number;

    constructor(percentage: number, weight: number, position: number) {
        this.weight = weight;
        this.position = position;
        this.percentage = percentage;
    }
}