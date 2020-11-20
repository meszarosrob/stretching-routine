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
            start: 'assets/soundEffects/sound-01.mp3',
            stop: 'assets/soundEffects/sound-07.mp3'
        },
        start () {
            this.step = 1;

            this.buffer();
        },
        resume () {
            this.buffer();
        },
        pause () {
            clearTimeout(timeline);

            this.state = STATES.PAUSED;
        },
        buffer () {
            this.state = STATES.BUFFER;

            setTimeout(() => {
                this.oneTurn();
            }, secInMs(this.duration.buffer));
        },
        oneTurn () {
            this.state = STATES.BETWEEN;

            const startSound = new Audio(this.sound.start);
            const stopSound = new Audio(this.sound.stop);

            if (this.step !== 1) {
                stopSound.play();
            }

            timeline = setTimeout(() => {
                this.state = STATES.STARTED;

                startSound.play();

                timeline = setTimeout(() => {
                    if (this.step === exercises.length) {
                        this.state = STATES.FINISHED;
                        return;
                    }

                    this.step = this.step + 1;

                    this.oneTurn();
                }, secInMs(this.duration.exercise));
            }, secInMs(this.duration.between));
        },
        get exercise () {
            const index = this.step - 1;

            return exercises[index];
        },
        get soundEffects () {
            return sounds;
        }
    };
};

window.states = STATES;
window.app = app;
