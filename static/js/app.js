function buildPlots(sample) {
    d3.json('samples.json').then((data) => {
        var samples = data.samples;
        var chosenSample = samples.filter(row => row.id == sample);
        var result = chosenSample[0];
        console.log(result)

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        // Bar Chart
        var trace1 = {
            y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`),
            x: sample_values.slice(0, 10),
            text: otu_labels.slice(0, 10),
            type: 'bar',
            orientation: 'h',
            marker: {
                color: sample_values,
                colorscale: "Bluered"
            }
        };
        var data1 = [trace1];
        var layout1 = {
            title: "Top 10 Bacteria Found",
            margin: { t: 30, l: 150 }
        }
        Plotly.newPlot('bar', data1, layout1);

        // Bubble Chart
        var trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Bluered"
            }
        };
        var layout2 = {
            title: "Bacteria per Sample",
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID "},
            margin: {t: 30}
        };
        var data2 = [trace2];

        Plotly.newPlot('bubble', data2, layout2)
    });
}
function buildTable(sample) {
    d3.json('samples.json').then((data) => {
        var metadata = data.metadata;
        var chosenMeta = metadata.filter(row => row.id == sample);
        var result = chosenMeta[0];
        var demoTable = d3.select('#sample-metadata');
        demoTable.html('');
        Object.entries(result).forEach(([key, value]) => {
            demoTable.append('h6').text(`${key.toUpperCase()}: ${value}`);
        });
    });
}
function buildDropdown() {
    var dropDown = d3.select('#selDataset');
    d3.json('samples.json').then((data) => {
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
            dropDown
                .append('option')
                .text(sample)
                .property('value', sample);
        });
        var initSample = sampleNames[0]
        buildPlots(initSample);
        buildTable(initSample);    
    });
}

function optionChanged(sample) {
    // Fetch new data each time a new sample is selected
    buildPlots(sample);
    buildTable(sample);
  }

buildDropdown();
// firstSample();
// nextSample(sample)
