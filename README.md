# Stretching Routine

![QA](https://github.com/meszarosrob/stretching-routine/workflows/QA/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/67e36f90-6640-4ac2-b2ed-e661d72329ae/deploy-status)](https://app.netlify.com/sites/stretching-routine/deploys)

This is the web version of the stretching routine from the [Physiology and Fitness](https://www.thegreatcoursesplus.com/physiology-and-fitness) course (episode 36) with duration settings and sound effects.

## The story

...

## Misc

You should keep the browser tab active during the stretch, and don't be surprised if the sound does not play in a mobile browser.

[Timeouts in inactive tabs](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Timeouts_in_inactive_tabs_throttled_to_%E2%89%A5_1000ms) are handled differently than on active tabs.
The [worker-timers](https://github.com/chrisguttandin/worker-timers) package is a replacement for the `setTimeout` (that is used here in the most naive way) and can help with some strange edge cases.

As for the sound, that could be solved by using [howler.js](https://github.com/goldfire/howler.js#mobilechrome-playback), as it's capable of unlocking the audio playback automatically. 

But the need to implement these so far did not arise.

---

## Development

Assuming you have `node` and `npm` already installed, run `npm install` to install the dependencies.

To quickly get the local version up and running, run `npm run-script serve`. This command will start a server, typically at `http://localhost:1234`.

At the moment, the build command does not copy over the asset (clips, sounds) files; to do that, run: `cp -R assets/ dist/`.

If you plan to make a pull request, before committing, lint the JavaScript files with ESLint: `npm run-script lint:fix`.

This is a weekend project, done to have fun; there is no changelog or versioning.

## Hosting

It's hosted on [Netlify](https://www.netlify.com) at [stretching-routine.netlify.app](https://stretching-routine.netlify.app).

The deployment is triggered when a commit is pushed to the `main` branch. The [badge](https://docs.netlify.com/monitor-sites/status-badges/) will indicate the status of the deployment.

#### Deployment settings

In case you want to host your version there, use these settings:

- Build command: `npm run-script build && cp -R assets/ dist/`
- Publish directory: `dist`
