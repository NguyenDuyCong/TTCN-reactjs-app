import React from 'react';

const ReadPartitionFileComponent = (props) => {

    let fileReader;
    const handleFileRead = (e) => {
        const content = fileReader.result;
        // console.log(content);
        let data = [];
        let regex_part = /charset part[0-9]+ = [0-9]+-[0-9]+/g;
        let parts = content.match(regex_part);
        // console.log(parts);

        parts.forEach(e => {
            let name = e.match(/part[0-9]+/g)[0];
            let range_num = e.match(/[0-9]+-[0-9]+/g)[0];
            let [begin, end] = range_num.split("-");
            
            // for (let i = parseInt(begin); i <= parseInt(end); i++) {
            //     data.push({
            //         "name": name,
            //         "column": i
            //     })
            // }
            data.push({
                "name": name,
                "begin": parseInt(begin),
                "end": parseInt(end)
            })
        });
        // console.log(data);
        props.setParts(data);
    };

    const handleFileChosen = (file) => {
        // console.log(file);
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    }

    // const handleFile = (e) => {
    //     console.log(e.target.files);
    // }

    return (
        <div className = 'upload-file-partition'>
            <input 
                type="file"
                id='file'
                className='input-file'
                // onChange={e => handleFileChosen(e.target.files[0])}
                onChange={e => handleFileChosen(e.target.files[0])}
            />
        </div>
    )
}

export default ReadPartitionFileComponent;