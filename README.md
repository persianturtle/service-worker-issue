# Reproducing a Service Worker related issue

This repo has two branches:

- [main](https://github.com/persianturtle/service-worker-issue/tree/main) (works fine)
- [not-working](https://github.com/persianturtle/service-worker-issue/tree/not-working) (does not work)

The issue is that `self.skipWaiting()` seems to have no effect when Firebase's Firestore is being used.

Steps to reproduce:

1. Run `npm start` and visit `localhost:5050`
2. Notice that the Service Worker is installed
3. Update the `currentCacheName` in `public/sw.js`
4. Refresh `localhost:5050`
5. Click "OK" on the confirm modal
6. Notice that the new Service Worker is not installed
7. Uncomment the commented lines in the Service Worker's `fetch` event to `return` early from the cross origin requests
8. Repeat steps 2-5
9. Notice that the new Service Worker is installed

Video Overview: https://drive.google.com/file/d/1M3HvvVll8T38i2YVGAjaOsovkYyCvGlk/view?usp=sharing
