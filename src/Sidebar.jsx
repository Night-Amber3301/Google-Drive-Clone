import React, { useState } from 'react'
import "./css/Sidebar.css"
import AddIcon from '@mui/icons-material/Add';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import DevicesIcon from '@mui/icons-material/Devices';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import Modal from '@mui/material/Modal';
import { db, storage } from './firebase';
import firebase from 'firebase/compat/app';

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const handleClose=()=> {
    setOpen(false);
  }

  const handleOpen=()=> {
    setOpen(true);
  }

  const handleChange=(e)=> {
    if(e.target.files[0])
    {
      setFile(e.target.files[0])
    }
  }

  const handleUpload=(event)=> {
    event.preventDefault();
    setUploading(true);

    storage.ref(`files/${file.name}`).put(file).then(snapshot=>{
      storage.ref("files").child(file.name).getDownloadURL().then(url=>{
        db.collection("myFiles").add({
          timestamp:firebase.firestore.FieldValue.serverTimestamp(),
          filename:file.name,
          fileURL:url,
          size:snapshot.bytesTransferred
        })

        setUploading(false);
        setFile(null);
        setOpen(false);
      })
    })
  }
  return (
    <>
    <Modal open={open} onClose={handleClose}>
      <div className="modal_pop">
        <form>
          <div className="modalHeading">
            <h3>Select file you want to upload</h3>
          </div>

          <div className="modalBody">
            {
              uploading ? (<p className="uploading">Uploading</p>) : (
                <>
                <input type="file" onChange={handleChange}/>
                <input type="submit" className="post_submit" onClick={handleUpload} />
                </>
              )
            }
          </div>
        </form>
      </div>
    </Modal>
    <div className='sidebar'>
        <div className='sidebar__btn'>
            <button onClick={handleOpen}>
                <AddIcon />
                <span>New</span>
            </button>
        </div>

        <div className="sidebar_options">
            <div className="sidebar_option sidebar_option-Active" >
              <MobileScreenShareIcon />
              <span><b>My Drive</b></span>
            </div>

            <div className="sidebar_option">
              <DevicesIcon />
              <span>Computers</span>
            </div>

            <div className="sidebar_option">
              <PeopleAltIcon />
              <span>Shared with me</span>
            </div>

            <div className="sidebar_option">
              <QueryBuilderIcon />
              <span>Recent</span>
            </div>

            <div className="sidebar_option">
              <StarBorderIcon />
              <span>Starred</span>
            </div>

            <div className="sidebar_option">
              <DeleteOutlineIcon />
              <span>Trash</span>
            </div>

            <hr/>
          <div className="sidebar_options">
            <div className="sidebar_option">
              <CloudQueueIcon />
              <span>Storage</span>
            </div>

            <div className="progress_bar">
              <progress size="tiny" value="50" max="100" />
              <span>6.45 GB of 15 GB used</span>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Sidebar

