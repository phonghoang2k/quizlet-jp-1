import React, { useEffect, useState } from 'react';
import HeaderPage from '../components/layouts/Header'
import { Redirect } from 'react-router-dom';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import AccessRolePopup from "../components/layouts/AccessRolePopup";
import { editModule } from '../redux/actions/moduleAction';
import { useToasts } from "react-toast-notifications";
import { AiOutlinePlus } from 'react-icons/ai';

const TermCreate = ({ moduleId, user, addModule, showAddCourse, closeCoursePopup, handleAddd, currentModule, editModule }: any) => {

    const [showModal, setShowModal] = useState(false);
    const [validated, setValidated] = useState(false);
    const [publicc, setPublicc] = useState();
    const [name, setName] = useState();
    const [formData, setFormData] = useState({ title: "", publicc: 1 });
    const { addToast } = useToasts();

    const handleMax = (max: any) => {
        setShowModal(false);
    }
    const [data, setData] = useState([{
        term: "",
        mean: "",
    }])

    // const handleChange = (e) => {
    //     setName(e.target.value);
    // }

    const closePopup = () => {
        setShowModal(false);
    };
    const openPopup = () => {
        setShowModal(true);
    };

    const handleSubmit = (e: any) => {
        console.log("is oke")
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            console.log("validatefalse");
        }
        else {
            e.preventDefault();
            const data = {
                name,
                publicc,
            };

            console.log(data);

            editModule(user.token, addToast, currentModule.id, data);
        }

        setValidated(true);
    }

    const addNewTermCard = (num: number) => {
        return (
            <>
                <Col>
                    <div className="login-form-container">
                        <Form
                            id="thatform"
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Thuật ngữ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập tiêu đề..."
                                        value={data[num].term}
                                        name={`term${num}`}
                                        className="login-form"
                                        required
                                        style={{ borderBottomColor: "black" }}
                                        onChange={(e) => {

                                            var newData = [...data, {
                                                term: `term${num}`,
                                                mean: e.target.value
                                            }]
                                            console.log(e.target);
                                            // console.log(newData)
                                            setData(newData)
                                        }}
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Bạn phải nhập thuật ngữ.
          </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Định nghĩa</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập tiêu đề..."
                                        value={data[num].mean}
                                        name={`mean${num}`}
                                        className="login-form"
                                        required
                                        style={{ borderBottomColor: "black" }}
                                        onChange={(e) => {
                                            var newData = [...data, {
                                                term: `mean${num}`,
                                                mean: e.target.value
                                            }]
                                            setData(newData)
                                        }}
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Bạn phải nhập định nghĩa.
          </Form.Control.Feedback>
                                </Form.Group>

                            </Form.Row>

                        </Form>
                    </div>
                </Col>
            </>
        )
    }
    const addTermCart = (cards: any, num: number) => {
        const newTermCard = addNewTermCard(num);
        cards = [...cards, newTermCard]
        setTermCard(cards)
        num++;

    }
    const [termCard, setTermCard] = useState<any>([addNewTermCard]);
    var num = 0;

    return (
        <Modal
            show={showAddCourse}
            onHide={closeCoursePopup}
            dialogClassName="my-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>Tạo Thuật ngữ mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <Col>
                    <div className="login-form-container">
                        <Form
                            id="thatform"
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Thuật ngữ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập tiêu đề..."
                                        value={name}
                                        name="term"
                                        className="login-form"
                                        required
                                        style={{ borderBottomColor: "black" }}
                                        onChange={handleChange}
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Bạn phải nhập thuật ngữ.
                  </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Định nghĩa</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập tiêu đề..."
                                        value={name}
                                        name="mean"
                                        className="login-form"
                                        required
                                        style={{ borderBottomColor: "black" }}
                                        onChange={handleChange}
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Bạn phải nhập định nghĩa.
                  </Form.Control.Feedback>
                                </Form.Group>

                            </Form.Row>

                        </Form>
                    </div>
                </Col> */}
                {termCard}
                <Col>
                    <AiOutlinePlus className="create-module float-right" onClick={() => addTermCart(termCard, num)}>

                    </AiOutlinePlus>
                </Col>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    style={{
                        width: "100%",
                        backgroundColor: " #3ccfcf",
                        border: "none",
                    }}
                    type="submit"
                    form="thatform"
                >
                    Lưu
          </Button>
            </Modal.Footer>
        </Modal>
    );
}
const mapStateToProps = (state: any) => {
    return {
        user: state.user,
        module: state.module
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        editModule: (token: String, addToast: any, id: any, data: object) => dispatch(editModule(token, addToast, id, data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(TermCreate));