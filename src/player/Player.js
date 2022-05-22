import React from 'react';

import './player.styles.css'
import {useState} from "react";
import {mute, playIcon,pauseIcon, unMute} from "../images";

const Player = ({r}) => {

    function toggleVideo(){
        setIsPlaying((p) => !p)
        if(r.current.paused){
            r.current.play()
            return
        }

        r.current.pause()
    }


    function toggleVolume(){
        if(isMuted){
            r.current.volume = onMuteVolume
            setVolume(onMuteVolume)
        }else {
            setOnMuteVolume(volume)
            r.current.volume = 0
            setVolume(0)
        }
        setIsMuted((p) => !p)
    }

    const [volume, setVolume] = useState(0.5)
    const [isMuted, setIsMuted] = useState(false)
    const [isPlaying, setIsPlaying] = useState(true)
    const [onMuteVolume, setOnMuteVolume] = useState(0.0)

    return (
        <div className="player">
            <div className="switch-key" onClick={() => toggleVideo()}>
                {isPlaying ?
                    <img  className="play-button" src={playIcon} alt="" /> :
                    <img src={pauseIcon} className='pause-button' alt=""/>
                }
            </div>
            <input
                type="range"
                className="audio-volume"
                value={volume}
                onChange={(e => {
                    setVolume(Number(e.target.value))
                    r.current.volume = volume
                })}
                min={0.0}
                max={1}
                step={0.01} />
            {isMuted ?
                <img onClick={() => toggleVolume()} src={mute} className="mute-button" alt=""/> :
                <img onClick={() => toggleVolume()} className='mute-button' src={unMute} alt=""/>
            }
        </div>
    );
};

export default Player;