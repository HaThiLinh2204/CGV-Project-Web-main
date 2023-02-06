import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
function Payment() {
    const { state } = useLocation()
    const navigate = useNavigate()

    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const interval = setInterval(() => {
        fetch("http://localhost:3001/movie/middleServer")
            .then((res) => res.json())
            .then((res) => {
                res.data.map(item => {
                    if (item.amount === parseInt(state.price) && item.comment === result) {
                        alert("Thanh toan thanh cong")
                        clearInterval(interval);
                        //send data to server
                        fetch("http://localhost:3001/movie/updateStatus", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                Positionss: state

                            }),
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                if (data.status === "success") {
                                    console.log("Đặt chỗ thành công");
                                    navigate("/")
                                }
                            })

                    }
                })
                console.log("Chưa thanh toán");
                console.log(res.data)
            })
    }, 30000);





    return (
        <div>
            <h1>Payment</h1>
            <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/328727894_742708940368848_631640144157803427_n.jpg?stp=dst-jpg_s206x206&_nc_cat=102&ccb=1-7&_nc_sid=aee45a&_nc_ohc=R6pVRNrKbjYAX8TYSgJ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdS340JlgvSrk9xvUSHqRNF4m13U3Rr6GfjviNkb5FQCpA&oe=6400E499" />
            <h2>{state.price}</h2>
            <h3>Noi dung: {result}</h3>

        </div>
    )
}

export default Payment