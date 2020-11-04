import data from './test-data/musc-taste-data.json';
import './App.css';
// This is the component that renders the graph visual structure
import Graph from './components/Graph';

// Two Dummy Music Taste Profiles

// Elisson's top 50 artists of all time
let elisson_data = data["Elisson"]
// Rafael's top 50 artitsts in the last month/4 weeks
let rafael_data = data["Rafael"]

// Merge of Data, contains all data found in both elisson_data and rafael_data
let merge = { ...elisson_data, ...rafael_data }

// Nodes And Links for Music Bridge graph
let nodes = [];
let links = [];

// Build Graph
for (const key in merge) {
    // Create Nodes with different values associated with them
    if (key in elisson_data && key in rafael_data) {
        nodes.push({
            id: key,
            source: "both",
            genres: merge[key]["genres"],
            value: Math.trunc(Math.random() * 20)
        });
    } else if (key in elisson_data) {
        nodes.push({
            id: key,
            source: "elisson",
            genres: merge[key]["genres"],
            value: Math.trunc(Math.random() * 20)
        });
    } else {
        nodes.push({
            id: key,
            source: "rafael",
            genres: merge[key]["genres"],
            value: Math.trunc(Math.random() * 20)
        });
    }

    // For each node, create edge if said node has the same genre as any other node
    for (const key1 in merge) {
        if (key === key1)
            continue;

        let genres1 = merge[key]["genres"];
        let genres2 = merge[key1]["genres"]
        let intersection = genres1.filter(x => genres2.includes(x));
        if (intersection.length > 0) {
            links.push({
                source: key,
                target: key1,
                genre: intersection[0],
                value: 10
            });
        }
    }
}

// Build Graph using created nodes and edges
const graph = {
    links: links,
    nodes: nodes
};

// Remder the App
function App() {
    return (
        // Currently only contains a single graph component which gets the graph object passed-in to it
        <div className='App'>
            <Graph className='graph' graph={graph} height={1000} width={2000} />
        </div>
    );
}

export default App;
