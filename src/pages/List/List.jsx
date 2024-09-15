import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [load, setLoad] = useState(false);

  const fetchList = async () => {
    setLoad(false);
    const res = await axios.get(`${url}/food/list`);
    // console.log(res.data);
    if (res.data.success) {
      setList(res.data.data);
      setLoad(true);
    } else {
      toast.error(Error);
    }
  };
  const removeFood = async (foodId) => {
    const res = await axios.post(`${url}/food/remove`, { id: foodId });
    await fetchList();
    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error("Error");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      {!load ? (
        <div className="verify">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="list add flex-col">
          <p>All Food List</p>
          <div className="list-table">
            <div className="list-table-format title">
              <b>#</b>
              <b>Image</b>
              <b>Name</b>
              <b>Category</b>
              <b>Price</b>
              <b>Action</b>
            </div>
            {list.map((item, index) => {
              return (
                <div key={index} className="list-table-format">
                  <p>{index + 1}</p>
                  <img src={`${url}/images/` + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>{item.price}</p>
                  <p className="cursor" onClick={() => removeFood(item._id)}>
                    X
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default List;
