all: build

build:
	deno task build

watch-build:
	deno run -A --watch=src/ --unstable --node-modules-dir npm:vite build

watch-main:
	deno run -A --unstable --watch=dist/ main.ts

dev:
	deno task dev
	
deploy: build
	(set -a && source .env && \
	cd dist && \
	deployctl deploy\
	 --project=deno-svelte-primer \
	main.ts)
