import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";


function Ticket() {
    //receive state from movies page and console.log
    const { state } = useLocation();

    const checked = (e) => {
        //set not allow click on booked seat
        if (e.target.classList.contains("seat-booked")) {
            return;
        }
        const element = e.target;
        //add color red for element
        element.classList.toggle("checked");
        //get the price of each clicked element
        const prices = document.getElementsByClassName("checked");
        //if there is more than one element, add the price of each element
        let total = 0;
        for (let i = 0; i < prices.length; i++) {
            total += parseInt(prices[i].getAttribute("price"));
        }
        //show the total price
        document.getElementById("total").innerHTML = total;
    };

    const navigate = useNavigate();
    const Next = () => {
        //navigate to payment page and send position checked
        const positions = document.querySelectorAll(".checked");
        //get value of each position checked
        let position = [];
        for (let i = 0; i < positions.length; i++) {
            position.push(positions[i].innerHTML);
        }

        navigate("/payment", {
            state: {
                position: position,
                cinema: state.cinema,
                site: state.site,
                day: state.day,
                time: state.time,
                location: state.location,
                type: state.type,
                price: document.getElementById("total").innerHTML,
            },
        });
    }





    return (
        <div className="booking-progress">
            <div className="page-title">
                <h1>Booking online</h1>
            </div>
            <div className="top-content">
                <ul>
                    <li className="cinema-name">
                        <span className="label">{state.cinema}</span>
                    </li>
                    <li>
                        <span className="label">{state.site}</span>
                    </li>
                    <li>
                        <span className="label">{state.day}</span>
                    </li>
                </ul>
            </div>
            <div className="bottom-content">
                Người/ghế
            </div>

            {state.position.map((item, index) => {
                return (
                    <div className={`${item.status === "0" ? "seat" : "seat-booked"}`} key={index} onClick={checked} price={item.price}>
                        {item.position}
                    </div>
                )
            })}
            <div id="total">
            </div>

            <div onClick={Next}>Next</div>
        </div >
    )
}

export default Ticket