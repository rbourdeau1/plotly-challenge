d3.json('samples.json').then((data) => {
    var samples = data.samples;
    var chosenSample = samples.filter(row => row.id == '940');
    var result = chosenSample[0];
    console.log(result);
    
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    var trace = {
        y: otu_ids.slice(0, 10),
        x: sample_values.slice(0, 10),
        text: otu_labels.slice(0, 10),
        type: 'bar',
        orientation: 'h'
    };

    var data = [trace];

    Plotly.newPlot('bar', data); 
})
