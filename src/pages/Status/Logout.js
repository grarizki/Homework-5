import React from 'react';
import { Modal, Button } from 'antd'
import Cookies from "universal-cookie";

import NavbarComponent from "../../assets/components/navbar/NavbarComponent"
import '../Status/logout.css'

const cookies = new Cookies();


function Logout() {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleClickButtonLogout = React.useCallback(() => {
    cookies.remove("accessToken");
  }, []);


  const handleOk = () => {
    setConfirmLoading(true);
    handleClickButtonLogout();
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <>
      <NavbarComponent />
      <div style={{display:'flex', justifyContent:"center", marginTop: '15%'}}>
      <Button type="primary" onClick={showModal}>
        Keluar
      </Button>
      <Modal
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>anda yakin keluar dari transaksi</p>
      </Modal>
      </div>

    </>
  );

}

export default Logout;