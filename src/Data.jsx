import React, { useEffect, useState } from 'react'
import "./css/data.css"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListIcon from '@mui/icons-material/List';
import InfoIcon from '@mui/icons-material/Info';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {db} from './firebase';

function Data() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    db.collection("myFiles").onSnapshot(snapshot=>{
      setFiles(snapshot.docs.map(doc=>({
        id:doc.id,
        data:doc.data()
      })))
    })
  }, [])

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

  return (
    <div className='data'>
        <div className="data__header">
          <div className="data__headerLeft">
            <p>My Drive</p>
            <ArrowDropDownIcon />
          </div>

          <div className="data__headerRight">
            <ListIcon />
            <InfoIcon />
          </div>
        </div>

        <div className="data__content">
          <div className="data__grid">
            {
              files.map((file)=>{
                  return <div className="data__file">
                <InsertDriveFileIcon />
                <p>{file.data.filename}</p>
              </div>
              })
            }
          </div>

          <div className="data__list">
            <div className="detailsRow">
              <p><b>Name <ArrowDownwardIcon /></b></p>
              <p><b>Owner </b></p>
              <p><b>Last Modified</b></p>
              <p><b>File Size</b></p>
            </div>
            {
              files.map((file)=> {
                return <div className="detailsRow">
                          <p>
                            <a href={file.data.fileURL} target="_blank">
                            <InsertDriveFileIcon /> {file.data.filename}
                            </a>
                          </p>
                          <p>Me </p>
                          <p>{new Date(file.data.timestamp?.seconds*1000).toUTCString()}</p>
                          <p>{bytesToSize(file.data.size)}</p>
                        </div>
              })
            } 
          </div>
        </div>
    </div>
  )
}

export default Data