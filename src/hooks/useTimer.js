import {Timer} from "../timer/Timer";

const TIMER_KEY = 'timer'
export function useTimer () {


    function subtractSecond(timer){

        const {min,sec} = timer
        console.log(min,sec)
        if(sec === 0 && min > 0){
            timer.sec = 59
            timer.min = timer.min - 1
            return timer
        }else if (sec > 0 && min > 0){
            timer.sec = timer.sec - 1
            return timer
        }else {
            return null
        }

    }

    function makeTimer(min){
        return new Timer(min,0)
    }

    function parseToTimer(strTimer){
        const splitted = strTimer.split(":")
        return new Timer(Number(splitted[0]), Number(splitted[1]))
    }

    function stringifyTimer(timer){

        const {min,sec} = timer
        return `${min}:${sec > 9 ? "" : "0"}${sec}`
    }

    function saveToLocalStorage(timer){
        localStorage.setItem(TIMER_KEY, JSON.stringify(timer))
    }

    function setDefault(){

    }

    function getFromLocalStorage(){
        const t = JSON.parse(localStorage.getItem(TIMER_KEY))

        return t
    }

    function clearTimer(){
        localStorage.removeItem(TIMER_KEY)
    }

    return {clearTimer,subtractSecond,makeTimer,stringifyTimer,getFromLocalStorage,saveToLocalStorage, parseToTimer}

}