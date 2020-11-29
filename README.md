# Tweet Generator

The current model uses tweets containing `#blessed`.

https://hashtag-blessed.surge.sh/

### Setup

```sh
npm install
cp .env .env.sample # update with your values
```

### Run

```sh
node src/index.js
```

This will generate tweets.txt, which can be fed into the trainer to generate a model.

See instructions [here](https://github.com/ml5js/training-charRNN) for training.

I had success running the training inside a docker container with the correct version of python. After cloning the training repo, cd into the folder and start the docker container:

```sh
docker run -it -v $PWD:/app python:3.6 bash
```

The generated model should be placed in the `public/models` directory.