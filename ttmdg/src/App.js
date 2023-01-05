import React from "react";
import { Chart } from "primereact/chart";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const HtmlTableToJson = require("html-table-to-json");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      json: null,
    };
  }

  download(event) {
    const file = event.target.files.item(0);
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event) => {
      const table = HtmlTableToJson.parse(event.target.result);
      const json = table.results;
      const data = { json: { data: json[0], keys: Object.keys(json[0][0]) } };
      this.createData(data);
    };
  }

  createData(object) {
    let data = {
      players: [],
      goals: [],
      apps: [],
    };
    object.json.data.forEach((element) => {
      data.players.push(element.Player);
      data.goals.push(element.Gls);
      data.apps.push(element.Apps);
    });
    this.setState({
      data: {
        labels: data.players,
        datasets: [
          {
            label: "Goals",
            data: data.goals,
          },
          { label: "Apps", data: data.apps },
        ],
      },
    });
  }

  render() {
    return (
      <div>
        <div className="App">
          <input
            type="file"
            onChange={(event) => {
              console.log(event);
              this.download(event);
            }}
          />
        </div>
        {this.state.json && (
          <DataTable value={this.state.json.data}></DataTable>
        )}
        {this.state.data && (
          <div className="card">
            <Chart type="bar" data={this.state.data} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
