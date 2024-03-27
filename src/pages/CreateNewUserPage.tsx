import { Col } from "antd";
import CreateNewUserForm from "../components/CreateNewUserForm";

const CreateNewUserPage = () => {
  return (
    <Col span={12} offset={6}>
      <CreateNewUserForm />
    </Col>
  );
};

export default CreateNewUserPage;
