import { muteunmute, setVolume, getVolume } from "../main";

function SoundControl() {
    return (
      <div className="soundcontrol">
        <button className="icnbtns" id="sound" onClick={muteunmute}>
          <i className="material-icons">volume_up</i>
        </button>
        <input
          type="range"
          className="volumeslider"
          aria-label="Music volume"
          min="0"
          max="1"
          step="0.05"
          defaultValue={getVolume()}
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>
    );
}

export default SoundControl;
