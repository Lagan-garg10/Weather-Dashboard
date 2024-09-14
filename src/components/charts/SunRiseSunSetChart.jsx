import React, { useEffect } from 'react';
import './charts.css';

export default function SunRiseSunSetChart({ SunRiseTime, SunSetTime }) {
    const currentTimeDate = new Date();

    function updateSunPosition(sunrise, sunset, currentTime) {
        const sun = document.getElementById('sun');
        const arc = document.querySelector('.arc');
        const arcWidth = arc.offsetWidth;

        const sunriseTime = new Date(`1970-01-01T${sunrise}:00`);
        const sunsetTime = new Date(`1970-01-01T${sunset}:00`);
        const currentTimeValue = new Date(`1970-01-01T${currentTime}:00`);

        const totalMinutes = (sunsetTime - sunriseTime) / 60000;
        const elapsedMinutes = (currentTimeValue - sunriseTime) / 60000;

        const positionPercentage = Math.min(Math.max(elapsedMinutes / totalMinutes, 0), 1);
        const sunPosition = positionPercentage * arcWidth;

        sun.style.left = `${sunPosition - 10}px`; // Adjust by half the sun's width to center

        // Update the gradient background to reflect the completed part
        arc.style.background = `linear-gradient(
            to right,
            rgba(255, 170, 0, 0.2) 0%,
            rgba(255, 170, 0, 0.2) ${positionPercentage * 100}%,
            transparent ${positionPercentage * 100}%,
            transparent 100%
        )`;
    }

    useEffect(() => {
        if (SunRiseTime) {
            const sunRiseTimeMinHourArray = SunRiseTime.split(':');
            const sunSetTimeMinHourArray = SunSetTime.split(':');
            const sunRiseTimeMinHour = `${sunRiseTimeMinHourArray[0]}:${sunRiseTimeMinHourArray[1]}`;
            const sunSetTimeMinHour = `${sunSetTimeMinHourArray[0]}:${sunSetTimeMinHourArray[1]}`;
            updateSunPosition(sunRiseTimeMinHour, sunSetTimeMinHour, `${currentTimeDate.getHours()}:${currentTimeDate.getMinutes()}`);
        }
    }, [SunRiseTime, SunSetTime]);

    return (
        <div className='sun-chart-container'>
            <div className="sun-chart">
                <div className="arc">
                    <div className="sun" id="sun"></div>
                </div>
                <div className="time-labels">
                    <div className="sunrise">
                        <img src="https://cdn-icons-png.flaticon.com/256/7780/7780233.png" alt="Sunrise Icon" />
                        <p>sunrise</p>
                        <div className="time">{SunRiseTime}</div>
                    </div>
                    <div className="sunset">
                        <img src="https://cdn-icons-png.flaticon.com/512/362/362409.png" alt="Sunset Icon" />
                        <p>sunset</p>
                        <div className="time">{SunSetTime}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
