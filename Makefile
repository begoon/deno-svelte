all: build

build:
	deno task build

deploy:
	(set -a && source .env && \
	cd dist && \
	deployctl deploy\
	 --project=deno-svelte-primer \
	 https://deno.land/std@0.171.0/http/file_server.ts)
