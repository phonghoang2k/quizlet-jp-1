import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { getQuerySearch } from '../helper/getQuerySearch';
import { getPathUrl } from '../helper/getPathUrl';
import { FOLDER_DETAIL } from '../services/folder/folder.service';
import HeaderPage from '../components/layouts/Header';
import VerticalNav from '../components/layouts/VerticalNav';
import {
    AiOutlineFolder, AiOutlinePlusCircle,
    AiOutlineSetting, AiOutlineShareAlt, AiOutlineDelete,
    AiOutlineFolderAdd,
    AiOutlineUsergroupAdd,
    AiFillEyeInvisible,
    AiFillEye
}
    from 'react-icons/ai';
import {
    deleteFolder, updateFolder, createModuleInFolder,
    deleteModuleFromFolder, assignModuleToFolder
}
    from '../redux/actions/folderActions';
import {
    updateClass, deleteClass, createModuleInClass,
    deleteModuleFromClass, assignModuleToClass
}
from '../redux/actions/classActions';
import { ModuleCreate, UpdateFolderInput, UpdateClassInput, CreateFolderInput } from '../types';
import UpdateFolderForm from '../components/folder/UpdateFolderForm';
import AddModuleToFolder from '../components/folder/AddModuleToFolder';
import AllModuleInFolder from '../components/folder/AllModuleInFolder';
import ShareFolder from '../components/folder/ShareFolder';
import { CLASS_DETAIL } from '../services/class/class.service';
import ShareClass from '../components/class/ShareClass';
import UpdateClassForm from '../components/class/UpdateClassForm';
import AddModuleToClass from '../components/class/AddModuleToClass';
import AllModuleInClass from '../components/class/AllModuleInClass';

const ClassDetail = ({
    user,
    folders,
    deleteFolder,
    updateFolder,
    module,
    createModuleInFolder,
    deleteModuleFromFolder,
    assignModuleToFolder,
    updateClass,
    deleteClass,
    createModuleInClass,
    deleteModuleFromClass,
    assignModuleToClass,
    classes
}: any) => {
    const [folder, setFolder]: any = useState(null);
    const query = getQuerySearch();
    const id = query.get('id');
    const code = query.get('code');
    const usernamePath = getPathUrl()[1];
    const { addToast } = useToasts();
    const [showUpdateClass, setShowUpdateClass] = useState(false);
    const hideUpdateClass = () => {
        setShowUpdateClass(false);
    }
    const [showAddModule, setShowAddModule] = useState(false);
    const hideAddModuleModal = () => {
        setShowAddModule(false);
    }
    const [showShareClass, setShowShareClass] = useState(false);
    const hideShareClass = () => {
        setShowShareClass(false);
    }
    const [classItem, setClassItem]: any = useState(null);
    useEffect(() => {
        if (user?.token) {
            Axios.get(`${CLASS_DETAIL.url}?code=${code}&id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
                .then(res => {
                    if (res.data !== null) {
                        setClassItem(res.data)
                    }
                })
                .catch(e => {
                    addToast("Error when trying get class", {
                        appearance: "error",
                        autoDismiss: true
                    })
                })
                if (classes && classes.list.length > 0) {
                    const findResult = classes.list.find((item: any) => item.id == id && item.code == code)
                    if (findResult !== undefined) {
                        setClassItem(findResult)
                    }
                }
        }
    }, [classes])
    if (!user?.token) {
        return <Redirect to="/home"></Redirect>
    }
    const deleteFolderHandle = (token: string, folder_id: number, addToast: any) => {
        deleteFolder(token, folder_id, addToast)
    }
    // const deleteClassHandle = (token: string, class_id: number, addToast: any) => {
    //     deleteClass(token, class_id, addToast);
    // }
    return (
        <React.Fragment>
            <Row>
                <Col md={12}>
                    <HeaderPage></HeaderPage>
                </Col>
            </Row>
            <Row>
                <Col md={3} className="vertical-nav-container">
                    <VerticalNav />
                </Col>
                <Col md={9} style={{ paddingBottom: "200px" }}>
                    {classItem !== null ? (
                        <React.Fragment>
                            <Row className="folder-header">
                                <Col lg={4}>
                                    <div className="folder-auhor">
                                    </div>
                                    <div className="folder-info">
                                        <AiOutlineUsergroupAdd style={{ fontSize: "50px", marginBottom: "10px" }} />
                                        <span className="folder-name">
                                            {classItem?.name}
                                        </span>
                                        <div>
                                            {classItem?.description}
                                        </div>
                                        <div className="mode_des">
                                            {classItem?.public == 1 ? (
                                                <>
                                                    <AiFillEye></AiFillEye>
                                                    Mọi người
                                                </>
                                            ): (
                                                <>
                                                    <AiFillEyeInvisible></AiFillEyeInvisible>
                                                    Chỉ mình tôi
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={5}>
                                </Col>
                                <Col lg={3}>
                                    {usernamePath === user?.user?.username ? (
                                        <React.Fragment>
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id="folder-add-module">
                                                        Thêm học phần
                                        </Tooltip>
                                                }
                                            >
                                                <Button
                                                    className="folder-actions"
                                                    onClick={() => setShowAddModule(true)}
                                                >
                                                    <AiOutlinePlusCircle />
                                                </Button>
                                            </OverlayTrigger>
                                            <AddModuleToClass
                                                showAddModule={showAddModule}
                                                hideAddModuleModal={hideAddModuleModal}
                                                user={user}
                                                addToast={addToast}
                                                module={module}
                                                class_={classItem}
                                                createModuleInClass={createModuleInClass}
                                                assignModuleToClass={assignModuleToClass}
                                            />
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id="folder-add-module">
                                                        Thêm thư mục
                                        </Tooltip>
                                                }
                                            >
                                                <Button
                                                    className="folder-actions"
                                                    onClick={() => setShowAddModule(true)}
                                                >
                                                    <AiOutlineFolderAdd />
                                                </Button>
                                            </OverlayTrigger>
                                            {/* <AddModuleToFolder
                                                showAddModule={showAddModule}
                                                hideAddModuleModal={hideAddModuleModal}
                                                addToast={addToast}
                                                module={module}
                                                folder={folder}
                                                user={user}
                                                createModuleInFolder={createModuleInFolder}
                                                assignModuleToFolder={assignModuleToFolder}
                                            /> */}
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id="folder-update">
                                                        Chỉnh sửa
                                                    </Tooltip>
                                                }
                                            >
                                                <Button
                                                    className="folder-actions"
                                                    onClick={() => setShowUpdateClass(true)}
                                                >
                                                    <AiOutlineSetting />
                                                </Button>
                                            </OverlayTrigger>
                                            {/* <UpdateFolderForm
                                                folder={folder}
                                                showUpdateFolder={showUpdateFolder}
                                                hideUpdateFolderCreateFolder={hideUpdateFolderCreateFolder}
                                                user={user}
                                                addToast={addToast}
                                                updateFolder={updateFolder}

                                            /> */}
                                            <UpdateClassForm
                                                showUpdateClass={showUpdateClass}
                                                hideUpdateClass={hideUpdateClass}
                                                user={user}
                                                addToast={addToast}
                                                class_={classItem}
                                                updateClass={updateClass}
                                            />
                                            <OverlayTrigger
                                                placement="bottom"
                                                overlay={
                                                    <Tooltip id="folder-delete">
                                                        Xóa lớp học
                                        </Tooltip>
                                                }
                                            >
                                                <Link to="/overview" className="link">
                                                    <Button
                                                        variant="outline-danger"
                                                        className="folder-actions folder-delete"
                                                        onClick={() => deleteClass(user.token, classItem.id, addToast)}
                                                    >
                                                        <AiOutlineDelete />
                                                    </Button>
                                                </Link>
                                            </OverlayTrigger>
                                        </React.Fragment>
                                    ) : null}

                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <Tooltip id="folder-share">
                                                Chia sẻ
                                        </Tooltip>
                                        }
                                    >
                                        <Button
                                            className="folder-actions"
                                            onClick={() => setShowShareClass(true)}
                                        >
                                            <AiOutlineShareAlt />
                                        </Button>
                                    </OverlayTrigger>
                                    <ShareClass
                                        showShareFolder={showShareClass}
                                        hideShareFolder={hideShareClass}
                                        user={user}
                                        addToast={addToast}
                                    />
                                </Col>
                            </Row>
                            {/* <AllModuleInFolder
                                user={user}
                                folder={folder}
                                addToast={addToast}
                                deleteModuleFromFolder={deleteModuleFromFolder}
                                usernamePath={usernamePath}
                            /> */}
                            <AllModuleInClass
                                user={user}
                                class_={classItem}
                                addToast={addToast}
                                classes={classes}
                                deleteModuleFromClass={deleteModuleFromClass}
                            />
                        </React.Fragment>

                    ) : (
                            <React.Fragment>
                                <Row style={{ marginTop: "100px" }} className="d-flex justify-content-center">
                                    <Spinner animation="border" variant="primary"></Spinner>
                                </Row>
                            </React.Fragment>
                        )}
                </Col>
            </Row>
        </React.Fragment>
    )
}
const mapStateToProps = (state: any) => {
    return {
        user: state.user,
        module: state.module,
        folders: state.folders,
        classes: state.classes
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        deleteFolder: (token: string, folder_id: number,
            addToast: any) => dispatch(deleteFolder(token, folder_id, addToast)),
        // updateFolder: (token: string, folder_id: number, input: UpdateFolderInput,
        //     addToast: any) => dispatch(updateFolder(token, folder_id, input, addToast)),
        // createModuleInFolder: (token: string, folder_id: number, code: string,
        //     input: ModuleCreate, addToast: any) => dispatch(createModuleInFolder(token, folder_id, code, input, addToast)),
        // deleteModuleFromFolder: (token: string, module_id: number,
        //     folder_id: number, addToast: any) => dispatch(deleteModuleFromFolder(token, module_id, folder_id, addToast)),
        // assignModuleToFolder: (token: string, module_id: number,
        //     folder_id: number, addToast: any) => dispatch(assignModuleToFolder(token, module_id, folder_id, addToast)),
        updateClass: (token: string, class_id: number, input: UpdateClassInput,
            addToast: any) => dispatch(updateClass(token, class_id, input, addToast)),
        deleteClass: (token: string, class_id: number, addToast: any) => dispatch(deleteClass(token, class_id, addToast)),
        createModuleInClass: (
            token: string, class_id: number, code: string,
            input: ModuleCreate, addToast: any
            ) => dispatch(createModuleInClass(token, class_id, code, input, addToast)),
        deleteModuleFromClass: (
            token: string, module_id: number,
            class_id: number, addToast: any
            ) => dispatch(deleteModuleFromClass(token, module_id, class_id, addToast)),
        assignModuleToClass: (
            token: string, module_id: number,
            class_id: number, addToast: any
        ) => dispatch(assignModuleToClass(token, module_id, class_id, addToast))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ClassDetail))
