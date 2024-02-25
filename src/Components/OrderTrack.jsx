import React, { useEffect, useState } from 'react';

const OrderTracking = ({ orderStatus, orderDetails }) => {

  console.log(orderStatus, "orderStatus")

  switch (orderStatus) {
    case "PENDING":
      orderStatus = "ORDERED"
      break
    case "READYTOSHIP":
      orderStatus = "SHIPPED"
      break
  }



  useEffect(() => {
    setTracker(
      orderStatus === "CANCELLED"
        ? ["ORDERED", "CANCELLED"] : orderStatus === "RAISEDAREQUEST" ? ["ORDERED", "DELIVERED", "RAISEDAREQUEST"]
          : orderStatus === "REFUNDED" ? ["ORDERED", "ONPROGESS", "REFUNDED"] : ["ORDERED", "PACKED", "SHIPPED", "ONTHEWAY", "DELIVERED"]
    )
  }, [orderStatus])

  const [tracker, setTracker] = useState(
    orderStatus === "CANCELLED"
      ? ["ORDERED", "CANCELLED"] : orderStatus === "RAISEDAREQUEST" ? ["ORDERED", "DELIVERED", "RAISEDAREQUEST"]
        : orderStatus === "REFUNDED" ? ["ORDERED", "ONPROGESS", "REFUNDED"] : ["ORDERED", "PACKED", "SHIPPED", "ONTHEWAY", "DELIVERED"]
  );
  console.log(orderStatus, "orderStatus", tracker)

  const [idx, setIdx] = useState(0)
  let idex = 0
  tracker.map((ele, index) => {
    if (ele == orderStatus) {
      idex = index
    }
  })

  console.log(tracker.map((ele, index) => {
    if (ele == orderStatus) {
      idex = index
    }
  }), "indexx", idex)


  return (
    <div className="container">

      <div className={`flex flex-md-row flex-col ${orderStatus === "CANCELLED" || orderStatus === "RAISEDAREQUEST" || orderStatus === "REFUNDED" ? "justify-md-center  items-center" : "justify-md-between justify-center items-center"} `}>
        {tracker.map((status, index) => (
          <div
            key={index}
            className={`order-tracking ${index <= idex && status !== 'CANCELLED' ? 'completed' : status === 'CANCELLED' ? 'cancelled' : ''}`}
          >
            <span className="is-complete"></span>
            <p className=''>
              {status}
              {(orderStatus != "PENDING" || orderStatus != "CANCELLED" || orderStatus != "DELIVERED" || orderStatus != "RAISEDAREQUEST") && idex == index ?
                <>
                  {/* <div className=''>
                    {orderDetails?.created_date}
                  </div> */}
                </> : ""
              }
              <br />
              <span></span>
            </p>
            {/* {index === 0 &&
                  <>
                    <div>
                      {orderDetails?.created_date}
                    </div>
                  </>
                } */}
          </div>
        ))}


      </div>
      <style>
        {`
          .order-tracking {
            text-align: center;
            width: 20%;
            position: relative;
            display: block;
          }
          .order-tracking .is-complete {
            display: block;
            position: relative;
            border-radius: 50%;
            height: 30px;
            width: 30px;
            border: 0px solid #AFAFAF;
            background-color: #f7be16;
            margin: 0 auto;
            transition: background 0.25s linear;
            -webkit-transition: background 0.25s linear;
            z-index: 2;
          }
          .order-tracking .is-complete:after {
            display: block;
            position: absolute;
            content: '';
            height: 14px;
            width: 7px;
            top: -2px;
            bottom: 0;
            left: 5px;
            margin: auto 0;
            border: 0px solid #AFAFAF;
            border-width: 0px 2px 2px 0;
            transform: rotate(45deg);
            opacity: 0;
          }
          .order-tracking.completed .is-complete {
            border-color: #27aa80;
            border-width: 0px;
            background-color: #27aa80;
          }
          .order-tracking.completed .is-complete:after {
            border-color: #fff;
            border-width: 0px 3px 3px 0;
            width: 7px;
            left: 11px;
            opacity: 1;
          }
          .order-tracking.cancelled .is-complete {
            border-color: red; 
            border-width: 0px;
            background-color: red; 
            }

            .order-tracking.cancelled .is-complete:after {
            border-color: #fff;
            border-width: 0px 3px 3px 0;
            width: 7px;
            left: 11px;
            opacity: 1;
            }
          .order-tracking p {
            color: #A4A4A4;
            font-size: 16px;
            margin-top: 8px;
            margin-bottom: 0;
            line-height: 20px;
          }
          .order-tracking p span { font-size: 14px; }
          .order-tracking.completed p { color: #000; }
          .order-tracking::before {
            content: '';
            display: block;
            height: 3px;
            width: calc(100% - 40px);
            background-color: #f7be16;
            top: 13px;
            position: absolute;
            left: calc(-50% + 20px);
            z-index: 0;
          }
          .order-tracking:first-child:before { display: none; }
          .order-tracking.completed:before { background-color: #27aa80; }
        
          @media (max-width: 600px) {
      .order-tracking::before {
        height: 0px;
      }
    }
        
        `}
      </style>
    </div>
  );
};

export default OrderTracking;
