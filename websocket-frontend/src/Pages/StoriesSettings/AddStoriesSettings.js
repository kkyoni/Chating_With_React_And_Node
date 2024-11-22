import React, { useEffect, useState } from "react";
import { Upload, Image } from "antd";

function AddStoriesSettings() {
  // const [previewOpen, setPreviewOpen] = useState(false);
  // const [previewImage, setPreviewImage] = useState("");
  // const [fileList, setFileList] = useState([
  //   {
  //     uid: "-1",
  //     name: "image.png",
  //     status: "done",
  //     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //   },
  //   {
  //     uid: "-2",
  //     name: "image.png",
  //     status: "done",
  //     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //   },
  //   {
  //     uid: "-3",
  //     name: "image.png",
  //     status: "done",
  //     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //   },
  //   {
  //     uid: "-4",
  //     name: "image.png",
  //     status: "done",
  //     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //   },
  //   {
  //     uid: "-xxx",
  //     percent: 50,
  //     name: "image.png",
  //     status: "uploading",
  //     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  //   },
  //   {
  //     uid: "-5",
  //     name: "image.png",
  //     status: "error",
  //   },
  // ]);
  // const handlePreview = async (file) => {
  //   if (!file.url && !file.preview) {
  //     // file.preview = await getBase64(file.originFileObj);
  //   }
  //   setPreviewImage(file.url || file.preview);
  //   setPreviewOpen(true);
  // };
  // const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  // const uploadButton = (
  //   <button
  //     style={{
  //       border: 0,
  //       background: "none",
  //     }}
  //     type="button"
  //   >
  //     <PlusOutlined />
  //     <div
  //       style={{
  //         marginTop: 8,
  //       }}
  //     >
  //       Upload
  //     </div>
  //   </button>
  // );
  return (
    <div>AddStoriesSettings</div>
    // <div className="tyn-content tyn-content-page">
    //   <div className="tyn-main tyn-content-inner" id="tynMain">
    //     <div className="container">
    //       <div className="tyn-profile">
    //         <div className="tyn-profile-nav">
    //           <ul className="nav nav-tabs nav-tabs-line" role="tablist">
    //             <li className="nav-item" role="presentation">
    //               <button
    //                 className="nav-link active"
    //                 data-bs-toggle="tab"
    //                 data-bs-target="#profile-edit"
    //                 type="button"
    //                 aria-selected="true"
    //                 role="tab"
    //               >
    //                 Edit Profile
    //               </button>
    //             </li>
    //           </ul>
    //         </div>
    //         <div className="tyn-profile-details">
    //           <div className="tab-content">
    //             <div
    //               className="tab-pane show active"
    //               id="profile-edit"
    //               tabIndex="0"
    //               role="tabpanel"
    //             >
    //               <div className="row gy-5">
    //                 <div className="col-12">
    //                   <div className="row gy-4">
    //                     <div className="col-lg-3">
    //                       <h6>Personal Information</h6>
    //                       <div className="tyn-subtext">
    //                         Edit your personal info
    //                       </div>
    //                     </div>
    //                     <div className="col-lg-9">
    //                       <div className="row g-gs">
    //                         <div className="col-lg-12">
    //                           <div className="form-group">
    //                             <Upload
    //                               action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
    //                               listType="picture-card"
    //                               fileList={fileList}
    //                               onPreview={handlePreview}
    //                               onChange={handleChange}
    //                             >
    //                               {fileList.length >= 8 ? null : uploadButton}
    //                             </Upload>
    //                             {previewImage && (
    //                               <Image
    //                                 wrapperStyle={{
    //                                   display: "none",
    //                                 }}
    //                                 preview={{
    //                                   visible: previewOpen,
    //                                   onVisibleChange: (visible) =>
    //                                     setPreviewOpen(visible),
    //                                   afterOpenChange: (visible) =>
    //                                     !visible && setPreviewImage(""),
    //                                 }}
    //                                 src={previewImage}
    //                               />
    //                             )}
    //                           </div>
    //                         </div>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default AddStoriesSettings;
