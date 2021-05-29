import React from 'react';

const TablePartitionComponent = (props) => {
    
    const data = props.data;

    const showContent = () => {
        return (
            data.map((v, i) => {
                let {name, column} = v;
                return (
                    <tr className="row-parts" key={i.toString()}>
                        <td className="column-parts">{column}</td>
                        <td className="name-parts">{name}</td>
                    </tr>
                )
            })
        )
    }

    return (
        <table className="table-partition">
            <thead>
                <tr className="row-parts">
                    <td>Column</td>
                    <td>Partition</td>
                </tr>
            </thead>
            <tbody>
                { showContent() }
            </tbody>
        </table>
    )
}

export default TablePartitionComponent;