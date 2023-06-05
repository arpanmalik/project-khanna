/** @format */
import { RiMenu4Line } from "react-icons/ri";
import Dropdown from "react-bootstrap/Dropdown";
import 

const Navbar = ({ hamb, setHamb }) => {
  return (
    <>
      <div
        className={
          hamb
            ? "flex  w-full justify-between  my-1 rounded-sm  p-4 py-3 shadow-md items-center  bg-slate-200 space-x-4"
            : "flex  w-full justify-between my-1 rounded-sm  p-4 py-3 shadow-md items-center  bg-slate-200 space-x-4"
        }
        style={{ backgroundColor: "#19376d" }}
      >
        <RiMenu4Line
          onClick={() => setHamb(!hamb)}
          className="text-2xl font-bold text-gray-900 hover:scale-90 cursor-pointer"
          style={{ color: "#fff" }}
        />

        <section className="flex sm:ml-auto justify-end sm:w-full items-center space-x-2  pr-2">
          <figcaption
            className="tracking-wider pl-1 font-semibold d-flex"
            style={{ gap: "10px", alignItems: "center" }}
          >
            <div
              className="lg:text-base text-sm text-gray-900  uppercase"
              style={{ color: "#fff" }}
            >
              Welcome Admin
            </div>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic"></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item >
                  Update Profile <i className="fa-solid fa-user"></i>{" "}
                </Dropdown.Item>
                <Dropdown.Item>
                  Logout <i className="fa-solid fa-right-from-bracket"></i>{" "}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </figcaption>
        </section>
      </div>
    </>
  );
};

export default Navbar;
