import { IconContext } from "react-icons";
import { MdOutlineElevator } from "react-icons/md";
import { FaRestroom, FaWheelchair } from "react-icons/fa";

const purpleIcon = { className: "fill-primary text-primary w-5 h-5" };

export default function SingleFeaturesResult() {
  return (
    <div className="mt-4">
      <ul className="">
        <li className="flex items-center gap-3 mb-2">
          <div>
            <IconContext.Provider value={purpleIcon}>
              <FaRestroom />
            </IconContext.Provider>
          </div>
          <span className="text-xs">Toilets</span>
        </li>
        <li className="flex items-center gap-3 mb-2">
          <div>
            <IconContext.Provider value={purpleIcon}>
              <MdOutlineElevator />
            </IconContext.Provider>
          </div>
          <span className="text-xs">Elevator</span>
        </li>
        <li className="flex items-center gap-3 mb-2">
          <div>
            <IconContext.Provider value={purpleIcon}>
              <FaRestroom />
            </IconContext.Provider>
          </div>
          <span className="text-xs">Toilets</span>
        </li>
        <li className="flex items-center gap-3 mb-2">
          <div>
            <IconContext.Provider value={purpleIcon}>
              <FaWheelchair />
            </IconContext.Provider>
          </div>
          <span className="text-xs">Wheel Chair</span>
        </li>
      </ul>
    </div>
  );
}
