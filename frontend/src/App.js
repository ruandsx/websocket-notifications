import React, { useState, useEffect } from "react";
import {
  Container,
  Menu,
  Dropdown,
  Input,
  Segment,
  Label,
  TransitionablePortal,
  Header,
  Icon,
  Image
} from "semantic-ui-react";
import api from "./services/api";
import { connect, subscribeToNewNotification } from "./services/websocket";
import { isMobile } from "./utils/utils";

function App() {
  const [user, setUser] = useState(isMobile() ? 3 : 1);
  const [socket, setSocket] = useState("");
  const [activeItem, setItem] = useState("home");
  const [notifications, setNots] = useState([]);
  const [unreads, setUnreads] = useState(0);
  const [masterNotification, setMasterNotification] = useState(false);

  function updateUnreads(nots) {
    let num = 0;
    nots.forEach(notification => {
      if (notification.opened === false) {
        num++;
      }
    });
    setUnreads(num);
    nots.sort((a, b) => {
      if (a.id > b.id) return -1;
      else {
        return 1;
      }
    });
    setNots(nots);
  }

  function dismissNotification(arrId) {
    if (notifications[arrId].opened === true) return;

    const id = notifications[arrId].id;

    let nots = notifications;
    nots[arrId].opened = true;

    nots.sort((a, b) => {
      if (a.id > b.id) return -1;
      else {
        return 1;
      }
    });

    setNots(nots);
    updateUnreads(nots);

    const data = { opened: true };
    api.put(`/notifications/update/${id}`, data);
  }
  useEffect(() => {
    setSocket(connect(user));

    api
      .get(`/notifications/${user}`)
      .then(res => {
        res.data.sort((a, b) => {
          if (a.id > b.id) return -1;
          else {
            return 1;
          }
        });
        setNots(res.data);
        console.log(res.data);
        updateUnreads(res.data);
      })
      .catch(err => {
        alert("Error: " + err);
      });
  }, []);

  useEffect(() => {
    subscribeToNewNotification(socket, notification => {
      const nots = [...notifications, notification];
      updateUnreads(nots);
      if (masterNotification) {
        setTimeout(() => {}, 5000);
      }
      setMasterNotification(true);
      setTimeout(() => {
        setMasterNotification(false);
      }, 5000);
    });
  }, [notifications]);

  return (
    <Container fluid style={{ padding: "10px" }}>
      <Menu pointing>
        <Dropdown item icon="bell" simple>
          <>
            <Label
              style={
                unreads > 0
                  ? {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "20px",
                      position: "absolute",
                      top: "2px",
                      left: "40%"
                    }
                  : { display: "none" }
              }
              color="red"
              floating
            >
              {unreads}
            </Label>
            <Dropdown.Menu
              style={{
                maxHeight: "250px",
                maxWidth: "220px",
                overflow: "auto"
              }}
            >
              {notifications.map((notification, id) => {
                return (
                  <Dropdown.Item
                    onClick={() => dismissNotification(id)}
                    key={id}
                  >
                    <p
                      style={!notification.opened ? { fontWeight: 900 } : null}
                    >
                      #{notification.id} - {notification.title}
                    </p>
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </>
        </Dropdown>

        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={() => setItem("home")}
        />
        <Menu.Item
          name="messages"
          active={activeItem === "messages"}
          onClick={() => setItem("messages")}
        />
        <Menu.Item
          name="friends"
          active={activeItem === "friends"}
          onClick={() => setItem("friends")}
        />

        <Menu.Menu position="right">
          <Menu.Item>
            {!isMobile() ? (
              <Input icon="search" placeholder="Search..." />
            ) : (
              <Icon name={"search"} />
            )}
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <Segment>
        {activeItem === "friends" ? (
          <>
            <Image
              fluid
              alt="paragraph"
              src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
            />{" "}
            <p>Friends</p>{" "}
          </>
        ) : activeItem === "messages" ? (
          <>
            <Image
              fluid
              alt="paragraph"
              src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
            />{" "}
            <p>Messages</p>{" "}
          </>
        ) : (
          <>
            {" "}
            <Image
              fluid
              alt="paragraph"
              src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
            />{" "}
            <p>Home</p>{" "}
          </>
        )}
      </Segment>

      {notifications.length > 0 ? (
        <TransitionablePortal
          open={masterNotification}
          transition={{ animation: "fade up", duration: 1000 }}
        >
          <Segment
            style={{
              left: "40%",
              position: "fixed",
              top: "30%",
              zIndex: 1000
            }}
          >
            <Header>{notifications[0].title}</Header>
            <p>{notifications[0].content}</p>
          </Segment>
        </TransitionablePortal>
      ) : null}
    </Container>
  );
}

export default App;
