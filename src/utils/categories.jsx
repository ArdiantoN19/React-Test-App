import { BiLeaf } from "react-icons/bi";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { IoMdFootball } from "react-icons/io";

const categories = [
  {
    id: 0,
    name: "general",
    icon: <BiLeaf />,
  },
  {
    id: 18,
    name: "computer",
    icon: <HiOutlineComputerDesktop />,
  },
  {
    id: 21,
    name: "sport",
    icon: <IoMdFootball />,
  },
];

const generateNameCategory = (categoryId) => {
  const { name } = categories.find(({ id }) => id === categoryId);
  return name;
};

export { categories, generateNameCategory };
