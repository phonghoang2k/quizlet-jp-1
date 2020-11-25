import React, { useState } from "react";
import { Card } from "react-bootstrap";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { useToasts } from "react-toast-notifications";
import { FiEye, FiEyeOff } from "react-icons/fi";
import CourseEdit from "../../pages/CourseEdit";
import TermCreate from "../../pages/TermCreate";

const ModuleCard = ({ deleteModule, module, user }: any) => {
  const [addCourse, setAddCourse] = useState(false);
  const [addTerm, setAddTerm] = useState(false);
  const handleEdit = (mod: any) => {
    setAddCourse(true);
  };

  const handleCreate = (mod: any) => {
    setAddTerm(true);
  };

  const handleCloseCourse = () => {
    setAddCourse(false);
  };

  const handleAddd = () => {
    setAddCourse(false);
  };
  const handleCloseTerm = () => {
    setAddTerm(false);
  };

  const handleAddTerm = () => {
    setAddTerm(false);
  };

  const { addToast } = useToasts();
  return (
    <Card className="card-container">
      <Card.Header
        className="created-at"
        style={{ justifyContent: "flex-start" }}
      >
        <AiOutlineDelete
          className="delete-module"
          onClick={() => deleteModule(user.token, addToast, module?.id)}
        />
        <AiOutlineEdit
          className="edit-module"
          style={{ marginLeft: "1rem" }}
          onClick={() => handleEdit(module)}
        />
        <AiOutlinePlus
          className="create-module"
          style={{ marginLeft: "1rem" }}
          onClick={() => handleCreate(module?.id)}
        />
      </Card.Header>
      <Card.Body>
        <Card.Title>{module?.name}</Card.Title>
        <Card.Text>{module?.description}</Card.Text>
      </Card.Body>

      <Card.Footer
        className="author-name"
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          {module.public === 1 ? (
            <div>
              <FiEye /> public
            </div>
          ) : (
            <div>
              <FiEyeOff /> private
            </div>
          )}
        </div>
        <div>create by: {user?.user?.username}</div>
      </Card.Footer>
      <CourseEdit
        showAddCourse={addCourse}
        closeCoursePopup={handleCloseCourse}
        handleAddd={handleAddd}
        currentModule={module}
      />
      <TermCreate
        showAddCourse={addTerm}
        closeCoursePopup={handleCloseTerm}
        handleAddTerm={handleAddTerm}
        currentModule={module}
      />
    </Card>
  );
};

export default React.memo(ModuleCard);
