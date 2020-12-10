import 'alpinejs';
import exercises from './exercises.json';
import sounds from './sounds.json';

const STATES = {
    SETTINGS: 100,
    BUFFER: 200,
    STARTED: 300,
    PAUSED: 400,
    BETWEEN: 500,
    FINISHED: 600
};

let timeline;

const secInMs = (time) => {
    return time * 1000;
};

const calcTotalTime = (duration) => {
    let loop = 0;
    exercises.forEach(element => {
        const exerciseDuration = secInMs(
            duration.exercise * element.ratio.duration
        );
        const pauseDuration = secInMs(
            duration.between * element.ratio.pause
        );
        loop += exerciseDuration + pauseDuration;
    });

    return duration.buffer + loop;
};

const randomIntFromOneUntil = (max) => {
    return Math.floor(Math.random() * (max - 1)) + 1;
};

const syncWithLocalStorage = (
    namespace,
    key,
    storage,
    watcher,
    fallbackValue = null
) => {
    watcher(
        `${namespace}.${key}`,
        (value) => localStorage.setItem(`${namespace}.${key}`, value)
    );

    const localStorageValue = localStorage.getItem(`${namespace}.${key}`);

    if (localStorageValue !== null) {
        storage[namespace][key] = localStorage.getItem(`${namespace}.${key}`);
    }

    if (localStorageValue === null && fallbackValue !== null) {
        storage[namespace][key] = fallbackValue;
    }
};

const previewSound = (src) => {
    const sound = new Audio(src);

    sound.play();
};

const app = () => {
    return {
        state: STATES.SETTINGS,
        steps: exercises.length,
        step: 1,
        totalTime: 1232131,
        duration: {
            buffer: 10,
            exercise: 30,
            between: 4
        },
        sound: {
            start: '',
            stop: ''
        },
        init (watcher) {
            for (const key in this.duration) {
                syncWithLocalStorage('duration', key, this, watcher);
            }

            for (const key in this.sound) {
                const randomSoundIndex = randomIntFromOneUntil(sounds.length);
                const soundSrc = sounds[randomSoundIndex].src;

                syncWithLocalStorage('sound', key, this, watcher, soundSrc);
            }

            watcher('sound.start', (value) => previewSound(value));
            watcher('sound.stop', (value) => previewSound(value));
        },
        start () {
            this.step = 1;

            this.waitToStartExercise();
        },
        resume () {
            this.waitToStartExercise();
        },
        pause () {
            clearTimeout(timeline);

            this.state = STATES.PAUSED;
        },
        waitToStartExercise () {
            this.state = STATES.BUFFER;

            setTimeout(() => {
                this.transitionToNextExercise();
            }, secInMs(this.duration.buffer));
        },
        transitionToNextExercise () {
            this.state = STATES.BETWEEN;

            const startSound = new Audio(this.sound.start);
            const stopSound = new Audio(this.sound.stop);

            const pauseDuration = secInMs(
                this.duration.between * this.exercise.ratio.pause
            );

            timeline = setTimeout(() => {
                this.state = STATES.STARTED;

                startSound.play();

                const exerciseDuration = secInMs(
                    this.duration.exercise * this.exercise.ratio.duration
                );

                timeline = setTimeout(() => {
                    stopSound.play();

                    if (this.step === exercises.length) {
                        this.state = STATES.FINISHED;
                        return;
                    }

                    this.step = this.step + 1;

                    this.transitionToNextExercise();
                }, exerciseDuration);
            }, pauseDuration);
        },
        get exercise () {
            const index = this.step - 1;

            return exercises[index];
        },
        get totalTimeInSec () {
            const minutes = Math.floor(
                (this.totalTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((this.totalTime % (1000 * 60)) / 1000);

            return `${minutes}m ${seconds}s`;
        },
        get stage () {
            if (this.step < 19) {
                return 'warmup';
            }

            if (this.step >= 19 && this.step < 41) {
                return 'standing';
            }

            return 'floor';
        }
    };
};

window.states = STATES;
window.sounds = sounds;
window.app = app;
