import React from "react";
const HtmlTableToJson = require("html-table-to-json");

async function download(event) {
  const file = event.target.files.item(0);
  const reader = new FileReader();
  reader.onload = (event) => {
    const table = HtmlTableToJson.parse(event.target.result);
    const json = table.results;
    document.getElementById("json").innerHTML = JSON.stringify(json[0]);
  };
  reader.readAsText(file);
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <input
          type="file"
          onChange={(event) => {
            download(event);
          }}
        ></input>
        <pre id="json"></pre>
      </div>
    );
  }
}

export default App;
