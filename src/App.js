import './App.css';
import {useState} from 'react';
import ImportFileComponent from './Components/ImportFileComponent';
import TableComponent from './Components/TableComponent';
import ReadPartitionFileComponent from './Components/ReadPartitionFileComponent';
import TablePartitionComponent from './Components/TablePartitionComponent';

function App() {

  const [data, setData] = useState([]);
  const [parts, setParts] = useState([]);

  const showData = () => {
    if (data.length === 0) {
      return (
        <h1>Data is not available</h1>
      )
    } else {
      return (
        // <h1>Data is available</h1>
        <div>
          <button onClick={handleInvertSelection}>Invert Row Selection</button>
          <button onClick={handleDeleteRow}>Delete Row</button>
          <button onClick={handleInvertColumnSelection}>Invert Column Selection</button>
          <button onClick={handleDeleteColumn}>Delete Column</button>
          <TableComponent data={data} parts={parts} handleSelectRow={e => handleSelectRow(e)}  handleSelectColumn={handleSelectColumn} />
        </div>
      )
    }
  }

  const handleSelectRow = (e) => {
    console.log(e.target);
    console.log("data", data);
    const row = e.target.parentElement.parentElement;
    if(row.classList.contains('row-selected')) {
      row.classList.remove('row-selected');
    } else {
        row.classList.add('row-selected');
    }
  }

  const handleDeleteRow = () => {
    let tempData = data.slice();
    console.log("data", data);
    let row = document.querySelectorAll(".row-selected");
    if (row.length !== 0) {
      let indexNeedRemove = []
      row.forEach((e) => {
        indexNeedRemove.push(e.rowIndex - 1);
      })
  
      for (let i = indexNeedRemove.length - 1; i >= 0; i--) {
        tempData.splice(indexNeedRemove[i], 1);
      }

      // console.log("temp", tempData);
      setData(tempData);
      console.log("data", data);
    }
    
    // console.log(row);
  }

  const handleSelectColumn = (e) => {
    // console.log(e.target.parentElement.cellIndex);
    const colIndex = e.target.parentElement.cellIndex;
    var row = document.querySelectorAll("tr.row");
    row.forEach((r) => {
      let columm = r.cells[colIndex];
      if (columm.classList.contains("col-selected")) {
        columm.classList.remove("col-selected");
      } else {
        columm.classList.add("col-selected");
      }
    });
    // console.log(row);
  }

  const handleInvertColumnSelection = () => {
    let colSelected = document.querySelectorAll("td.cell.col-selected");
    let colUnSelected = document.querySelectorAll("td.cell:not(.col-selected)");
    console.log(colSelected);
    colSelected.forEach(col => {
      col.classList.remove('col-selected')
    })

    colUnSelected.forEach(col => {
      col.classList.add("col-selected")
    })
  }

  const handleDeleteColumn = () => {
    let tempData = data.slice();
    let  col = document.querySelectorAll("thead tr td.col-selected");
    let indexNeedRemove = [];
    
    col.forEach(c => {
      indexNeedRemove.push(c.cellIndex - 2)
    })
    console.log(indexNeedRemove);
    
    for (let i = indexNeedRemove.length - 1; i >= 0; i--) {
      tempData.forEach(v => {
        v['value'].splice(indexNeedRemove[i], 1)
      })
    }

    setData(tempData);

    let colSelected = document.querySelectorAll("td.col-selected");
    colSelected.forEach(c => {
      c.classList.remove("col-selected")
    })
  }

  const handleInvertSelection = () => {
    var rowsSelected = document.querySelectorAll('tr.row.row-selected');
    var rowsUnSelected = document.querySelectorAll("tr.row:not(.row-selected)");
    // console.log(rowsSelected);
    if (rowsSelected !== null) {
      for (let i = 0; i < rowsSelected.length; i++) {
        rowsSelected[i].classList.remove("row-selected");
      }
      for (let i = 0; i < rowsUnSelected.length; i++) {
        rowsUnSelected[i].classList.add("row-selected");
      }
    } else {
      console.log("ko co du lieu");
    }

  }

  const showPartitionData = () => {
    if (parts.length === 0) {
      return (
        <h1>Them file partition</h1>
      )
    } else {
      console.log(parts);
      let part_list_element = [];
      parts.forEach(e => {
        let {name, begin, end} = e;
        let temp_after = begin + 2 <= end ? begin + 2 : end;
        let temp_before = end - 2 >= temp_after ? end - 2 : temp_after;
        for (let i = begin; i <= temp_after; i++) {
          part_list_element.push({
            "name": name,
            "column": i
          })
        }
        part_list_element.push({
          "name": name,
          "column": "..."
        })
        for (let i = temp_before; i <= end; i++) {
          part_list_element.push({
            "name": name,
            "column": i
          })
        }
      })

      return (
        <TablePartitionComponent data={part_list_element} />
      )
    }
  }
  return (
    <div className="App">
      <ImportFileComponent getData={setData} />
      { showData() }
      <ReadPartitionFileComponent setParts={setParts} />
      { showPartitionData() }
    </div>
  );
}

export default App;
