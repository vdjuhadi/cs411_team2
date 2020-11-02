import data from './test-data/musc-taste-data.json';
import './App.css';
import Graph from './components/Graph';

// Two Dummy Music Taste Profiles

// Elisson's top 50 artists of all time
let elisson_data = data["Elisson"]
// Rafael's top 50 artitsts in the last month/4 weeks
let rafael_data = data["Rafael"]

let merge = {...elisson_data, ...rafael_data}

let nodes = [];
let links = [];

for (const key in merge) {
    if (key in elisson_data && key in rafael_data) {
        nodes.push({
            id: key,
            source: "both",
            genres: merge[key]["genres"],
            value: Math.trunc(Math.random()*20)
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

const graph = {
    links: links,
    nodes: nodes
};

/* 
 *  Artsit:
 *       name: string
 *       image: string (url)
 *       genres: array
 */

function App() {
    return (
        <div className='App'>
            <Graph className='graph'graph={graph} height={1000} width={2000}/>
        </div>
    );
}

export default App;
