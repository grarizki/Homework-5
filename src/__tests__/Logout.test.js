import { screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Logout from "../pages/Status/Logout";

Enzyme.configure({ adapter: new Adapter() });

describe("Logout", () => {
    test("has a button", () => {
        const wrapper = shallow(<Logout />)
        expect(wrapper.find("Button")).toHaveLength(1);
        expect(wrapper.find("Button").text()).toEqual('Keluar');
    });
    

});