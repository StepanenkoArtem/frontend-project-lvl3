prettier-write:
	npx prettier-eslint --write **/*.js

install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm run test

build:
	npm run build

dev-build:
	npm run build:dev

serve:
	npm run serve

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test
