import React from 'react';

const ImportFileComponent = (props) => {

    let fileReader;
    const handleFileRead = (e) => {
        const content = fileReader.result;
        let content_copy = content.split(/[ \n]+/)
        var data = [];
        console.log("data in import",data);
        // console.log(content_copy[3]);
        // console.log(content_copy);

        var i;
        for (i = 2; i < content_copy.length; i += 2) {
            if (content_copy[i] === "" || content_copy[i+1] === "") {
                continue;
            }
            data.push({
                "key": content_copy[i],
                "value": content_copy[i+1].replace("\r", "").split("")
            });
        }

        console.log(data);
        props.getData(data);
    };

    const handleFileChosen = (file) => {
        // console.log(file);
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    }

    return (
        <div className = 'upload-expense'>
            <label className="custom-input-file">
                Import file 
                <input 
                    type="file"
                    id='file'
                    className='input-file'
                    onChange={e => handleFileChosen(e.target.files[0])}
                    // onChange={e => handleFile(e)}
                />
            </label>
        </div>
    )
}

export default ImportFileComponent;