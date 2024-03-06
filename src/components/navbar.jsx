import { links } from "../data";
import { Nav, NavItem, NavLink } from 'react-bootstrap';

const NavLateral = () => {
    const currentPath = window.location.pathname;
    return(
        
            <Nav className="flex-column p-0 w-100">
            {
                links.map(({name, path, icon}, index) => {
                    return(
                        <NavItem key={index}  className={"nav-item bg-light w-100 px-3 "+(currentPath === path ? "bg-white" : "")}>
                            <NavLink href={path} className={"nav-link w-100"+(currentPath === path ? "active" : "")}>{icon} {name}</NavLink>
                        </NavItem>
                    )
                })
            }
            </Nav>
    )
}

export default NavLateral;