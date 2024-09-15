import React from "react";
import "./Order.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
const Order = ({ url }) => {
  const [orders, setOrder] = useState([]);
  const fetchAllOrders = async () => {
    const res = await axios.get(url + "/order/list");
    if (res.data.success) {
      setOrder(res.data.data);
      // console.log(res.data.data);
    } else {
      toast.error(res.data.message);
    }
  };
  const statusHandler = async (e, orderId) => {
    const res = await axios.post(url + "/order/status", {
      orderId,
      status: e.target.value,
    });
    if(res.data.success){
      await fetchAllOrders()
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((e, i) => (
          <div className="order-item" key={i}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {e.items.map((item, i) => {
                  if (i === e.items.length - 1) {
                    return item.name + " x" + item.quantity;
                  } else {
                    return item.name + " x" + item.quantity + ",";
                  }
                })}
              </p>
              <p className="order-item-name">
                {e.address.firstName + " " + e.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{e.address.street + ", "} </p>{" "}
                <p>
                  {e.address.city +
                    ", " +
                    e.address.state +
                    ", " +
                    e.address.city +
                    ", " +
                    e.address.zipcode}
                </p>
              </div>
              <p className="order-item-phobne">{e.address.phone}</p>
            </div>
            <p>Items: {e.items.length}</p>
            <p>${e.amount}</p>
            <select
              onChange={(event) => {
                statusHandler(event, e._id);
              }}
              value={e.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
