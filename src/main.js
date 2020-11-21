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

const randomIntFromOneUntil = (max) => {
    return Math.floor(Math.random() * (max - 1)) + 1;
};

const saveToLocalStorage = (key, val) => {
    localStorage.setItem(key, val);
};

const app = () => {
    return {
        state: STATES.SETTINGS,
        step: 1,
        duration: {
            buffer: 5,
            exercise: 15,
            between: 3
        },
        sound: {
            start: '',
            stop: ''
        },
        init (watcher) {
            watcher('duration.buffer',
                (val) => saveToLocalStorage('duration.buffer', val));
            watcher('duration.exercise',
                (val) => saveToLocalStorage('duration.exercise', val));
            watcher('duration.between',
                (val) => saveToLocalStorage('duration.between', val));
            watcher('sound.start',
                (val) => saveToLocalStorage('sound.start', val));
            watcher('sound.stop',
                (val) => saveToLocalStorage('sound.stop', val));

            if (localStorage.getItem('duration.buffer') !== null) {
                this.duration.buffer = localStorage.getItem('duration.buffer');
            }

            if (localStorage.getItem('duration.exercise') !== null) {
                this.duration.exercise = localStorage.getItem(
                    'duration.exercise');
            }

            if (localStorage.getItem('duration.between') !== null) {
                this.duration.between = localStorage.getItem(
                    'duration.between');
            }

            if (localStorage.getItem('sound.start') === null) {
                this.sound.start = sounds[randomIntFromOneUntil(
                    sounds.length)].src;
            }

            if (localStorage.getItem('sound.stop') === null) {
                this.sound.stop = sounds[randomIntFromOneUntil(
                    sounds.length)].src;
            }
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

            timeline = setTimeout(() => {
                this.state = STATES.STARTED;

                startSound.play();

                timeline = setTimeout(() => {
                    stopSound.play();

                    if (this.step === exercises.length) {
                        this.state = STATES.FINISHED;
                        return;
                    }

                    this.step = this.step + 1;

                    this.transitionToNextExercise();
                }, secInMs(this.duration.exercise));
            }, secInMs(this.duration.between));
        },
        get exercise () {
            const index = this.step - 1;

            return exercises[index];
        }
    };
};

window.states = STATES;
window.sounds = sounds;
window.app = app;
