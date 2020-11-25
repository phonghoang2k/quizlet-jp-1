import React, {useState} from 'react';
import { Card } from 'react-bootstrap';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useToasts } from "react-toast-notifications";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import CourseEdit from '../../pages/CourseEdit';

const ModuleCard = ({ deleteModule, module, user }: any) => {
    const [addCourse, setAddCourse] = useState(false);
    const handleEdit = (mod: any) => {    
        setAddCourse(true);
    }

    const handleCloseCourse = () => {
        setAddCourse(false);
    }

    const handleAddd = () => {
        setAddCourse(false);
    }

    const { addToast } = useToasts();
    return (
        <Card className="card-container">
            <Card.Header className="created-at" style={{ justifyContent: "flex-start" }}>
                <AiOutlineDelete className="delete-module" onClick={() => deleteModule(user.token, addToast, module?.id)} />
                <AiOutlineEdit className="edit-module" style={{ marginLeft: "1rem"}} onClick={() => handleEdit(module)}/>
            </Card.Header>
            <Card.Body>
                <Card.Title>{module?.name}</Card.Title>
                <Card.Text>
                    {module?.description}
                </Card.Text>
            </Card.Body>

            <Card.Footer className="author-name" style={{ backgroundColor: "white", display: "flex", justifyContent: "space-between" }}>
                <div>
                    {
                        (module.public === 1) ? (<div><FiEye /> public</div>) : <div><FiEyeOff /> private</div>
                    }
                </div>
                <div>
                    create by: {user?.user?.username}
                </div>
            </Card.Footer>
            <CourseEdit showAddCourse={addCourse} closeCoursePopup={handleCloseCourse} handleAddd={handleAddd} currentModule={module}/>
        </Card>
    )
}


export default React.memo(ModuleCard);

