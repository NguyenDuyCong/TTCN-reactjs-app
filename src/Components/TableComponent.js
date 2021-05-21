import React from 'react';
import "./TableComponent.css";

const TableComponent = (props) => {
    var data = props.data;
    var colA = 0;
    var colT = 0;
    var colG = 0;
    var colC = 0;
    var colGap = 0;
    var rows = 0;
    var columns = 0;

    var matrix = [];

    const countColValue = (matrix) => {
        rows = matrix.length;
        columns = matrix[0].length;
        let index = 0;
        while(index < matrix[0].length) {
            var isEqual = true;
            for(let i = 0; i < matrix.length - 1; i++) {
                if (matrix[i][index] !== matrix[i+1][index]) {
                    isEqual = false;
                    break;
                }
            }
            if (isEqual === true) {
                // eslint-disable-next-line default-case
                switch(matrix[0][index]) {
                    case "A":
                        colA ++;
                        break;
                    case "T":
                        colT++;
                        break;
                    case "G":
                        colG++;
                        break;
                    case "C":
                        colC++;
                        break;
                    case "-":
                        colGap ++;
                        break;
                }
            }
            index ++;
        }

        // console.log("count column A: ", colA);
        // console.log("count column T: ", colT);
        // console.log("count column G: ", colG);
        // console.log("count column C: ", colC);
        // console.log("count column -: ", colGap);
        // console.log("count rows: ", rows);
        // console.log("count columns: ", columns);
    }

    const getMatrix = () => {
        matrix = (data.map((value, index) => {
           return value['value'] 
        }))

        console.log(matrix);
        countColValue(matrix);
    }

    const showHeader = () => {
        return (
            <tr className="row">
                <td></td>
                <td></td>
                {data[0]['value'].map((value, index) => {
                    return (
                        <td className="cell"><div className="head" onClick={props.handleSelectColumn}>{index + 1}</div></td>
                    )
                })}
            </tr>
        )
    }

    const showContent = () => {
        return (
            data.map((v, index) => {
                let {key, value} = v;
                return (
                    <tr key={key} className="row">
                        <td onClick={e => props.handleSelectRow(e)}><div>{index + 1}</div></td>
                        <td><div className="name">{key}</div></td>
                        {
                            value.map((cellValue, cellIndex) => {
                                return (
                                    <td className="cell"><div>{cellValue}</div></td>
                                )
                            })
                        }
                    </tr>
                )
            })
        )
    }

    return (
        <div>
            <table>
                <thead>
                    {showHeader()}
                </thead>
                <tbody>
                    {showContent()}
                </tbody>
            </table>
            {
                getMatrix()
            }
            <div>
                <div>Number of rows: {rows}</div>
                <div>Number of columns: {columns}</div>
                <div>Number of A columns: {colA}</div>
                <div>Number of T columns: {colT}</div>
                <div>Number of G columns: {colG}</div>
                <div>Number of C columns: {colC}</div>
                <div>Number of - columns: {colGap}</div>
                <div>Number of partition: {props.parts.length}</div>
            </div>
        </div>
    )
}

export default TableComponent;