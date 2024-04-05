import { Dropdown, Flex } from "antd";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import { CiLogout, CiUser } from "react-icons/ci";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import { useMe } from "../hooks/useUsers";
import { FaUserCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import { IoMdInformationCircleOutline } from "react-icons/io";
const UserIcon = () => {
  const { data, isError } = useMe();
  const { nickname, balance } = data || {};
  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <CiUser></CiUser>,
      label: <p>{isError ? "用户名" : `用户名:${nickname}`}</p>,
    },
    {
      key: "2",
      icon: <IoMdInformationCircleOutline />,
      label: <Link to="/home/currentuser">个人主页</Link>,
    },
    {
      key: "3",
      icon: <FaKey></FaKey>,
      label: <Link to="/login/password">修改密码</Link>,
    },
    {
      key: "4",
      icon: <MdAccountBalanceWallet></MdAccountBalanceWallet>,
      label: <p>{isError ? "余额" : `余额:${balance}`}</p>,
    },
    {
      key: "5",
      icon: <CiLogout></CiLogout>,
      danger: true,
      label: "登出",
    },
  ];
  // TODO: replace this with backend image
  return (
    <>
      <Dropdown menu={{ items }} placement="bottomLeft">
        <Flex justify="center" align="center" vertical>
          <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
            <div>
              <FaUserCircle size={40} />
            </div>
          </IconContext.Provider>
        </Flex>
      </Dropdown>
    </>
  );
};

export default UserIcon;
