import 'alpinejs';
import exercises from './exercises.json';
import sounds from './sounds.json';
import { msToMinAndSec, randomIntFromOneUntil, secToMs } from './helpers';

const STATES = {
    SETTINGS: 100,
    BUFFER: 200,
    STARTED: 300,
    PAUSED: 400,
    BETWEEN: 500,
    FINISHED: 600
};

let timeline;

const calculateSessionLength = (duration) => {
    let totalDuration = 0;

    exercises.forEach(({ ratio }) => {
        const exerciseDuration = parseInt(duration.exercise) * ratio.exercise;
        const betweenDuration = parseInt(duration.between) * ratio.between;

        totalDuration = totalDuration + exerciseDuration + betweenDuration;
    });

    return totalDuration + parseInt(duration.buffer);
};

const syncDurationTotal = (
    namespace,
    key,
    app,
    watcher
) => {
    app.durationTotal = calculateSessionLength(app.duration);

    watcher(
        `${namespace}.${key}`,
        () => {
            app.durationTotal = calculateSessionLength(app.duration);
        }
    );
};

const syncWithLocalStorage = (
    namespace,
    key,
    storage,
    watcher,
    fallbackValue = null
) => {
    const localStorageValue = localStorage.getItem(`${namespace}.${key}`);

    if (localStorageValue !== null) {
        storage[namespace][key] = localStorage.getItem(`${namespace}.${key}`);
    }

    if (localStorageValue === null && fallbackValue !== null) {
        storage[namespace][key] = fallbackValue;
    }

    watcher(
        `${namespace}.${key}`,
        (value) => {
            localStorage.setItem(`${namespace}.${key}`, value);
        }
    );
};

const playSound = (src) => {
    const sound = new Audio(src);

    sound.play();
};

const app = () => {
    return {
        state: STATES.SETTINGS,
        step: {
            current: 1,
            total: exercises.length
        },
        duration: {
            buffer: 10,
            exercise: 30,
            between: 4
        },
        durationTotal: 0,
        sound: {
            start: '',
            stop: ''
        },
        get currentExercise () {
            const index = this.step.current - 1;

            return exercises[index];
        },
        get currentStepDuration () {
            const duration = this.duration;
            const currentExerciseRation = this.currentExercise.ratio;

            return {
                exercise: duration.exercise * currentExerciseRation.exercise,
                between: duration.between * currentExerciseRation.between
            };
        },
        get formattedSessionLength () {
            const durationTotalInMs = secToMs(this.durationTotal);
            const [minutes, seconds] = msToMinAndSec(durationTotalInMs);

            return `${minutes}m ${seconds}s`;
        },
        get stage () {
            if (this.step.current < 19) {
                return 'warmup';
            }

            if (this.step.current < 41) {
                return 'standing';
            }

            return 'floor';
        },
        get animationDuration () {
            return this.duration.exercise * this.currentStepDuration.exercise;
        },
        init (watcher) {
            for (const key in this.duration) {
                syncWithLocalStorage('duration', key, this, watcher);
                syncDurationTotal('duration', key, this, watcher);
            }

            for (const key in this.sound) {
                const randomSoundIndex = randomIntFromOneUntil(sounds.length);
                const soundSrc = sounds[randomSoundIndex].src;

                syncWithLocalStorage('sound', key, this, watcher, soundSrc);
            }

            watcher('sound.start', (filePath) => playSound(filePath));
            watcher('sound.stop', (value) => playSound(value));
        },
        start () {
            this.step.current = 1;

            this.bufferNextStep();
        },
        resume () {
            this.bufferNextStep();
        },
        pause () {
            this.state = STATES.PAUSED;

            clearTimeout(timeline);
        },
        bufferNextStep () {
            this.state = STATES.BUFFER;

            setTimeout(() => {
                this.transitionToNextStep();
            }, secToMs(this.duration.buffer));
        },
        transitionToNextStep () {
            this.state = STATES.BETWEEN;

            const startSound = new Audio(this.sound.start);
            const stopSound = new Audio(this.sound.stop);

            timeline = setTimeout(() => {
                this.state = STATES.STARTED;

                startSound.play();

                timeline = setTimeout(() => {
                    stopSound.play();

                    if (this.step.current === this.step.total) {
                        this.state = STATES.FINISHED;
                        return;
                    }

                    this.step.current = this.step.current + 1;

                    this.transitionToNextStep();
                }, secToMs(this.currentStepDuration.exercise));
            }, secToMs(this.currentStepDuration.between));
        }
    };
};

window.states = STATES;
window.sounds = sounds;
window.app = app;
