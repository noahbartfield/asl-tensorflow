import {sequential, layers, train, tensor2d} from '@tensorflow/tfjs'

// dummy data and dummy neural network to understand fundamentals
// shape of images from dataset will be much different and most things will change

function defineModel() {
    const model = sequential();

    const hidden = layers.dense({
        inputShape: [2],
        units: 4,
        activation: 'sigmoid'
    });
    const output = layers.dense({
        units: 1,
        activation: 'sigmoid'
    });

    model.add(hidden)
    model.add(output)

    
    const sgdOpt = train.sgd(0.5);
    model.compile({
        optimizer: sgdOpt,
        loss: 'meanSquaredError'
    })
    
    const xs = tensor2d([
        [0, 0],
        [0.5, 0.5],
        [1, 1],
    ])

    const ys = tensor2d([
        [1],
        [0.5],
        [0],
    ])

    const config = {
        verbose: true,
        epochs: 5,
        shuffle: true
    }

    async function trainModel() {
        for (let i = 0; i < 100; i++){
            const response = await model.fit(xs, ys, config)
            console.log(response.history.loss[0])
        }
    }

    trainModel().then(() => {
        console.log('training complete')
        const outputs = model.predict(xs)
        outputs.print()
    })


}

export default defineModel