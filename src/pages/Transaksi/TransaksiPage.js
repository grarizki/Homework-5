import React from "react";
import { Row, Col, Form, Button, Select, InputNumber, Input, Spin, Typography} from "antd";
import DataAlamat from "./DataAlamat";
import JenisTransaksi from "./DataJenisTransaksi";
import useCreateTransaction from "../../Mutations/useCreateTransaction";
import NavbarComponent from "../../assets/components/navbar/NavbarComponent";
import { useHistory } from "react-router-dom";
import "./TransaksiPage.css";
import { AiOutlineBorder } from "react-icons/ai";
 
const { Option } = Select;
const {Text} = Typography;
 
const TransaksiPage = () => {
  const [selectedProvinsi, setSelectedProvinsi] = React.useState(null);
  const [selectedKabupaten, setSelectedKabupaten] = React.useState(null);
  const [selectedKecamatan, setSelectedKecamatan] = React.useState(null);
  const history = useHistory();
  const [formState, setFormState] = React.useState({
    created_date: new Date().toString(),
    jenis_transaksi: "",
    provinsi_customer: " ",
    kabupaten_customer: " ",
    kecamatan_customer: " ",
    alamat_lengkap: " ",
    nominal_transaksi: "",
    status: "0",
  });
 
  const { mutate, isLoading, isError } = useCreateTransaction(formState, (result) => {
    console.log("success mutation >> ", result);
    history.replace("/home");
  });
 
  const currencyParser = (val) => {
    try {
      // for when the input gets clears
      if (typeof val === "string" && !val.length) {
        val = "0.0";
      }
 
      // detecting and parsing between comma and dot
      var group = new Intl.NumberFormat("id-ID").format(1111).replace(/1/g, "");
      var reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
      //  => 1232.21
 
      // removing everything except the digits and dot
      reversedVal = reversedVal.replace(/[^0-9.]/g, "");
      //  => 1232.21
 
      // appending digits properly
      const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length;
      const needsDigitsAppended = digitsAfterDecimalCount > 2;
 
      if (needsDigitsAppended) {
        reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2);
      }
 
      return Number.isNaN(reversedVal) ? 0 : reversedVal;
    } catch (error) {
      console.error(error);
    }
  };
 
  const handleSelectedProvinsi = (value) => {
    setSelectedProvinsi(value);
  };
 
  const handleSelectedKabupaten = (value) => {
    setSelectedKabupaten(value);
  };
 
  const handleSelectedKecamatan = (value) => {
    setSelectedKecamatan(value);
  };
 
  const handleFormProvinsi = (value) => {
    setFormState({ ...formState, provinsi_customer: value });
  };
  const handleFormKabupaten = (value) => {
    setFormState({ ...formState, kabupaten_customer: value });
  };
  const handleFormKecamatan = (value) => {
    setFormState({ ...formState, kecamatan_customer: value });
  };
 
  const dataKabupaten = React.useMemo(() => {
    return DataAlamat?.find((provinsi) => provinsi.name === selectedProvinsi)?.kabupaten || [];
  }, [selectedProvinsi]);
 
  const dataKecamatan = React.useMemo(() => {
    return dataKabupaten?.find((kabupaten) => kabupaten.name === selectedKabupaten)?.kecamatan || [];
  }, [selectedKabupaten, dataKabupaten]);
 
  return (
    <div>
      <NavbarComponent />
      <div className="formTransaksi" style={{ width: "100%" }}>
        <div style={{ width: "50%" }}>
          <Row style={{ width: "100%" }}>
            <Col span={24} style={{ paddingTop: "100px" }}>
              <Form style={{ width: "100%" }}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign="left"
                  label="Jenis Transaksi"
                  name="Jenis Transaksi"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Col>
                    <Select
                      placeholder="Pilih Jenis Transaksi"
                      onChange={(value) => {
                        setFormState({ ...formState, jenis_transaksi: value });
                      }}
                    >
                      {JenisTransaksi.map((option) => (
                        <Option key={option.key} value={option.value} disabled={option.isDisabled}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign="left"
                  label="Nominal Transaksi"
                  name="Nominal Transaksi"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Col>
                    <InputNumber
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(value)
                      }
                      parser={currencyParser}
                      onChange={(value) => {
                        console.log("value >> ", value);
                        setFormState({
                          ...formState,
                          nominal_transaksi: value,
                        });
                      }}
                    />
                  </Col>
                </Form.Item>
 
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 24 }}
                  labelAlign="left"
                  label="Alamat Saat Ini"
                  name="address"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Row justify="space-between" style={{ marginBottom: "10px" }}>
                    <Col span={7}>
                      <Select
                        placeholder="Pilih Provinsi"
                        onChange={(e) => {
                          handleSelectedProvinsi(e);
                          handleFormProvinsi(e);
                        }}
                      >
                        {DataAlamat.map((provinsi, index) => (
                          <Option key={index.toString()} value={provinsi.name}>
                            {provinsi.name}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                    <Col span={7}>
                      <Select
                        placeholder="Pilih Kabupaten"
                        onChange={(e) => {
                          handleSelectedKabupaten(e);
                          handleFormKabupaten(e);
                        }}
                      >
                        {dataKabupaten.map((kabupaten, index) => (
                          <Option key={index.toString()} value={kabupaten.name}>
                            {kabupaten.name}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                    <Col span={7}>
                      <Select
                        placeholder="Pilih Kecamatan"
                        onChange={(e) => {
                          handleSelectedKecamatan(e);
                          handleFormKecamatan(e);
                        }}
                      >
                        {dataKecamatan.map((kecamatan, index) => (
                          <Option key={index.toString()} value={kecamatan}>
                            {kecamatan}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                  </Row>
                  <Row>
                    <Input.TextArea
                      onChange={(event) => {
                        console.log("value >> ", event.target.value);
                        setFormState({
                          ...formState,
                          alamat_lengkap: event.target.value,
                        });
                      }}
                    />
                  </Row>
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Row justify="center">
            { isLoading ?(
              <Spin/>
            ) : isError ? (
              <div >
                <Row>
                  <Text style={{color:'red'}}> Gagal Memuat data</Text>
                </Row>
                <Row justify="space-around" align="middle">
                  <Button
                    type="primary"
                    className="searching-agent"
                    style={{
                      paddingRight: "15px",
                      marginTop: "50px",
                      backgroundColor:'#ff9800',
                      color:"white"
                    }}
                    onClick={mutate}
                  >
                    Coba Lagi
                  </Button>

                </Row>             
            </div>
            ) : (<Button
              type="primary"
              className="searching-agent"
              style={{
                paddingRight: "15px",
                marginTop: "50px",
              }}
              onClick={mutate}
            >
              Cari Agen
            </Button>)}

          </Row>
        </div>
      </div>
    </div>
  );
};
 
export default TransaksiPage;