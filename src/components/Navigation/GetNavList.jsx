// import FontIcon from "react-md/lib/FontIcons";
import { Link } from "gatsby";

function GetNavList(config) {
  const NavList = [
    {
      primaryText: "Home",
      // LeftIcon: <p>home</p>,
      component: Link,
      to: "/"
    },
    {
      divider: true
    }
  ];

  if (config.userLinks) {
    config.userLinks.forEach(link => {
      NavList.push({
        primaryText: link.label,
        // LeftIcon: <FontIcon forceSize iconClassName={link.iconClassName} />,
        component: "a",
        href: link.url,
        target: "blank",
        rel: "noopener noreferrer"
      });
    });
  }

  NavList.push({ divider: true });

  NavList.push({
    primaryText: "About",
    // LeftIcon: <FontIcon>person</FontIcon>,
    component: Link,
    to: "/about/"
  });

  NavList.push({
    primaryText: "Resources",
    // LeftIcon: <FontIcon>person</FontIcon>,
    component: Link,
    to: "/resources/"
  });
  return NavList;
}
export default GetNavList;
