import "./videopreview.css"
import { TiTick } from "react-icons/ti";



const Videopreview = ({setVideoPreview}) => {
  return (
    <div className="videopreview-container">
      <div className="videopreview-container-card">
        <div className="videopreview_container-card-header">
          <video src="/phonevideo.mp4" controls />
        </div>
        <div className="videopreview_container-card-title">
          <div className="videopreview_container-title-item">
            <TiTick color="green" size="25px" />
            <p>In Good Condition</p>
          </div>
          <div className="videopreview_container-title-item">
            <TiTick color="green" size="25px" />
            <p>Camera In Good Condition</p>
          </div>
          <div className="videopreview_container-title-item">
            <TiTick color="green" size="25px" />
            <p>Screen is Working</p>
          </div>
        </div>
        <div className="videopreview_footer">
          <p onClick={() => setVideoPreview(false)}>Close</p>
        </div>
      </div>
    </div>
  );
}

export default Videopreview