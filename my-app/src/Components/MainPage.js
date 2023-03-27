import { useEffect, useState } from "react"
import axios from "axios"
import "./Main.css"
function MainPage() {
    const [manufacturers, setManufacturers] = useState([])
    const [selectmanu, setSelectmanu] = useState(null)
    const [selectcartype, setCartype] = useState(null)

    useEffect(() => {
        axios.get(" https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json")
            .then(res => {
                setManufacturers(res.data.Results)
                console.log(manufacturers)

            })
            .catch(e => {
                console.log(e)
            })
    },[])
function handleclick(manufacturers){
    setSelectmanu(manufacturers)
}

function model(){
    setSelectmanu(null)
}
function cartypee(e){
    selectcartype(e.target.value)
    console.log()
}
const filtermanu=selectcartype?manufacturers.filter(manufacturer=>manufacturer.VehicleTypes.includes(selectcartype))
:manufacturers;


    return (
        <div className="Main">


            <h1>VEHICLE MANUFACTURERS</h1>
            <div>
                {selectcartype}
                <label>Search</label>
                <input type="Search"></input>
                <label>Filter Vehicle Type</label>
                <select value={selectcartype} onChange={cartypee}>
                    <option value="">All</option>
                    <option value="Car">Car</option>
                    <option value="Truck">Truck</option>
                    <option value="SUV">SUV</option>
                    <option value="VAN">VAN</option>
                    <option value="Motorcycle">Motorcycle</option>
                </select>
            </div>
            <table>
                <thead>
                    <th>Name</th>
                    <th>Country</th>
                    <th className="th3">Type</th>
                </thead>
                <tbody>
                    {filtermanu.map(manufacturer => (
                        
                        <tr key={manufacturer.Mfr_ID} onClick={()=>handleclick(manufacturer)}>
                            
                            <td>{manufacturer.Mfr_CommonName}</td>
                            <td>{manufacturer.Country}</td>
                            {
                               manufacturer.VehicleTypes.map(vehicle=>(

                                    <td key={vehicle.IsPrimary}>{vehicle.Name}</td>
                                    )

                                )
                            }
                            
                        </tr>
                    ))}

                </tbody>
            </table>
            { selectmanu &&
                (
                    <div className="popup">
                        <div>
                            <h2>{selectmanu.Mfr_Name}</h2>
                            <p>{selectmanu.Mfr_Name}</p>
                            <p>{selectmanu.Country}</p>
                            <button onClick={model}>Close</button>
                        </div>


                    </div>
                )}
        </div>
    );
}

export default MainPage;
