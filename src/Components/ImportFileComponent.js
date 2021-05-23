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

    // const handleFilePhy = (content) => {
    //     console.log("phy", content)
    //     let content_copy = content.split(/[ \n]+/)
    //     var data = [];
    //     console.log("data in import",data);
    //     // console.log(content_copy[3]);
    //     // console.log(content_copy);

    //     var i;
    //     for (i = 2; i < content_copy.length; i += 2) {
    //         if (content_copy[i] === "" || content_copy[i+1] === "") {
    //             continue;
    //         }
    //         data.push({
    //             "key": content_copy[i],
    //             "value": content_copy[i+1].replace("\r", "").split("")
    //         });
    //     }

    //     console.log(data);
    //     props.getData(data);
    // }

    // const handleFilePartition = (content) => {
    //     console.log("nex" ,content);
    //     let data = [];
    //     let regex_part = /charset part[0-9]+ = [0-9]+-[0-9]+/g;
    //     let parts = content.match(regex_part);
    //     // console.log(parts);

    //     parts.forEach(e => {
    //         let name = e.match(/part[0-9]+/g)[0];
    //         let range_num = e.match(/[0-9]+-[0-9]+/g)[0];
    //         let [begin, end] = range_num.split("-");
            
    //         // for (let i = parseInt(begin); i <= parseInt(end); i++) {
    //         //     data.push({
    //         //         "name": name,
    //         //         "column": i
    //         //     })
    //         // }
    //         data.push({
    //             "name": name,
    //             "begin": parseInt(begin),
    //             "end": parseInt(end)
    //         })
    //     });
    //     // console.log(data);
    //     props.setParts(data);
    // }

    // const readFileContents = async (file) => {
    //     return new Promise((resolve, reject) => {
    //         let fileReaders = new FileReader();
    //         fileReaders.onload = () => {
    //             resolve(fileReaders.result);
    //         };
    //         fileReaders.onerror = reject;
    //         fileReaders.readAsText(file);
    //     })
    // }

    // const readAllFiles = async (files) => {
    //     const results = await Promise.all(files.map(async (file) => {
    //         const fileContents = await readFileContents(file);
    //         return fileContents;
    //     }));
    //     console.log("results", results);
    //     return results;
    // }

    // const handleFile = (e) => {
    //     let files = [];
    //     [...e.target.files].map(file => files.push(file));
    //     if (files.length > 2) {
    //         alert("Chỉ được import tối đa 2 file trong đó bắt buộc có 1 file .phy");
    //     } else if (files.length === 2) {
    //         if (files[0].name.split(".")[1] === files[1].name.split(".")[1]) {
    //             alert("Chỉ được import tối data 1 file mỗi loại!");
    //         } else {
    //             readAllFiles(files).then(result => {
    //                 if(files[0].name.split(".")[1] === "nex"){
    //                     handleFilePartition(result[0]);
    //                     handleFilePhy(result[1]);
    //                 } else {
    //                     handleFilePartition(result[1]);
    //                     handleFilePhy(result[0]);
    //                 }
    //             })
    //             .catch(err => {
    //                 alert(err);
    //             })    
    //         }
    //     } else if (files.length === 1) {
    //         if (files[0].name.split(".")[1] === "nex") {
    //             alert("Bắt buộc phải có 1 file .phy khi import!")
    //         } else {
    //             readAllFiles(files).then(result => {
    //                 handleFilePhy(result[0]);
    //             })
    //             .catch(err => {
    //                 alert(err);
    //             })    
    //         }
    //     }
        
        // console.log(e.target.files);
    // }

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