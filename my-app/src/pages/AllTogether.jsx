import React from 'react'
import PeopleTogether from '../components/peopleComponent/PeopleTogether'
import PlanetTogether from '../components/planetComponent/PlanetTogether'
import VehicleTogether from '../components/vehicleComponent/VehicleTogether'

export default function AllTogether() {
    return (
        <div>
            <PeopleTogether />
            <PlanetTogether />
            <VehicleTogether />
        </div>
    )
}
