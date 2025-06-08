# Make a JPG

This project is an old prototype for creating simple JPG images in the browser.  
It relies on PHP for data storage with [Parse](https://parseplatform.org/) and a
small Grunt build pipeline.

## Requirements

- Node.js (v18 or newer recommended)
- PHP 7.4+
- Composer

## Setup

1. Install PHP dependencies:
   ```bash
   composer install
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Build assets for development:
   ```bash
   npm start
   ```
   For a production build run `npm run build`.

Parse credentials can be provided via the environment variables
`PARSE_APP_ID`, `PARSE_REST_KEY` and `PARSE_MASTER_KEY`.  Defaults are
available in `vendor/parseConfig.php`.

## Notes

This code base was created many years ago. Modern dependencies and build
tools have been configured but the application logic remains largely
unchanged.
