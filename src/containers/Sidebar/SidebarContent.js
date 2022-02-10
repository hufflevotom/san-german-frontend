import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import { useSelector } from "react-redux";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { navStyle, themeType } = useSelector(({ settings }) => settings);
  const pathname = useSelector(({ common }) => common.pathname);

  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  const getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };


  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];

  return (
    <>
      <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
      <div className="gx-sidebar-content">
        <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          <UserProfile />
          <AppsNavigation />
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">

            {/*  <Menu.Item key="sample">
              <Link to="/sample"><i className="icon icon-widgets" />
                <span><IntlMessages id="sidebar.samplePage" /></span>
              </Link>
            </Menu.Item> */}

            <MenuItemGroup key="modulos" className="gx-menu-group" title="Módulos">
              <SubMenu key="configuracion" popupClassName={getNavStyleSubMenuClass(navStyle)}
                title={<span> <i className="icon icon-dasbhoard" />
                  <span>Configuración</span></span>}>

                <Menu.Item key="configuracion/almacen">
                  <Link to="/configuracion/almacen"><i className="icon icon-widgets" />
                    <span>Almacén</span>
                  </Link>
                </Menu.Item>

                <Menu.Item key="configuracion/producto">
                  <Link to="/configuracion/producto"><i className="icon icon-widgets" />
                    <span>Producto</span>
                  </Link>
                </Menu.Item>

              </SubMenu>

            </MenuItemGroup>


          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);

