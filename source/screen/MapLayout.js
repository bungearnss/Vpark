import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  Modal,
  TouchableOpacity,
  Animated,
  Platform
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import MapView, {
  Marker,
  Polygon,
  PROVIDER_GOOGLE,
  Callout,
} from "react-native-maps";
import { BarIndicator } from "react-native-indicators";
import getDirections from "react-native-google-maps-directions";

import Refresh from "../icon/Refresh";
import Mappin from "../icon/Mappin";
import UserLocation from "../icon/UserLocation";
import Information from "../icon/Information";
import { styles } from "./MapLayoutStyle";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MapLayout = () => {
  var mapRef = useRef();
  var markerRef = useRef([]);

  var parkingLotsData;
  const startTime = Date.now();

  const [userLatLong, setUserLatLong] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [refreshTime, setRefreshTime] = useState("");
  const [showTimer, setShowTimer] = useState(false);
  const [id1xx, setID1xx] = useState([]);
  const [id2xx_1, setID2xx_1] = useState([]);
  const [id2xx_2, setID2xx_2] = useState([]);
  const [id3xx, setID3xx] = useState([]);
  const [id4xx_1, setID4xx_1] = useState([]);
  const [id4xx_2, setID4xx_2] = useState([]);
  const [currentAvailable, setCurrentAvailable] = useState("");
  const [carParkTitle, setCarParkTitle] = useState("FIBO");
  const [showCarParkPicker, setShowCarParkPicker] = useState(false);
  const [showCarParkInformation, setShowCarParkInformation] = useState(false);

  const scaleRefreshValue = new Animated.Value(1);
  const scaleSelectLocationValue = new Animated.Value(1);
  const scaleUserLocationValue = new Animated.Value(1);
  const scaleInformationValue = new Animated.Value(1);

  const getUserLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      const userLocation = await Location.getCurrentPositionAsync();
      const latlong = {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      };
      return latlong;
    } else {
      getUserLocation();
    }
  };
  const Region = {
    latitude: 13.654998926783339,
    longitude: 100.49456555396318,
    latitudeDelta: 0.0014,
    longitudeDelta: 0.0014,
  };
  const carSlotReference = {
    id1xx: [
      { name: 1, latitude: 13.654807, longitude: 100.494179, status: "" },
      { name: 2, latitude: 13.6547985, longitude: 100.4941996 },
      { name: 3, latitude: 13.6547615, longitude: 100.4941826 },
      { name: 4, latitude: 13.65477, longitude: 100.494162 },
    ],
    id2xx_1: [
      { name: 1, latitude: 13.654936, longitude: 100.494244, status: "" },
      { name: 2, latitude: 13.6549275, longitude: 100.4942646 },
      { name: 3, latitude: 13.6548905, longitude: 100.4942476 },
      { name: 4, latitude: 13.654899, longitude: 100.494227 },
    ],
    id2xx_2: [
      { name: 1, latitude: 13.654899, longitude: 100.494227, status: "" }, //  Y,X
      { name: 2, latitude: 13.6548905, longitude: 100.4942476 }, //  1-2=>-85 ,1-2=>+206
      { name: 3, latitude: 13.6548535, longitude: 100.4942306 }, //  2-3=>-370, 2-3=>-170
      { name: 4, latitude: 13.654862, longitude: 100.49421 }, //  3-4=>+85, -206
    ],
    id3xx: [
      { name: 1, latitude: 13.6550342, longitude: 100.4942861, status: "" },
      { name: 2, latitude: 13.6550257, longitude: 100.4943067 },
      { name: 3, latitude: 13.6549887, longitude: 100.4942897 },
      { name: 4, latitude: 13.6549972, longitude: 100.4942691 },
    ],
    id4xx_1: [
      { name: 1, latitude: 13.6546587, longitude: 100.494535, status: "" },
      { name: 2, latitude: 13.6546502, longitude: 100.4945556 },
      { name: 3, latitude: 13.6546133, longitude: 100.4945386 },
      { name: 4, latitude: 13.6546217, longitude: 100.494518 },
    ],
    id4xx_2: [
      { name: 1, latitude: 13.6546217, longitude: 100.494518, status: "" },
      { name: 2, latitude: 13.6546133, longitude: 100.4945386 },
      { name: 3, latitude: 13.6545763, longitude: 100.4945216 },
      { name: 4, latitude: 13.6545848, longitude: 100.494501 },
    ],
  };
  const findCurrentAvailable = (parkingLotsData) => {
    var available = 0;
    parkingLotsData.map((element) => {
      if (element.Lot_Status == "0") {
        available = available + 1;
      } else {
      }
    });
    setCurrentAvailable(available);
  };
  const fetchData = async () => {
    try {
      const response = await fetch("http://52.221.134.8/apiv1.json");
      const json = await response.json();

      parkingLotsData = json;
      console.log(parkingLotsData)

      findCurrentAvailable(parkingLotsData);

      const gen1 = latlongGenerator(
        carSlotReference.id1xx,
        12,
        parkingLotsData,
        7,
        12,
        0,
        4,
        1,
        false,
        [4, 10]
      );
      const gen2_1 = latlongGenerator(
        carSlotReference.id2xx_1,
        35,
        parkingLotsData,
        0,
        0,
        0,
        0,
        0,
        true,
        0
      );
      const gen2_2 = latlongGenerator(
        carSlotReference.id2xx_2,
        35,
        parkingLotsData,
        0,
        0,
        0,
        0,
        0,
        true,
        0
      );
      const gen3 = latlongGenerator(
        carSlotReference.id3xx,
        35,
        parkingLotsData,
        0,
        0,
        0,
        0,
        0,
        true,
        0
      );
      const gen4_1 = latlongGenerator(
        carSlotReference.id4xx_1,
        16,
        parkingLotsData,
        0,
        16,
        5, //23
        34, //52
        2,
        false,
        [2, 8]
      );
      const gen4_2 = latlongGenerator(
        carSlotReference.id4xx_2,
        16,
        parkingLotsData,
        0,
        16,
        6, //24
        34, //52
        2,
        false,
        [2, 8]
      );

      setID1xx(gen1);
      setID2xx_1(gen2_1);
      setID2xx_2(gen2_2);
      setID3xx(gen3);
      setID4xx_1(gen4_1);
      setID4xx_2(gen4_2);

      setRefreshTime("NOW");
      setShowTimer(true);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const TimerFN = () => {
    const currentTime = Date.now();
    const TimeDifferent = (currentTime - startTime) / 60000; //minute

    if (TimeDifferent >= 1 && TimeDifferent < 60) {
      if (Math.floor(TimeDifferent) == 1) {
        setRefreshTime(Math.floor(TimeDifferent) + " minute ago");
      } else {
        setRefreshTime(Math.floor(TimeDifferent) + " minutes ago");
      }
    } else if (TimeDifferent >= 60 && TimeDifferent < 1440) {
      if (Math.floor(TimeDifferent) == 60) {
        setRefreshTime(Math.round(TimeDifferent / 60) + " hour ago");
      } else {
        setRefreshTime(Math.round(TimeDifferent / 60) + " hours ago");
      }
    } else if (TimeDifferent > 1440) {
      setRefreshTime("Refresh to update!");
    }
  };
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      setUserLatLong(await getUserLocation());
    })();
    fetchData();
    const TIMER = setInterval(TimerFN, 10000);
    return () => {
      clearInterval(TIMER);
    };
  }, [refresh, markerRef]);
  
  const latlongGenerator = (
    refLot,
    numberPerRow,
    parkingLotsData,
    indexStart,
    indexEnd,
    firstDataFromAPI,
    lastDataFromAPI,
    offset,
    isMOCKUP,
    treePosition
  ) => {
    /*
     *   refLot              -  Reference position of the first parking lot in a row and the first position itself
     *   numberPerRow        -  Determine how many parking lot it will be in one row (not include reference lot)
     *   parkingLotsData     -  Dataset that contain status of the parking lot from server
     *   indexStart          -  First index of the data in tempData array that use as our physical device's position to showing on the map
     *   indexEnd            -  Last index of the data in tempData array that use as our physical device's position to showing on the map
     *   firstDataFromAPI    -  First index of the parkingLotsData array that is the specific data for each segment (id1xx, id2xx, id3xx)
     *   lastDataFromAPI     -  Last index of the parkingLotsData array that is the specific data for each segment (id1xx, id2xx, id3xx)
     *   offset              -  a value that shift the index of parkingLotsData from 1 2 3 4 5 ... -> 1 3 5 7 9 ... (currently = 2)
     *   isMOCKUP            -  If true the tempData won't have any status (render blue block)
     *   treePosition        -  An array that contain the position index of trees
     */

    // setting the Reference data for calculating the lat,long
    let lat1 = refLot[0].latitude;
    let lat2 = refLot[1].latitude;
    let lat3 = refLot[2].latitude;
    let lat4 = refLot[3].latitude;
    let long1 = refLot[0].longitude;
    let long2 = refLot[1].longitude;
    let long3 = refLot[2].longitude;
    let long4 = refLot[3].longitude;

    const tempData = [[...refLot]];

    // Create data array for drawing on the map (no blank area)
    for (let i = 1; i <= numberPerRow; i++) {
      lat1 = lat2;
      long1 = long2;
      lat4 = lat3;
      long4 = long3;

      lat2 = lat1 - 0.0000085;
      long2 = long1 + 0.0000206;
      lat3 = lat4 - 0.0000085;
      long3 = long4 + 0.0000206;

      tempData.push([
        { name: 1, latitude: lat1, longitude: long1, status: "" },
        { name: 2, latitude: lat2, longitude: long2 },
        { name: 3, latitude: lat3, longitude: long3 },
        { name: 4, latitude: lat4, longitude: long4 },
      ]);
    }

    // Add a mark to classify which slot should not be draw as a car parking slot
    // treePosition - Array Ex: [0,1,8,15]
    if (treePosition) {
      treePosition.map((value) => (tempData[value][0].status = "TREE"));
    }

    // check if we received the data from an API or not. And do we have to assign the Lot_Status to the data in this zone or not
    if (!isMOCKUP && parkingLotsData) {
      // indexStart, indexEnd - is a first and last index of the data in tempData array that use as our physical device's position to showing on the map
      for (let i = indexStart; i <= indexEnd; i++) {
        if (tempData[i][0].status == "TREE") {
          // if it mark as a Tree --> Do nothing
        } else if (firstDataFromAPI <= lastDataFromAPI) {
          // firstDataFromAPI ,lastDataFromAPI - first and last index of the dataset that was specific for each segment (id1xx, id2xx, id3xx)
          // that we getting from an API. Each individual element contain Lot_Status object, so we can assign it to tempData to showing on the map
          tempData[i][0].status = parkingLotsData[firstDataFromAPI].Lot_Status;
          firstDataFromAPI = firstDataFromAPI + offset;
        }
      }
    } else {
      // we don't receive the data from an API
    }

    return tempData;
  };
  const DrawParkingSlot = (data) => {
    return data.map((slot, index) => {
      let colorbackground, stroke;
      switch (slot[0].status) {
        case "0":
          colorbackground = "lime";
          stroke = "white";
          break;
        case "1":
          colorbackground = "red";
          stroke = "white";
          break;
        case "TREE":
          colorbackground = "rgba(0,0,0,0)";
          stroke = "rgba(0,0,0,0)";
          break;
        default:
          colorbackground = "rgba(50,60,150,0.75)";
          stroke = "white";
          break;
      }
      return (
        <Polygon
          key={index}
          coordinates={slot}
          fillColor={colorbackground}
          strokeWidth={1}
          strokeColor={stroke}
        ></Polygon>
      );
    });
  };
  const navigateToMaps = async (latlong) => {
    const userLocation = await getUserLocation();
    const data = {
      source: {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      },
      destination: {
        latitude: latlong.latitude,
        longitude: latlong.longitude,
      },
      params: [
        {
          key: "travelmode",
          value: "driving",
        },
      ],
    };
    getDirections(data);
    setUserLatLong(userLocation);
  };
  const indicatorInfomation = [
    { color: "#00cc77", Text: "Available" },
    { color: "#fa0055", Text: "Not Available" },
    { color: "rgba(50,60,150,1)", Text: "Normal Slot" },
  ];
  const locationInfomation = [
    {
      name: "FIBO",
      latlong: {
        latitude: 13.654998926783339,
        longitude: 100.49456555396318,
        latitudeDelta: 0.0014,
        longitudeDelta: 0.0014,
      },
      time: {
        open: 5,
        close: 22,
      },
      available: currentAvailable,
    },
    {
      name: "CB4",
      latlong: {
        latitude: 13.649213,
        longitude: 100.492737,
        latitudeDelta: 0.0014,
        longitudeDelta: 0.0014,
      },
      time: {
        open: 5,
        close: 22,
      },
      available: null,
    },
    {
      name: "D'oro",
      latlong: {
        latitude: 13.650266,
        longitude: 100.495715,
        latitudeDelta: 0.0014,
        longitudeDelta: 0.0014,
      },
      time: {
        open: 5,
        close: 22,
      },
      available: null,
    },
    {
      name: "CB1",
      latlong: {
        latitude: 13.651008,
        longitude: 100.493298,
        latitudeDelta: 0.0014,
        longitudeDelta: 0.0014,
      },
      time: {
        open: 5,
        close: 22,
      },
      available: null,
    },
  ];
  const markerInfomation = [
    {
      title: "FIBO",
      description: "Go to FIBO parking",
      coordinate: {
        latitude: 13.654998926783339,
        longitude: 100.49456555396318,
      },
    },
    {
      title: "CB4",
      description: "Go to CB4 parking",
      coordinate: {
        latitude: 13.649213,
        longitude: 100.492737,
      },
    },
    {
      title: "D'oro",
      description: "Go to D'oro parking",
      coordinate: {
        latitude: 13.650266,
        longitude: 100.495715,
      },
    },
    {
      title: "CB1",
      description: "Go to CB1 parking",
      coordinate: {
        latitude: 13.651008,
        longitude: 100.493298,
      },
    },
  ];
  const FIBO_arrow1 = [
    { latitude: 13.654172372022533, longitude: 100.49451056867838 }, //  ซ้ายล่าง
    { latitude: 13.654165856009751, longitude: 100.49454040825366 }, //  ขวาล่าง
    { latitude: 13.654241115946348, longitude: 100.49455616623163 }, //  ขวาบน
    { latitude: 13.654235251536564, longitude: 100.49458164721727 }, //  ขวา
    { latitude: 13.65428933442123, longitude: 100.49455180764198 }, //  กลาง
    { latitude: 13.654253170565985, longitude: 100.4945008456707 }, //  ซ้าย
    { latitude: 13.654248283558099, longitude: 100.49452699720861 }, //  ซ้ายบน
  ];
  const FIBO_arrow2 = [
    { latitude: 13.654267179988041, longitude: 100.49464534968138 },
    { latitude: 13.654273370197524, longitude: 100.4946108162403 },
    { latitude: 13.654205277884289, longitude: 100.494596734643 },
    { latitude: 13.654210164893081, longitude: 100.4945732653141 },
    { latitude: 13.654155756189592, longitude: 100.49460545182228 },
    { latitude: 13.654194852265233, longitude: 100.49465540796518 },
    { latitude: 13.654198761872422, longitude: 100.4946305975318 },
  ];

  // Componenet
  const RefreshButton = () => {
    const refreshAction = () => {
      Animated.sequence([
        Animated.timing(scaleRefreshValue, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(scaleRefreshValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setRefresh(!refresh);
      });
    };
    return (
      <Animated.View
        style={{
          ...styles.floatbutton,
          transform: [{ scale: scaleRefreshValue }],
        }}
      >
        <TouchableOpacity onPress={refreshAction}>
          <Refresh />
        </TouchableOpacity>
      </Animated.View>
    );
  };
  const UserLocationButton = () => {
    const userLocationAction = async () => {
      Animated.sequence([
        Animated.timing(scaleUserLocationValue, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(scaleUserLocationValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(async () => {
        const currentLocation = await getUserLocation();
        const latlongObj = {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0014,
          longitudeDelta: 0.0014,
        };
        mapRef.animateToRegion(latlongObj, 1500);
        setUserLatLong(currentLocation);
      });
    };
    return (
      <Animated.View
        style={{
          ...styles.floatbutton,
          transform: [{ scale: scaleUserLocationValue }],
        }}
      >
        <TouchableOpacity onPress={userLocationAction}>
          <UserLocation />
        </TouchableOpacity>
      </Animated.View>
    );
  };
  const SelectLocationButton = () => {
    const selectLocationAction = () => {
      Animated.sequence([
        Animated.timing(scaleSelectLocationValue, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(scaleSelectLocationValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setShowCarParkPicker(true);
      });
    };
    return (
      <Animated.View
        style={{
          ...styles.floatbutton,
          transform: [{ scale: scaleSelectLocationValue }],
        }}
      >
        <TouchableOpacity onPress={selectLocationAction}>
          <Mappin />
        </TouchableOpacity>
      </Animated.View>
    );
  };
  const InformationPanel = () => {
    const informationPanelAction = () => {
      Animated.sequence([
        Animated.timing(scaleInformationValue, {
          toValue: 1.05,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(scaleInformationValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setShowCarParkInformation(true);
      });
    };
    return (
      <Animated.View
        style={{
          ...styles.indicator,
          transform: [{ scale: scaleInformationValue }],
        }}
      >
        <TouchableOpacity onPress={informationPanelAction} activeOpacity={1}>
          <View style={styles.showInformation}>
            <View style={styles.LEFT}>
              <Text style={styles.availableInformation}>
                {currentAvailable}
              </Text>
            </View>
            <View style={styles.RIGHT}>
              <Information style={styles.informationSVGIcon} />
              <Text style={styles.parkingName}>{carParkTitle}</Text>
            </View>
          </View>

          <View style={styles.indicatorIcon}>
            {indicatorInfomation.map((element, key) => {
              return (
                <View key={key} style={styles.wrap}>
                  <View
                    style={{ ...styles.square, backgroundColor: element.color }}
                  ></View>
                  <Text style={styles.indText}>{element.Text}</Text>
                </View>
              );
            })}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  const ShowTimer = () => {
    return (
      showTimer && (
        <View style={styles.lastupdatetime}>
          <Text style={styles.lastupdatetext}>{refreshTime}</Text>
        </View>
      )
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        style={"dark"}
        translucent={false}
        //backgroundColor="#ff9700"
        backgroundColor="yellow"
      ></StatusBar>

      {isLoading && (
        <View style={styles.activityIndicator}>
          <BarIndicator color="white" size={35} />
        </View>
      )}
      <ShowTimer />

      <View style={styles.floatbuttoncontainer}>
        <RefreshButton />
        <SelectLocationButton />
        <UserLocationButton />
      </View>
      <InformationPanel />

      <Modal
        visible={showCarParkPicker}
        transparent={true}
        animationType={"slide"}
        onRequestClose={() => {
          setShowCarParkPicker(false);
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setShowCarParkPicker(false);
          }}
          style={{
            width: windowWidth,
            height: windowHeight,
          }}
        ></TouchableOpacity>

        <View style={styles.modalcontainer}>
          <Text style={styles.modaltextheader}>Select Parking Area</Text>
          <View style={styles.modalchoicescontainer}>
            {locationInfomation.map((element, key) => {
              const isOpen = () => {
                const time =
                  new Date().getHours() * 100 +
                  new Date(startTime).getMinutes();
                if (
                  time >= element.time.open * 100 &&
                  time <= element.time.close * 100
                ) {
                  return element.available === null ? (
                    <Text
                      style={{
                        ...styles.parkingAvailable,
                        color: "rgba(0,0,0,0.3)",
                      }}
                    >
                      Not Available
                    </Text>
                  ) : (
                    <Text
                      style={{
                        ...styles.parkingAvailable,
                        color: "#00cc77",
                      }}
                    >
                      {element.available}
                    </Text>
                  );
                } else {
                  return (
                    <Text
                      style={{
                        ...styles.parkingAvailable,
                        color: "rgba(255,0,0,0.7)",
                        fontWeight: "bold",
                      }}
                    >
                      CLOSED
                    </Text>
                  );
                }
              };
              return (
                <TouchableHighlight
                  key={key}
                  style={styles.modalchoice}
                  activeOpacity={0.9}
                  underlayColor="rgba(0,0,0,0.2)"
                  onPress={() => {
                    mapRef.animateToRegion(element.latlong, 1500);
                    console.log(markerRef.current[key].showCallout());
                    setShowCarParkPicker(false);
                    setCarParkTitle(element.name);
                  }}
                >
                  <View style={styles.choiceWrapper}>
                    <Text style={styles.parkingChoices}>{element.name}</Text>
                    {isOpen()}
                  </View>
                </TouchableHighlight>
              );
            })}
          </View>
        </View>
      </Modal>

      <Modal
        visible={showCarParkInformation}
        transparent={true}
        animationType={"slide"}
        onRequestClose={() => {
          setShowCarParkInformation(false);
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setShowCarParkInformation(false);
          }}
          style={{
            width: windowWidth,
            height: windowHeight,
          }}
        ></TouchableOpacity>

        <View style={styles.infocontainer}>
          <Text style={styles.modaltextheader}>Information</Text>
          <View style={styles.modalchoicescontainer}>
            <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                เวลาทำการ:
              </Text>
              <Text style={{ fontSize: 16, marginTop: 10 }}>
                จันทร์ - ศุกร์ (05.00 - 22.00 น.)
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 15 }}>
                กฎการใช้ที่จอดรถยนต์:
              </Text>
              <Text style={{ fontSize: 16, marginTop: 10 }}>
                1.
                เฉพาะผู้ที่มีสติ๊กเกอร์ที่จอดรถยนต์สำหรับบุคลากร(สีแดง)และนักศึกษา(สีเหลือง)เท่านั้นจึงจะสามารถเข้าใช้งานได้
              </Text>
              <Text style={{ fontSize: 16, marginTop: 10 }}>
                2.บุคคลภายนอกไม่สามารถนำรถยนต์เข้ามาจอดในบริเวณดังกล่าว
                หากฝ่าฝืนเจ้าหน้าที่จะตักเตือนและบันทึกทะเบียนรถยนต์
                หากฝ่านฝืนครบ 3 ครั้ง จะถูกล็อกล้อและเสียค่าปรับ 400 บาท
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      <MapView
        style={styles.Map}
        provider={PROVIDER_GOOGLE}
        initialRegion={Region}
        showsUserLocation={true}
        ref={(map) => (mapRef = map)}
        mapType={"hybrid"}
        showsCompass={false}
        pitchEnabled={false}
        showsMyLocationButton={false}
      >
        {DrawParkingSlot(id1xx)}
        {DrawParkingSlot(id2xx_1)}
        {DrawParkingSlot(id2xx_2)}
        {DrawParkingSlot(id3xx)}
        {DrawParkingSlot(id4xx_1)}
        {DrawParkingSlot(id4xx_2)}

        <Polygon
          coordinates={FIBO_arrow1}
          fillColor={"yellow"}
          strokeWidth={1}
          strokeColor="black"
        ></Polygon>
        <Polygon
          coordinates={FIBO_arrow2}
          fillColor={"orange"}
          strokeWidth={1}
          strokeColor="black"
        ></Polygon>
        {markerInfomation.map((element, key) => {
          return (
            <Marker
              key={key}
              title={element.title}
              coordinate={element.coordinate}
              ref={(ref) => (markerRef.current[key] = ref)}
            >
              <Callout onPress={() => navigateToMaps(element.coordinate)}>
                <Text>{element.description}</Text>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};
export default MapLayout;
