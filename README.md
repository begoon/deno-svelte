# Deno Deploy KV editor in Svelte

NOTE: This application requires Deno Deploy 1.36.4 or later.

This is a simple KV editor for Deno Deploy KV storage. It is written in Svelte.

The entry point is `main.ts`. This file runs Deno oak server to serve the API
on `/kv/...` paths, allowing the Svelte app to access the KV storage, and
the Svelte app itself.

The Svelte app is in `src/` directory. It builds to the `dist/` directory
as an SPA application.

## Development

```sh
git clone git@github.com:begoon/deno-svelte.git
cd deno-svelte
```

### Run locally

You don't need `node` or `npm` to run the app locally. `deno` will pull all
the dependencies for you (includeing `vite`, `svelte` etc.)

`main.ts` propagates test data from the environment variables to the KV storage
to demonstrate the app functionality.

```sh
deno task watch:main
```

This command runs `main.ts` in watch mode. It will restart the server on
every change in the code and in the `dist/` directory.

You may also run the Svelte app build in watch mode:

```sh
deno task watch:build
```

On every change in the `src/` directory it will rebuild the app in the `dist/`.
This in turns will trigger the server restart.

## Configuration

The app does not need any environment variables by detault. It uses the local
KV storage of the host (either Deno Deploy or your local machine).

If you want to use the app with a remote KV storage (for example, connect
your local application to the remote KV storage on Deno Deploy), you need
to set the following environment variables:

```sh
DENO_KV_ACCESS_TOKEN=...
DENO_KV_DATABASE=...
```

There is a blog post from the Deno Deploy team on how to get the KV access.

<https://deno.com/blog/kv-open-beta#connect-to-kv-from-outside-of-deno-deploy>

## Deploy to Deno Deploy

You need to push your code a github repository. Then you create a new Deno
Deploy project and connect it to the github repository. You need to set the
the entry point to `main.ts` from the `main`` branch.

That's it.
