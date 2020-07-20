d3.json('samples.json').then((data) => {
    var samples = data.samples;
    var chosenSample = samples.filter(row => row.id == '940');
    var result = chosenSample[0];
    console.log('result')
})