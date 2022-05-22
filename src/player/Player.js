import React from 'react';

import './player.styles.css'
import {useState} from "react";
import {mute, playIcon} from "../images";

const Player = ({r}) => {

    function toggleVideo(){
        if(r.current.paused){
            r.current.play()
            return
        }

        r.current.pause()
    }

    function muteF(){
        r.current.volume = 0
        setVolume(0.0)
    }

    const [volume, setVolume] = useState(0.0)

    return (
        <div className="player">
            <div className="switch-key">
                <img onClick={() => toggleVideo()} className="play-button" src={playIcon} alt="" />
            </div>
            <input
                type="range"
                className="audio-volume"
                value={volume}
                onChange={(e => {
                    setVolume(Number(e.target.value))

                    r.current.volume = volume / 100
                })}
                min={0.0}
                max={100.0}
                step={0.1} />
            <img onClick={() => muteF()} src={mute} className="mute-button" alt=""/>
        </div>
    );
};

export default Player;