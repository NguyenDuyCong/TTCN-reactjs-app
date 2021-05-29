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
          <ReadPartitionFileComponent setParts={setParts} />
          <button onClick={handleExportPhyFile}>Export .phy File</button>
          <button onClick={handleExportNexFile}>Export .nex File</button>
          <button onClick={handleInvertSelection}>Invert Row Selection</button>
          <button onClick={handleDeleteRow}>Delete Row</button>
          <button onClick={handleInvertColumnSelection}>Invert Column Selection</button>
          <button onClick={handleDeleteColumn}>Delete Column</button>
          <TableComponent data={data} parts={parts} handleSelectRow={e => handleSelectRow(e)}  handleSelectColumn={handleSelectColumn} />
        </div>
      )
    }
  }

  const handleExportNexFile = () => {
    // console.log(parts);
    let content = "#nexus\n";
    content += "begin sets;\n";
    if (parts.length !== 0) {
      parts.forEach(p => {
        content += "\tcharset " + p["name"] + " = " + p["begin"].toString() + "-" + p["end"].toString() + ";\n";
      })
      content += "\tcharpartition mine =" + parts.map(v => " " + v["name"] + ":" + v["name"]) + ";\n";
    } else {
      content += "\tcharset part1 = 1-" + data[0]['value'].length.toString() + ";\n";
      content += "\tcharpartition mine = part1:part1;\n";
    }
    content += "end;"
    console.log(content);

    // handle to download
    var download = document.createElement('a');
    var blob = new Blob([content], {type: "text/plain;charset=utf-8;"});
    var url = URL.createObjectURL(blob);
    download.href = url;
    download.setAttribute('download', 'test.nex');
    download.click();
  }

  const addWhiteSpace = (key) => {
    let listSpace = Array(12).fill(" ");
    listSpace.splice(0, key.length);
    return listSpace.join("");
  }

  const handleExportPhyFile = () => {
    // console.log(data);
    let content = "";
    content += data.length + " " + data[0]['value'].length + "\n";
    data.forEach(d => {
      content += d["key"] + addWhiteSpace(d["key"]) + d['value'].join("") + "\n";
    })
    console.log(content);

    // handle to download
    var download = document.createElement('a');
    var blob = new Blob([content], {type: "text/plain;charset=utf-8;"});
    var url = URL.createObjectURL(blob);
    download.href = url;
    download.setAttribute('download', 'test.phy');
    download.click();
  }

  const handleSelectRow = (e) => {
    // console.log(e.target);
    // console.log("data", data);
    const row = e.target.parentElement.parentElement;
    if(row.classList.contains('row-selected')) {
      row.classList.remove('row-selected');
    } else {
        row.classList.add('row-selected');
    }
  }

  const handleDeleteRow = () => {
    let tempData = data.slice();
    // console.log("data", data);
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
      // console.log("data", data);
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
    // console.log(colSelected);
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
    // console.log(indexNeedRemove);
    
    for (let i = indexNeedRemove.length - 1; i >= 0; i--) {
      tempData.forEach(v => {
        v['value'].splice(indexNeedRemove[i], 1)
      })
    }

    // edit parts if it is imported
    let tempParts = parts.slice();
    if(tempParts.length !== 0) {
      let count = 0;
      for (let i = 0; i < tempParts.length; i++) {
        // eslint-disable-next-line
        let {name, begin, end} = tempParts[i];
        if (count > 0) {
          tempParts[i]['begin'] = begin - count;
          count = 0;
        }
        for (let k = 0; k <= indexNeedRemove.length; k++) {
          if (indexNeedRemove[k] >= begin && indexNeedRemove[k] <= end) {
            count ++;
          } else {
            continue;
          }
        }
        if (count > 0) {
          tempParts[i]["end"] = end - count;
          indexNeedRemove.splice(0, count);
        }
      }
    }
    if (tempParts.length !== 0) {
      setParts(tempParts);
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
        <h1>Partitions is not available</h1>
      )
    } else {
      // console.log(parts);
      let part_list_element = [];
      parts.forEach(e => {
        let {name, begin, end} = e;
        for (let i = begin; i <= end; i++) {
          part_list_element.push({
            "name": name,
            "column": i
          })
        }
      })

      return (
        <div>
          <label htmlFor="part-name">
            name partition: 
            <input type="text" id="part-name" name="part-name" style={{width: 70}} />
          </label>
          <label htmlFor="start">
            begin:
            <input id="start" type="number" name="start" style={{width: 50}}/>
          </label>
          <label htmlFor="end">
            end:
            <input id="end" type="number" name="end" style={{width: 50}}/>
          </label>
          <button onClick={handleEditNamePart}>Edit partition</button>
          <TablePartitionComponent data={part_list_element} handleEditNamePart={handleEditNamePart}/>
        </div>
      )
    }
  }

  const handleEditNamePart = (e) => {
    let name = document.querySelector("input#part-name");
    let start = document.querySelector("input#start");
    let end = document.querySelector("input#end");
    if (name.value === "" || start.value === "" || end.value === "") {
      alert("Không được để trống phần nhập");
    } else if (name.value.indexOf(" ") >= 0) {
      alert("Tên không được có dấu cách");
    } else if (parseInt(start.value) > parseInt(end.value)) {
      alert("Vị trí bắt đầu phải nhỏ hơn vị trí kết thúc");
    } else {
      let partsData = parts.slice();
      let newPartsData = [];
      let isNextPart = false;
      let isChanged = true;
      // console.log(partsData);
      for (let i = 0; i < partsData.length; i++) {
        // console.log(newPartsData);
        let p_name = partsData[i]['name'];
        let p_begin = partsData[i]['begin'];
        let p_end = partsData[i]['end'];
        // console.log(partsData[i]);
        // console.log(p_name, p_begin, p_end);
        if (p_name === name.value) {
          alert("Tên partition đã được dùng rồi");
          isChanged = false;
          break;
        } else {
          if (parseInt(start.value) > p_end || parseInt(end.value) < p_begin) {
            // add part1
            newPartsData.push({
              "name": p_name,
              "begin": p_begin,
              "end": p_end
            });
            continue;
          }
          if (parseInt(start.value) === p_begin) {
            if (parseInt(end.value) < p_end) {
              // add new part
              newPartsData.push({
                "name": name.value,
                "begin": p_begin,
                "end": parseInt(end.value)
              });
              // add part 1
              newPartsData.push({
                "name": p_name,
                "begin": parseInt(end.value) + 1,
                "end": p_end
              });
            } else {
              // add new part
              newPartsData.push({
                "name": name.value,
                "begin": p_begin,
                "end": parseInt(end.value)
              });
            }
          } else if (parseInt(start.value) > p_begin) {
            // add part1
            newPartsData.push({
              "name": p_name,
              "begin": p_begin,
              "end": parseInt(start.value) - 1
            });
            if (parseInt(end.value) > p_end) {
              isNextPart = true;
              // add new part
              newPartsData.push({
                "name": name.value,
                "begin": parseInt(start.value),
                "end": parseInt(end.value)
              });
            } else {
              // add new part
              newPartsData.push({
                "name": name.value,
                "begin": parseInt(start.value),
                "end": p_end
              });
            }
          } else if (isNextPart) {
            if (parseInt(end.value) > end) {
              isNextPart = true;
              continue;
            } else {
              newPartsData.push({
                "name": p_name,
                "begin": parseInt(end.value) + 1,
                "end": p_end
              });
              isNextPart = false;
            }
          }
        }
      }
      if (isChanged) {
        setParts(newPartsData);
      }
      // console.log(newPartsData);
      // console.log([name.value, start.value, end.value]);
    }
  }

  return (
    <div className="App">
      <ImportFileComponent getData={setData} />
      { showData() }
      { showPartitionData() }
    </div>
  );
}

export default App;
