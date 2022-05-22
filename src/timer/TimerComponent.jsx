import React, {useEffect, useState} from 'react';

import './timer.styles.css'

import {useTimer} from "../hooks/useTimer";

const TimerComponent = () => {

    const Timer = useTimer()
    const [isActive, setIsActive] = useState(Timer.getFromLocalStorage() !== null) // if null -> no timer -> not active
    const defaultTimer= Timer.getFromLocalStorage()
    const defaultValue = defaultTimer ? Timer.stringifyTimer(defaultTimer) : null
    const [time, setTime] = useState(defaultValue) // str timer, by default hooks from localStorage
    const [restTime, setRestTime] = useState(60 - Timer.getDefaultTime())

    useEffect(() => {
        if(!isActive) return

        const t = setTimeout(() => {
            const normalTimer = Timer.parseToTimer(time) // normal timer(starting timer)

            const subtractedTimer = Timer.subtractSecond(normalTimer) // normal timer(-1sec)
            if(!subtractedTimer) {
                stopTimer()
                return
            }

            const newStrTimer = Timer.stringifyTimer(subtractedTimer) // str timer(new str timer from subtracted)
            setTime(newStrTimer)

            Timer.saveToLocalStorage(Timer.parseToTimer(newStrTimer))
        }, 1000)


        return () => clearTimeout(t)
    },[time,isActive])

    function showDialogWindow(){
        const min = Number(prompt("Установите время для сессии"))
        if(Number.isNaN(min)) {
            alert("Некоректный формат времени!")
            return
        }
        if(min >= 60 || min < 15) {
            alert("Минимальное время сессии - 15 минут, максимальное - 60!")
            return
        }

        const t = Timer.makeTimer(min)
        const st = Timer.stringifyTimer(t)
        setTime(st)
        setRestTime(60-min)
        Timer.setSessionTime(min)
        setIsActive(true)
    }

    function stopTimer(){
        alert(`Вы закончили сессию, поздравляем! Отдыхайте ${restTime} минут`)
        setTime(null)
        setIsActive(false)
        Timer.clearTimer()
    } // stops automaticly

    function nativelyStopTimer(){
        const stop = window.confirm("Хотите прервать сессию?")
        if(stop) {
            setIsActive(false)
            setTime(null)
            Timer.clearTimer()
        }
    } // user stops

    return (
        <div className='timer'>
            {
                !isActive ?
                <p className='timer_prompt'
                   onClick={() => showDialogWindow()}>Установить таймер</p> :

                <p onClick={() => nativelyStopTimer()} className='timer_prompt time'>{time}</p>
            }
        </div>
    );
};

export default TimerComponent;