import { BsPerson } from "react-icons/bs";
import { AiOutlineLogin, AiOutlineWifi } from "react-icons/ai";
import { MdOutlineAttachMoney, MdScreenshotMonitor } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";
import { TbBulb } from "react-icons/tb";

export const details = [
  {
    title: "Create Account",
    content:
      "Firstly  to create note you have to create an account, best experience",
    color: "bg-orange",

    Icon: BsPerson,
  },
  {
    title: "Sign In",
    content:
      "Ensure you sign in to get the best experience, click on the login button ",

    Icon: AiOutlineLogin,
  },
  {
    title: "Add Money",
    color: "bg-orange",
    content: "Start saving money, to save you have to create an account",
    Icon: MdOutlineAttachMoney,
  },
];

export const charityOrg = [
  {
    id: 1,
    image: "/redcross.png",
    name: "Red Cross",
  },
  {
    id: 2,
    image: "/unisef.jpg",
    name: "UNISEF",
  },
  {
    id: 3,
    image: "/widow.png",
    name: "WEWE",
  },
  {
    id: 4,
    image: "/asante.jpeg",
    name: "Asante",
  },
  {
    id: 5,
    image: "/naijaown.jpeg",
    name: "Aid People",
  },
];

export const bills = [
  {
    id: 1,
    Icon: IoIosPhonePortrait,
    name: "Air Time",
  },
  {
    id: 2,
    Icon: AiOutlineWifi,
    name: "Internet ",
  },
  {
    id: 3,
    Icon: MdScreenshotMonitor,
    name: "Tv",
  },
  {
    id: 4,
    Icon: TbBulb,
    name: "Electricity",
  },
];

export const airtimeProvider = [
  {
    name: "MTN",
    image: "/mtn.png",
  },
  {
    name: "Glo",
    image: "/glo.svg",
  },
  {
    name: "Airtel",
    image: "/airtel.png",
  },
  {
    name: "9Mobile",
    image: "/9mobile.png",
  },
];

export const TvProvider = [
  {
    name: "DSTV",
    image: "/dstv.jpg",
  },
  {
    name: "GOTV",
    image: "/gotv.png",
  },
  {
    name: "SHOWMAX",
    image: "/showmax.webp",
  },
];
export const ElectricityProvider = [
  {
    name: "PHED NG",
    image: "/PHED.png",
  },
  {
    name: "AEDC NG",
    image: "/AEDC.jpg",
  },
  {
    name: "EEDC NG",
    image: "/EEDCwebp.webp",
  },
];
