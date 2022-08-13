import React, { useCallback, useEffect, useState } from "react";
import AddBook from "./AddBook";
import { Table, Button, Popconfirm, message } from "antd";
import { useRecoilState } from "recoil";
import { productState } from "../../store/login";
import EditCustomer from "./EditCustomer";
import { comicsAPI } from "../../api/axiosClient";
import { comics } from "../../api/tmdbApi";

import { access_token } from "../../store/login";

function Products(props) {
  const [items, setItems] = useRecoilState(productState);
  const [product, setProduct] = useState();
  const [toggleAdd, setToggleAdd] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [page, setPage] = useState(1);

  const [accessToken, setAccessToken] = useRecoilState(access_token);
  const [keyword, setKeyword] = useState("");
  console.log(keyword);
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const getProducts = async () => {
    let response = await comics.getAllUser();
    console.log(response.data.data);
    setItems(response.data.data[0]);
  };
  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = (text, record) => {
    // const deleteUser = async () => {
    //   try {
    //     const response = await comics.deleteUser(record.username, config);
    //     console.log(response);
    //     getProducts();
    //   } catch (e) {
    //     console.log("saiiiiiiiiiiii");
    //   }
    // };
    // deleteUser();
  };

  const confirm = (text, record) => {
    handleDelete(text, record);
    message.success("Xóa thành công");
  };

  const confirmChange = (text, record) => {
    handleChangeRole(text, record);
    message.success("Thành công");
  };

  const confirmStatus = (text, record) => {
    if (record.status === 0) {
      handleBanUser(text, record);
    } else {
      handleUnBanUser(text, record);
    }

    message.success("Thành công");
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Hủy xóa");
  };

  const handleEdit = (text, record) => {
    setToggleEdit(true);
    setProduct(record);
  };

  const handleToggleAdd = () => {
    setToggleAdd(!toggleAdd);
  };

  const handleBanUser = (text, record) => {
    const banUser = async () => {
      try {
        const response = await comics.banUser(record.username, config);

        getProducts();
      } catch (e) {
        console.log("saiiiiiiiiiiii");
      }
    };

    banUser();
  };

  const handleChangeRole = (text, record) => {
    const changeRole = async () => {
      try {
        await comics.changeRole(record.username, { role: 1 }, config);
        getProducts();
      } catch {
        console.log("Changeeeeeeeeee error");
      }
    };
    changeRole();
  };

  const handleUnBanUser = (text, record) => {
    const unBanUser = async () => {
      try {
        const response = await comics.unBanUser(record.username, config);

        getProducts();
      } catch (e) {
        console.log("saiiiiiiiiiiii");
      }
    };

    unBanUser();
  };

  const columns = [
    {
      title: "username",
      dataIndex: "username",
      key: "username",
      render: (text) => <h3 style={{ color: "blue" }}>{text}</h3>,
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => <img src={text} width="100" alt="" />,
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <>
          {text === 0 ? (
            <h3 style={{ color: "LightGreen" }}>Kích hoạt</h3>
          ) : (
            <h3 style={{ color: "red" }}>Bị khóa</h3>
          )}
        </>
      ),
    },
    {
      title: "User Status",
      key: "userstatus",
      fixed: "right",
      width: 100,
      render: (text, record) =>
        record.status === 0 ? (
          <Popconfirm
            title="Bạn có chắc chắn xóa không?"
            onConfirm={() => confirmStatus(text, record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Ban</Button>
          </Popconfirm>
        ) : (
          <Popconfirm
            title="Bạn có chắc chắn xóa không?"
            onConfirm={() => confirmStatus(text, record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" className="yellow">
              Unban
            </Button>
          </Popconfirm>
        ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => (
        <p>
          {text === 0 ? (
            <p style={{ color: "green" }}>Khách hàng</p>
          ) : (
            <h3 style={{ color: "red" }}>Quản lý</h3>
          )}
        </p>
      ),
    },
    {
      title: "Role Status",
      key: "edit",
      fixed: "right",
      width: 100,
      render: (text, record) =>
        record.role === 0 ? (
          <Popconfirm
            title="Bạn có chắc chắn xóa không?"
            onConfirm={() => confirmChange(text, record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="ghost">Change</Button>
          </Popconfirm>
        ) : (
          ""
        ),
    },

    {
      title: "Delete",
      key: "delete",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <Popconfirm
          title="Bạn có chắc chắn xóa không?"
          onConfirm={() => confirm(text, record)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger">
            <i class="fa-solid fa-trash-can"></i>
          </Button>
        </Popconfirm>
      ),
    },
    {
      title: "Edit",
      key: "edit",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <Button type="primary" onClick={() => handleEdit(text, record)}>
          <i class="fa-solid fa-pen-to-square"></i>
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h3 class="title">Book</h3>

      <Table
        columns={columns}
        dataSource={items.map((product) => {
          return product;
        })}
      ></Table>

      <Button type="primary" className="mb-10" onClick={handleToggleAdd}>
        Thêm sản phẩm
      </Button>
      {toggleAdd === true && (
        <AddBook products={items} setProducts={items}></AddBook>
      )}
      {toggleEdit === true && (
        <EditCustomer
          products={items}
          setProducts={product}
          product={product}
          getProducts={getProducts}
          setToggleEdit={setToggleEdit}
        ></EditCustomer>
      )}
    </div>
  );
}

export default Products;
