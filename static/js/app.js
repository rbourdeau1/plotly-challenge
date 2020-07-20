d3.json('samples.json').then((data) => {
    var samples = data.samples;
    var chosenSample = samples.filter(row => row.id == '940');
    var result = chosenSample[0];
    console.log(result);
    
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    var trace = {
        y: otu_ids,
        x: sample_values,
        text: otu_labels,
        type: 'bar',
        orientation: 'h'
    };

    var data = [trace];

    Plotly.newPlot('bar', data); 
})
