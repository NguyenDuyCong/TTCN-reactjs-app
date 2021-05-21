import React from 'react';

const TablePartitionComponent = (props) => {
    
    const data = props.data;

    const showContent = () => {
        return (
            data.map((v, i) => {
                let {name, column} = v;
                return (
                    <tr>
                        <td>{column}</td>
                        <td>{name}</td>
                    </tr>
                )
            })
        )
    }

    return (
        <table>
            <thead>
                <tr>
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