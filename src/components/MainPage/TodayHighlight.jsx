import React from 'react'
import SunRiseSunSetChart from '../charts/SunRiseSunSetChart'
import UVIndexChart from '../charts/UVIndexChart';
import WindStatusChart from '../charts/WindStatusChart'
import '../../pages/MainPage.css'
export default function TodayHighlight({ currentData, heading1, heading2, description, value1, value2 }) {
    var backgroundLeftMargin = heading1 === 'Wind Status'?'calc(165vw * 3.5 / 10 - 372.95px / 2)':heading1 === 'UV Index'?'calc(215vw * 3.5 / 10 - 372.95px / 2)':'calc(265vw * 3.5 / 10 - 372.95px / 2)'
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ backgroundColor: 'rgb(40,42,43)', padding:'10px',borderRadius:'20px', height:'300px'}}>
                <p>{heading1}</p>
                <div style={{ height: '100px' }}>
                    {heading1 === 'Wind Status'? (
                    // <WindStatusChart windSpeed={currentData.windspeed} windGust={currentData.windgust} />
                    <WindStatusChart windDirection={currentData.winddir} />
                    )
                    : heading1 === 'UV Index'?(
                        <UVIndexChart uvIndex={currentData.uvindex} />
                    ):(
                        <SunRiseSunSetChart SunRiseTime={currentData.sunrise} SunSetTime={currentData.sunset}/>
                    )
                    }
                </div>
                <h1 style={{fontSize:'30px', textAlign:'center'}}>{value2}</h1>
                <div className='background3' style={{left:backgroundLeftMargin}}></div>
            </div>
            
            <div style={{ backgroundColor: 'rgb(40,42,43)', padding:'7px 7px 0 7px', height: "20%", borderRadius:'10px' }}>
                <p style={{marginTop:'-5px', color:'rgb(230, 226, 226)'}}>{heading2}</p>
                <h2 style={{marginTop:'-5px'}}>{value1}</h2>
                <h4 style={{width:'120px', marginLeft:'95px', fontWeight:'lighter', position:'absolute', marginTop:'-70px'}}>{description}</h4>
            </div>
        </div>
    )
}
