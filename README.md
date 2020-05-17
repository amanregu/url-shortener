# URL-Shortener build on RoR 6.

## Setup

1. Clone the repository.

```sh
$ git clone https://github.com/amanregu/url-shortener.git
```

2. Go to the url-shortner directory
```sh
$ cd url-shortner
```

3. Install dependencies.
```sh
$ bundle install
$ yarn install --check-files
```

4. Create and migrate database.
```sh
$ rails db:create db:migrate db:setup
```


## Rake tasks.

The following line will print the encoded url in the terminal
```sh
$ URL=https://bigbinary.com/jobs bundle exec rake app:encode
```
The following line will print the original url when provided with a short-url.
```sh
$ SHORTURL=https://short.is/tkLo2367 bundle exec rake app:decode 
```
