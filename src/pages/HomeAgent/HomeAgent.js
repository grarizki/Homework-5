import React, { useCallback } from "react"
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Card,
  Typography,
  Spin,
  Space,
  Alert,
} from "antd"
import moment from "moment"

import NavbarComponent from "../../components/navbarCustomer/NavbarComponent"
import { useAuthorizedContext } from "../../AuthorizedContext"
import useGetTransaction from "../../Query/useGetTransaction"
import useDeleteTransaction from "../../Mutations/useDeleteTransaction"
import "./HomeAgent.sass"

const { Title, Text } = Typography

const CardTransactionComponent = (props) => {
  const { mutate: deleteTransaction } = useDeleteTransaction(
    props.transaction.id,
    props.refetchTransactions
  )

  const handleCancelTransaction = useCallback(() => {
    // console.log("id transaction >> ", props.transaction.id);
    deleteTransaction()
  }, [props.transaction.id, deleteTransaction])

  //   const handleAcceptTransaction = useCallback(() => {
  //     AcceptTransaction()
  //   }, [props.transaction.id, acceptTransaction])

  return (
    <Card title=" ">
      <Form style={{ marginLeft: "10%" }}>
        <Row>
          <Col style={{ width: "35%" }}>
            <Text>Waktu Request </Text>
          </Col>
          <Col offset={0} style={{ width: "65%" }}>
            <Text>
              {" "}
              :{" "}
              {moment(new Date(props.transaction.created_date)).format(
                "DD MMMM YYYY, hh:mm A"
              )}
            </Text>
          </Col>
        </Row>
        <Row>
          <Col style={{ width: "35%" }}>
            <Text>Jenis Transaksi</Text>
          </Col>
          <Col style={{ width: "65%" }}>
            <Text>: {props.transaction.jenis_transaksi} </Text>
          </Col>
        </Row>

        <Row>
          <Col style={{ width: "35%" }}>
            <Text>Nominal Transaksi</Text>
          </Col>
          <Col style={{ width: "65%" }}>
            <Text> : Rp{props.transaction.nominal_transaksi} </Text>
          </Col>
        </Row>

        <Row>
          <Col style={{ width: "35%" }}>
            <Text>Alamat Agen</Text>
          </Col>
          <Col style={{ width: "65%" }}>
            <Text> : {props.transaction.alamat_lengkap} </Text>
          </Col>
        </Row>

        <Row>
          <Col style={{ width: "35%" }}>
            <Text>Status</Text>
          </Col>
          <Col style={{ width: "65%" }}>
            <Text>
              :{" "}
              {props.transaction.status === "0"
                ? "Menunggu konfirmasi Anda"
                : props.transaction.status === "1"
                ? "Dalam perjalanan"
                : props.transaction.status === "2"
                ? "Dibatalkan"
                : props.transaction.status === "3"
                ? "Selesai"
                : "Error"}
            </Text>
          </Col>
        </Row>

        <div className="float-right">
          <Row>
            <Space direction="horizontal" size="middle">
              <Button
                type="primary"
                style={{
                  margin: "0px",
                  paddingRight: "15px",
                  backgroundColor: "#F03D3E",
                  fontWeight: "bold",
                  borderRadius: "10px",
                }}
                onClick={handleCancelTransaction}
              >
                Tolak
              </Button>
              <Button
                type="primary"
                style={{
                  margin: "0px",
                  paddingRight: "15px",
                  backgroundColor: "#4fc314",
                  fontWeight: "bold",
                  borderRadius: "10px",
                }}
                onClick={handleCancelTransaction}
              >
                Terima
              </Button>
            </Space>
          </Row>
        </div>
      </Form>
    </Card>
  )
}

function Home() {
  const { isLoggedIn, userLevel } = useAuthorizedContext()
  console.log("value >> ", isLoggedIn, userLevel)
  const {
    data,
    isError,
    isLoading,
    refetch: refetchTransactions,
  } = useGetTransaction()
  console.log("data >> ", isLoading, data)
  return (
    <div className="outer-home">
      <NavbarComponent />
      <div className="statusTransaksi">
        <div className="title">
          <Title>Transaksi Saat Ini:</Title>
        </div>
        <div className="resume">
          <Space direction="vertical">
            {isLoading ? (
              <Spin tip="Loading..."></Spin>
            ) : data ? (
              data.map((transaction) => (
                <CardTransactionComponent
                  key={transaction.id}
                  transaction={transaction}
                  refetchTransactions={refetchTransactions}
                />
              ))
            ) : (
              <Alert message="Gagal Memuat Data" type="error" />
            )}
          </Space>
        </div>
      </div>
    </div>
  )
}

export default Home
