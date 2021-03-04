# Stretching Routine

[![Netlify Status](https://api.netlify.com/api/v1/badges/67e36f90-6640-4ac2-b2ed-e661d72329ae/deploy-status)](https://app.netlify.com/sites/stretching-routine/deploys)

This is the webified version of the stretching routine presented in the [Physiology and Fitness](https://www.thegreatcoursesplus.com/physiology-and-fitness) course, episode 36. All props to them.

## Why

In an attempt to break my sedentary lifestyle, I challenged myself for 30 days stretching routine. Halfway through, while I could not do it entirely unaided, I needed less instruction. Knowing the order of exercises and when to switch from one was enough.

Besides this, I got bored of hearing the same jokes from the teacher for the 17th time.

## The app

This app takes you through the stretching routine. It's not meant to instruct you how to do the exercises, so there are no details, only a small clip to remind you of what you already know.

When the exercise begins and ends, there is a sound signal played. There's no option to turn this off, just [mute the tab](https://www.howtogeek.com/231959/how-to-mute-individual-browser-tabs-in-chrome-safari-and-firefox/) if you don't need it.

Before starting, you can set the duration of exercises and pauses between. The defaults are matching the pace of the course.

## Misc

This is a weekend project; there is no changelog or versioning. The repo is public because why not, so treat it like that.

### Technicalities

_You should keep the browser tab active during the stretch._

[Timeouts in inactive tabs](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Timeouts_in_inactive_tabs_throttled_to_%E2%89%A5_1000ms) are handled differently than on active tabs. The [worker-timers](https://github.com/chrisguttandin/worker-timers) package is a replacement for the `setTimeout` (that is used here in the most naive way) and can help with some strange edge cases.

_If you are using it from a mobile browser, the sound might not play._

This could be solved by using [howler.js](https://github.com/goldfire/howler.js#mobilechrome-playback), as it's capable of unlocking the audio playback automatically. 

I'm okay with these limitations, but if you fork the project and fix these, let me know.

---

## Development

Assuming you have `node` and `npm` already installed, run `npm install` to install the dependencies.

To quickly get the local version up and running, run `npm run serve`. This command will start a server, typically at `http://localhost:1234`. A different port is assigned, if the default is already used.

You can lint the JavaScript files with ESLint: `npm run lint`, and fix what's possible automatically with `npm run lint:fix`.

## Hosting

It's hosted on [Netlify](https://www.netlify.com) at [stretching-routine.netlify.app](https://stretching-routine.netlify.app).

The deployment is triggered when a commit is pushed to the `main` branch. The [badge](https://docs.netlify.com/monitor-sites/status-badges/) will indicate the status of the deployment.
